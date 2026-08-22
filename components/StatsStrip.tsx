import React from 'react';
import { getLocale } from 'next-intl/server';

const content = {
  vi: {
    stats: [
      { value: '6', label: 'module thị giác máy tính đã nghiệm thu' },
      { value: '126/126', label: 'test tự động pass, kiểm định độc lập' },
      { value: '2', label: 'nền tảng sản phẩm, 1 đã bảo hộ nhãn hiệu' },
      { value: '< 3s', label: 'SLA suy luận cho đếm SKU trên ảnh' },
    ],
  },
  en: {
    stats: [
      { value: '6', label: 'computer-vision modules accepted' },
      { value: '126/126', label: 'automated tests passed, independently audited' },
      { value: '2', label: 'product platforms, 1 trademark-registered' },
      { value: '< 3s', label: 'inference SLA for SKU counting' },
    ],
  },
  sv: {
    stats: [
      { value: '6', label: 'godkända datorseendemoduler' },
      { value: '126/126', label: 'automatiska tester godkända, oberoende granskade' },
      { value: '2', label: 'produktplattformar, 1 varumärkesregistrerad' },
      { value: '< 3s', label: 'SLA för inferens vid SKU-räkning' },
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
    <section className="bg-white border-b border-line" aria-label="Proof stats">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line">
        {t.stats.map((stat, idx) => (
          <div key={idx} className="px-6 py-8 md:px-8">
            <p className="font-display text-3xl md:text-4xl font-bold text-ink tabular-nums">
              {stat.value}
            </p>
            <p className="text-caption text-navy-400 mt-2 leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
