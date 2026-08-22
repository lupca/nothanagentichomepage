'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Check, X, RotateCcw, Undo2 } from 'lucide-react';

type ActionType = 'approve' | 'reject' | 'override';

interface PendingToast {
  action: ActionType;
  label: string;
  secondsLeft: number;
}

const COUNTDOWN_SECONDS = 10;

const content = {
  vi: {
    heading: 'Hành động kiểm duyệt',
    approve: 'Phê duyệt',
    reject: 'Từ chối',
    override: 'Ghi đè',
    undo: 'Undo',
    actionLabel: { approve: 'Đã phê duyệt', reject: 'Đã từ chối', override: 'Đã ghi đè' } as Record<ActionType, string>,
    completesIn: (s: number) => `Hoàn tất sau ${s}s`,
    defaultItem: 'Phát hiện: công nhân không đội mũ bảo hộ · Line 2',
  },
  en: {
    heading: 'Review action',
    approve: 'Approve',
    reject: 'Reject',
    override: 'Override',
    undo: 'Undo',
    actionLabel: { approve: 'Approved', reject: 'Rejected', override: 'Overridden' } as Record<ActionType, string>,
    completesIn: (s: number) => `Completes in ${s}s`,
    defaultItem: 'Detection: worker without a hard hat · Line 2',
  },
  sv: {
    heading: 'Granskningsåtgärd',
    approve: 'Godkänn',
    reject: 'Avslå',
    override: 'Åsidosätt',
    undo: 'Ångra',
    actionLabel: { approve: 'Godkänd', reject: 'Avslagen', override: 'Åsidosatt' } as Record<ActionType, string>,
    completesIn: (s: number) => `Slutförs på ${s}s`,
    defaultItem: 'Upptäckt: arbetare utan skyddshjälm · Linje 2',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface HumanOverridePanelProps {
  itemLabel?: string;
}

export const HumanOverridePanel: React.FC<HumanOverridePanelProps> = ({ itemLabel }) => {
  const locale = useLocale();
  const t = pick(locale);
  const label = itemLabel ?? t.defaultItem;

  const [toast, setToast] = useState<PendingToast | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => clearCountdown, []);

  const triggerAction = (action: ActionType) => {
    clearCountdown();
    setToast({ action, label: t.actionLabel[action], secondsLeft: COUNTDOWN_SECONDS });

    intervalRef.current = setInterval(() => {
      setToast((current) => {
        if (!current) return current;
        const next = current.secondsLeft - 1;
        if (next <= 0) {
          clearCountdown();
          return null;
        }
        return { ...current, secondsLeft: next };
      });
    }, 1000);
  };

  const handleUndo = () => {
    clearCountdown();
    setToast(null);
  };

  return (
    <div
      data-testid="human-override-panel"
      className="rounded-xl border border-navy-400/15 bg-white p-4 space-y-3"
    >
      <p className="text-caption font-bold text-navy-400 uppercase tracking-wider">
        {t.heading}
      </p>
      <p className="text-body text-ink leading-snug">{label}</p>

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={() => triggerAction('approve')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-state-ok text-white font-bold text-body hover:bg-state-ok/90 transition-colors"
        >
          <Check className="w-4 h-4" />
          {t.approve}
        </button>
        <button
          type="button"
          onClick={() => triggerAction('reject')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-state-stop text-white font-bold text-body hover:bg-state-stop/90 transition-colors"
        >
          <X className="w-4 h-4" />
          {t.reject}
        </button>
        <button
          type="button"
          onClick={() => triggerAction('override')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-navy-400/30 text-ink font-bold text-body hover:bg-paper transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t.override}
        </button>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center gap-4 bg-ink text-white px-5 py-4 rounded-xl shadow-2xl border border-white/10 min-w-[300px]"
        >
          <span className="text-body font-semibold flex-1">
            {toast.label} · {t.completesIn(toast.secondsLeft)}
          </span>
          <button
            type="button"
            onClick={handleUndo}
            className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg bg-white/10 hover:bg-white/20 font-bold text-body transition-colors shrink-0"
          >
            <Undo2 className="w-4 h-4" />
            {t.undo}
          </button>
        </div>
      )}
    </div>
  );
};

export default HumanOverridePanel;
