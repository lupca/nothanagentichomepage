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
      question: 'Hệ thống tích hợp được với những kênh bán hàng và vận chuyển nào?',
      answer: 'NoThanagentic tích hợp sẵn sàng kết nối API 2 chiều với các sàn TMĐT lớn (Shopee, TikTok Shop, Lazada), đơn vị vận chuyển hàng đầu tại Việt Nam (Giao Hàng Tiết Kiệm - GHTK) và cổng thanh toán phổ biến như MoMo. Toàn bộ thông tin đơn hàng, tồn kho và trạng thái vận chuyển sẽ đồng bộ theo thời gian thực.',
    },
    {
      question: 'Dữ liệu kinh doanh của doanh nghiệp có được bảo mật không?',
      answer: 'Chúng tôi cam kết bảo mật thông tin tuyệt đối. Hệ thống vận hành tuân thủ nghiêm ngặt tiêu chuẩn bảo mật dữ liệu quốc tế ISO/IEC 27001, mã hóa dữ liệu truyền tải SSL/TLS và mã hóa lưu trữ AES-256. Quyền truy cập dữ liệu được phân quyền chi tiết (RBAC) chặt chẽ theo vai trò của từng nhân sự.',
    },
    {
      question: 'Thời gian triển khai hệ thống mất bao lâu để bắt đầu hoạt động?',
      answer: 'Thời gian triển khai cực kỳ nhanh chóng. Nhờ kiến trúc API dựng sẵn, bạn chỉ mất từ 3 đến 5 ngày làm việc để hoàn tất việc kết nối dữ liệu các gian hàng, cấu hình quy trình AI Decision Support và bắt đầu đưa hệ thống vào vận hành thực tế.',
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
          <h2 className="text-h2 font-bold text-brand-bg">
            Giải Đáp Thắc Mắc
          </h2>
          <p className="text-body text-brand-secondary leading-relaxed">
            Tìm câu trả lời nhanh chóng cho các câu hỏi thường gặp về hệ thống quản lý Agentic AI.
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
