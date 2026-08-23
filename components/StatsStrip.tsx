import React from 'react';
import { getLocale } from 'next-intl/server';
import { Reveal } from './Reveal';
import { StatCounter } from './StatCounter';

const content = {
  vi: {
    stats: [
      { value: '6', label: 'module sản xuất đã bàn giao và nghiệm thu' },
      { value: '< 3s', label: 'thời gian đếm SKU trên mỗi ảnh' },
      { value: '2', label: 'khách hàng đang vận hành theo hợp đồng' },
      { value: '98%', label: 'uptime tối thiểu cam kết mỗi tháng' },
    ],
  },
  en: {
    stats: [
      { value: '6', label: 'production modules delivered and accepted' },
      { value: '< 3s', label: 'SKU counting time per image' },
      { value: '2', label: 'customers on paid contracts' },
      { value: '98%', label: 'minimum monthly uptime, contractual' },
    ],
  },
  sv: {
    stats: [
      { value: '6', label: 'produktionsmoduler levererade och godkända' },
      { value: '< 3s', label: 'SKU-räkningstid per bild' },
      { value: '2', label: 'kunder med betalande avtal' },
      { value: '98%', label: 'lägsta månatliga drifttid, avtalsenlig' },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface StatsStripProps {}

export const StatsStrip: React.FC<StatsStripProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper border-b border-line" aria-label="Proof stats">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line">
        {t.stats.map((stat, idx) => (
          <Reveal key={idx} delay={idx * 0.07} className="px-6 py-8 md:px-8">
            <p className="font-display text-3xl md:text-4xl font-bold text-ink tabular-nums">
              <StatCounter value={stat.value} />
            </p>
            <p className="text-caption text-navy-400 mt-2 leading-snug">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
