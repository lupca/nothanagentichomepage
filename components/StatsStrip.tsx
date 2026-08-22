import React from 'react';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '6', label: 'module thị giác máy tính đã nghiệm thu' },
  { value: '126/126', label: 'test tự động pass, kiểm định độc lập' },
  { value: '2', label: 'nền tảng sản phẩm, 1 đã bảo hộ nhãn hiệu' },
  { value: '< 3s', label: 'SLA suy luận cho đếm SKU trên ảnh' },
];

export interface StatsStripProps {}

export const StatsStrip: React.FC<StatsStripProps> = () => {
  return (
    <section className="bg-white border-b border-line" aria-label="Bằng chứng năng lực">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line">
        {stats.map((stat, idx) => (
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
