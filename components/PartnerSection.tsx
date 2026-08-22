import React from 'react';
import { ArrowRight } from 'lucide-react';

const points = [
  {
    title: 'Phần mềm làm thiết bị của bạn đáng giá hơn.',
    body: 'Mỗi bài toán nghiệp vụ chúng tôi giải trên camera của hãng là một lý do để khách hàng chọn thiết bị đó thay vì thiết bị rẻ hơn.',
  },
  {
    title: 'Chúng tôi sống bằng doanh thu định kỳ, nên chúng tôi ở lại.',
    body: 'Mô hình của chúng tôi là phần mềm thuê theo chu kỳ kèm thiết bị, không phải dự án một lần rồi rút. Khách hàng còn dùng thì chúng tôi còn phải bảo trì.',
  },
  {
    title: 'Đội kỹ thuật là người của chúng tôi.',
    body: 'Kiến trúc, mô hình và tích hợp thiết bị đều do đội nội bộ làm và chịu trách nhiệm, không gia công lại cho bên thứ ba.',
  },
];

export interface PartnerSectionProps {}

export const PartnerSection: React.FC<PartnerSectionProps> = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" id="doi-tac" aria-label="Dành cho hãng phần cứng">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">Dành cho các hãng phần cứng</h2>
          <p className="text-body text-navy-400 leading-relaxed">
            Chúng tôi tiếp cận với vị thế đối tác giải pháp: vừa phát triển phần mềm trên nền tảng của hãng, vừa tích hợp và cung cấp thiết bị cho dự án trọn gói tại Việt Nam.
          </p>
        </div>

        <div className="space-y-6">
          {points.map((p, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="font-mono text-caption text-orange-600 mt-1.5 shrink-0">0{idx + 1}</span>
              <div>
                <p className="text-body font-bold text-ink">{p.title}</p>
                <p className="text-body text-navy-400 leading-relaxed mt-1">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#lead-capture"
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-ink font-extrabold px-7 py-3.5 rounded-lg transition-all min-h-[48px] group"
        >
          Trao đổi về hợp tác
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default PartnerSection;
