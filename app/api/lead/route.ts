import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const leadPayloadSchema = z.object({
  type: z.literal('lead'),
  email: z.string().min(1).email(),
  company: z.string().min(2),
  phone: z.string().min(1).regex(phoneRegex),
  _hp: z.string().optional(),
});

const partnerPayloadSchema = z.object({
  type: z.literal('partner'),
  company: z.string().min(2),
  email: z.string().min(1).email(),
  region: z.string().min(1),
  interestType: z.string().min(1),
  note: z.string().optional(),
  _hp: z.string().optional(),
});

const payloadSchema = z.discriminatedUnion('type', [leadPayloadSchema, partnerPayloadSchema]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// In-memory rate limiter keyed by IP. Resets when the server process restarts.
const requestLog = new Map<string, number[]>();

function pruneAndCheckRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  Array.from(requestLog.entries()).forEach(([key, timestamps]) => {
    const kept = timestamps.filter((ts) => ts > windowStart);
    if (kept.length === 0) {
      requestLog.delete(key);
    } else {
      requestLog.set(key, kept);
    }
  });

  const existing = requestLog.get(ip) ?? [];
  const recent = existing.filter((ts) => ts > windowStart);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return false;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return true;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) {
    return 'unknown';
  }
  const first = forwardedFor.split(',')[0]?.trim();
  return first && first.length > 0 ? first : 'unknown';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);

  if (!pruneAndCheckRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.message }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: silently drop bot submissions without revealing detection.
  if (data._hp && data._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { _hp, ...rest } = data;
  void _hp;
  const submittedAt = new Date().toISOString();
  const record = {
    ...rest,
    submittedAt,
  };

  const durable = isStorageDurable();

  // On a non-durable filesystem (e.g. Vercel's default), don't even attempt
  // the write — it would either throw or land somewhere that disappears
  // between invocations, so there's nothing to gain from trying.
  const backupWritten = durable ? await appendLeadToFile(record) : false;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    if (durable) {
      console.warn(
        '[lead] RESEND_API_KEY is not configured — email delivery is disabled, this lead exists only on local disk.'
      );
      return NextResponse.json({ ok: true });
    }

    console.error(
      '[lead] NO DELIVERY CHANNEL CONFIGURED: RESEND_API_KEY is unset and the filesystem is not durable ' +
        '(VERCEL is set, LEAD_STORAGE_DURABLE is not "true"). This submission could not be stored anywhere ' +
        'and is being rejected rather than silently dropped. Set RESEND_API_KEY, or set ' +
        'LEAD_STORAGE_DURABLE=true if this deployment truly has a persistent disk.'
    );
    return NextResponse.json(
      { ok: false, error: 'Submission could not be delivered — no delivery channel is configured' },
      { status: 500 }
    );
  }

  try {
    await sendLeadEmail(resendApiKey, record);
  } catch (err) {
    console.error(
      `[lead] Email delivery failed: ${err instanceof Error ? err.message : String(err)}. Backup file write ${
        backupWritten ? 'succeeded' : 'FAILED'
      } — lead is${backupWritten ? '' : ' NOT'} recoverable on disk.`
    );
    return NextResponse.json({ ok: false, error: 'Failed to deliver submission' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Whether a local file write can be treated as durable storage. Vercel's
// filesystem is read-only outside /tmp, and /tmp does not persist between
// invocations, so a file append there is not a real backup — it either
// throws or silently vanishes. Presence of VERCEL (which Vercel sets
// automatically) is treated as "not durable" unless explicitly overridden
// via LEAD_STORAGE_DURABLE=true for self-hosted/VPS deployments that do
// have a persistent disk.
function isStorageDurable(): boolean {
  if (process.env.LEAD_STORAGE_DURABLE === 'true') {
    return true;
  }
  if (process.env.VERCEL) {
    return false;
  }
  return true;
}

async function appendLeadToFile(record: Record<string, unknown>): Promise<boolean> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, 'leads.jsonl');
    await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, 'utf8');
    return true;
  } catch (err) {
    console.warn(
      `[lead] Local file backup failed (expected on read-only/ephemeral filesystems): ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return false;
  }
}

function formatLeadEmailBody(record: Record<string, unknown>): string {
  const labels: Record<string, string> = {
    type: 'Submission type',
    email: 'Email',
    company: 'Company',
    phone: 'Phone',
    region: 'Region',
    interestType: 'Interest type',
    note: 'Note',
    submittedAt: 'Submitted at',
  };

  const order = ['type', 'email', 'company', 'phone', 'region', 'interestType', 'note', 'submittedAt'];
  const keys = [...order.filter((k) => k in record), ...Object.keys(record).filter((k) => !order.includes(k))];

  return keys
    .map((key) => {
      const label = labels[key] ?? key;
      const value = record[key];
      return `${label}: ${value === undefined || value === null || value === '' ? '(none)' : String(value)}`;
    })
    .join('\n');
}

async function sendLeadEmail(apiKey: string, record: Record<string, unknown>): Promise<void> {
  const to = process.env.LEAD_NOTIFY_TO || 'support@nothanagentic.vn';
  const from = process.env.LEAD_NOTIFY_FROM || 'Lead Notifier <onboarding@resend.dev>';
  const type = typeof record.type === 'string' ? record.type : 'lead';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New ${type} submission — nothanagentic.vn`,
      text: formatLeadEmailBody(record),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    let detail = '';
    try {
      detail = await response.text();
    } catch {
      // ignore — best-effort detail only
    }
    throw new Error(`Resend API responded with ${response.status}${detail ? `: ${detail}` : ''}`);
  }
}
