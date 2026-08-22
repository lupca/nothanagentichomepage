'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

const content = {
  vi: {
    heading: 'Câu hỏi thường gặp',
    footnote: 'Mã hoá tại chỗ (Fernet) và kiểm soát truy cập theo vai trò trên toàn bộ hệ thống.',
    faqs: [
      { question: 'Dữ liệu hình ảnh của nhà máy có rời khỏi cơ sở của chúng tôi không?', answer: 'Không, nếu bạn không muốn. Hệ thống triển khai được hoàn toàn trong mạng nội bộ, suy luận tại biên ngay tại nhà máy. Thông tin đăng nhập thiết bị mã hoá khi lưu, mọi API tải tệp đều chặn path traversal.' },
      { question: 'Tích hợp với camera hãng nào?', answer: 'Mọi camera IP theo chuẩn ONVIF/RTSP đang chạy sản xuất. Axis và Hikvision đang ở giai đoạn POC. Xem ma trận tích hợp thiết bị đầy đủ ở mục Ma trận tích hợp thiết bị trên trang này.' },
      { question: 'Mất bao lâu để triển khai một bài toán mới?', answer: 'Với kiểm tra đúng/sai định nghĩa bằng lời và vài ảnh mẫu, một nghiệp vụ mới có thể chạy trong ngày, không cần huấn luyện lại mô hình. Với tích hợp thiết bị mới, thời gian phụ thuộc giao thức của thiết bị — trao đổi trực tiếp để có mốc cụ thể.' },
    ],
  },
  en: {
    heading: 'Frequently asked questions',
    footnote: 'Encryption at rest (Fernet) and role-based access control across the entire system.',
    faqs: [
      { question: 'Does our factory footage ever leave our premises?', answer: 'Not if you don’t want it to. The system deploys fully inside your internal network, with inference at the edge right on the factory floor. Device credentials are encrypted at rest, and every file-download API blocks path traversal.' },
      { question: 'Which camera brands do you integrate with?', answer: 'Any IP camera on the ONVIF/RTSP standard already runs in production. Axis and Hikvision are at the POC stage. See the full device integration matrix in the Device Integration Matrix section on this page.' },
      { question: 'How long does it take to roll out a new check?', answer: 'For binary checks defined in plain language plus a few sample images, a new check can ship the same day, with no model retraining. For a new device integration, timing depends on that device’s protocol — talk to us directly for a concrete estimate.' },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

export interface FAQProps {}

export const FAQ: React.FC<FAQProps> = () => {
  const locale = useLocale();
  const t = pick(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="bg-white py-20 px-6 md:px-12 lg:px-24"
      id="faq"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">
            {t.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {t.faqs.map((faq, idx) => {
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
          <span className="leading-relaxed">{t.footnote}</span>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
