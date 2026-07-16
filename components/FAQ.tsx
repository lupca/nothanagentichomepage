'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {}

export const FAQ: React.FC<FAQProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Kết nối được với sàn nào?',
      answer: 'Hiện tại hỗ trợ Shopee, TikTok Shop, Lazada. Vận chuyển có GHTK, thanh toán có MoMo. Đang mở rộng thêm các kênh khác theo nhu cầu khách hàng.',
    },
    {
      question: 'Dữ liệu có an toàn không?',
      answer: 'Hệ thống đạt chuẩn ISO 27001, mã hóa SSL khi truyền và AES-256 khi lưu. Mỗi người dùng có quyền truy cập riêng theo vai trò trong công ty.',
    },
    {
      question: 'Mất bao lâu để bắt đầu dùng?',
      answer: 'Thường 3-5 ngày làm việc để kết nối dữ liệu và cấu hình. Nhanh hay chậm tùy số lượng sàn và độ phức tạp của shop.',
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      className="bg-white py-20 px-6 md:px-12 lg:px-24"
      id="faq"
      aria-label="Câu hỏi thường gặp"
    >
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-h2 font-bold text-brand-bg">
            Câu hỏi thường gặp
          </h2>
          <p className="text-body text-brand-secondary leading-relaxed">
            Một số thắc mắc mà khách hàng hay hỏi.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  isOpen 
                    ? 'border-brand-accent bg-brand-surface/30' 
                    : 'border-brand-secondary/20 bg-brand-surface/10 hover:bg-brand-surface/30'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-body text-brand-bg transition-colors min-h-[64px]"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-brand-accent' : 'text-brand-secondary/60'}`} />
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-brand-secondary flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-accent' : ''
                      }`} 
                    />
                  </button>
                </h3>

                <div
                  id={`faq-content-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-brand-secondary/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-body text-brand-secondary bg-white leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-4 bg-brand-surface border border-brand-secondary/10 rounded-xl flex items-center gap-3 justify-center text-caption text-brand-secondary">
          <ShieldCheck className="w-5 h-5 text-brand-success shrink-0" />
          <span className="leading-relaxed">Hệ thống đạt chứng nhận tiêu chuẩn an ninh thông tin quốc tế ISO/IEC 27001 và mã hóa dữ liệu đầu-cuối.</span>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
