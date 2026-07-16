import React from 'react';
import { ArrowRight, Link, Brain, CheckSquare } from 'lucide-react';

export interface HowItWorksProps {}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  const steps = [
    {
      step: '01',
      title: 'Kết nối',
      description: 'Đăng nhập các tài khoản Shopee, TikTok Shop, Lazada của bạn. Dữ liệu tự động đổ về.',
      icon: Link,
    },
    {
      step: '02',
      title: 'Xem báo cáo',
      description: 'Hệ thống tổng hợp và phân tích, hiển thị những gì cần chú ý: sắp hết hàng, dòng tiền, quảng cáo lỗ.',
      icon: Brain,
    },
    {
      step: '03',
      title: 'Duyệt & thực hiện',
      description: 'Khi có đề xuất, bạn xem và quyết định có làm hay không. Hệ thống không tự ý thực hiện.',
      icon: CheckSquare,
    },
  ];

  return (
    <section 
      className="bg-brand-surface py-20 px-6 md:px-12 lg:px-24 border-y border-brand-secondary/10"
      id="how-it-works"
      aria-label="Quy trình vận hành"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-h2 font-bold text-brand-bg">
            Quy Trình 3 Bước Đơn Giản
          </h2>
          <p className="text-body text-brand-secondary">
            Kết nối dữ liệu, để AI phân tích, bạn duyệt và quyết định. Đơn giản vậy thôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-brand-secondary/10 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl md:text-h2 font-extrabold text-brand-accent/20 group-hover:text-brand-accent/40 transition-colors">
                      {item.step}
                    </span>
                    <div className="p-3 bg-brand-surface rounded-xl text-brand-bg">
                      <IconComponent className="w-6 h-6 text-brand-accent" />
                    </div>
                  </div>
                  <h3 className="text-h3 font-bold text-brand-bg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-brand-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-brand-secondary/30">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
