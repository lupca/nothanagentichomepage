'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';

const content = {
  vi: { channelsLabel: 'Kênh hỗ trợ trực tuyến', support: 'Hỗ trợ qua email và điện thoại, 9:00-17:00 thứ Hai đến thứ Sáu' },
  en: { channelsLabel: 'Talk to us online', support: 'Support by email and phone, 9:00-17:00 Monday to Friday' },
  sv: { channelsLabel: 'Kontaktkanaler online', support: 'Support via e-post och telefon, 9:00-17:00 måndag till fredag' },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface FloatingContactProps {}

export const FloatingContact: React.FC<FloatingContactProps> = () => {
  const locale = useLocale();
  const t = pick(locale);
  return (
    <div
      data-testid="floating-contact"
      className="group fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Expanded details: revealed on hover/focus */}
      <div
        data-testid="contact-details"
        className="w-64 bg-white text-ink rounded-2xl shadow-2xl border border-black/5 p-4 space-y-3
          opacity-0 translate-y-2 pointer-events-none invisible
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:visible
          group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:visible
          transition-all duration-200 origin-bottom-right"
      >
        <p className="text-caption font-bold text-navy-400 uppercase tracking-wide">
          {t.channelsLabel}
        </p>
        <a
          href="https://zalo.me/nothanagentic"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 min-h-[44px] px-3 rounded-lg bg-paper hover:bg-orange/10 text-body font-semibold text-ink transition-colors"
        >
          <span className="w-6 h-6 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-caption font-extrabold shrink-0">
            Z
          </span>
          Zalo OA
        </a>
        <a
          href="https://www.messenger.com/t/nothanagentic"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 min-h-[44px] px-3 rounded-lg bg-paper hover:bg-orange/10 text-body font-semibold text-ink transition-colors"
        >
          <span className="w-6 h-6 rounded-full bg-[#0084FF] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
          </span>
          Facebook Messenger
        </a>
      </div>

      {/* Always-visible trigger: icon-only on mobile to avoid covering content, full pill from sm breakpoint up */}
      <div className="flex items-center gap-3 bg-ink text-white rounded-full shadow-2xl border border-white/10 pl-0 sm:pl-4 pr-0 sm:pr-2 py-0 sm:py-2 cursor-default">
        <span className="hidden sm:inline text-caption font-semibold max-w-[160px] leading-snug">
          {t.support}
        </span>
        <span className="sr-only sm:hidden">{t.support}</span>
        <span className="w-11 h-11 rounded-full bg-orange flex items-center justify-center shrink-0 animate-pulse">
          <MessageCircle className="w-5 h-5 text-white" />
        </span>
      </div>
    </div>
  );
};

export default FloatingContact;
