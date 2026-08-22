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
      question: 'Dữ liệu hình ảnh của nhà máy có rời khỏi cơ sở của chúng tôi không?',
      answer: 'Không, nếu bạn không muốn. Hệ thống triển khai được hoàn toàn trong mạng nội bộ, suy luận tại biên ngay tại nhà máy. Thông tin đăng nhập thiết bị mã hoá khi lưu, mọi API tải tệp đều chặn path traversal.',
    },
    {
      question: 'Tích hợp với camera hãng nào?',
      answer: 'Mọi camera IP theo chuẩn ONVIF/RTSP đang chạy sản xuất. Axis và Hikvision đang ở giai đoạn POC. Xem ma trận tích hợp thiết bị đầy đủ ở mục Ma trận tích hợp thiết bị trên trang này.',
    },
    {
      question: 'Mất bao lâu để triển khai một bài toán mới?',
      answer: 'Với kiểm tra đúng/sai định nghĩa bằng lời và vài ảnh mẫu, một nghiệp vụ mới có thể chạy trong ngày, không cần huấn luyện lại mô hình. Với tích hợp thiết bị mới, thời gian phụ thuộc giao thức của thiết bị — trao đổi trực tiếp để có mốc cụ thể.',
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
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  isOpen
                    ? 'border-orange bg-paper/30'
                    : 'border-navy-400/20 bg-paper/10 hover:bg-paper/30'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-body text-ink transition-colors min-h-[64px]"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-orange' : 'text-navy-400/60'}`} />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-orange' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`faq-content-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-navy-400/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-body text-navy-400 bg-white leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-4 bg-paper border border-navy-400/10 rounded-xl flex items-center gap-3 justify-center text-caption text-navy-400">
          <ShieldCheck className="w-5 h-5 text-state-ok shrink-0" />
          <span className="leading-relaxed">Mã hoá tại chỗ (Fernet) và kiểm soát truy cập theo vai trò trên toàn bộ hệ thống.</span>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
