import React from 'react';
import { Quote } from 'lucide-react';

export interface TestimonialsProps {}

export const Testimonials: React.FC<TestimonialsProps> = () => {
  return (
    <section
      className="bg-brand-surface py-20 px-6 md:px-12 lg:px-24 border-t border-brand-secondary/10"
      id="testimonials"
      aria-label="Đánh giá khách hàng"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-h2 font-bold text-brand-bg">
            Phản hồi từ người dùng thử
          </h2>
          <p className="text-body text-brand-secondary max-w-lg mx-auto leading-relaxed">
            Chia sẻ từ một số shop đang dùng thử hệ thống.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-secondary/10 space-y-8 relative">
          {/* Quote icon */}
          <Quote className="w-10 h-10 text-brand-accent/30" />

          {/* Quote */}
          <blockquote className="text-h3 font-medium text-brand-bg leading-relaxed">
            &ldquo;Trước đây tụi mình mất cả buổi sáng chỉ để check đơn hàng giữa Shopee với kho. Giờ hệ thống tự đồng bộ, sai sót giảm hẳn, đội kho có thời gian làm việc khác.&rdquo;
          </blockquote>

          <div className="border-t border-brand-surface pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Author details */}
            <div>
              <div className="font-bold text-brand-bg text-body">Chị Lan — Chủ shop mỹ phẩm</div>
              <div className="text-caption text-brand-secondary">Người dùng thử nghiệm từ tháng 5/2026</div>
            </div>

            {/* Before / After comparison */}
            <div className="flex gap-4 sm:gap-6 bg-brand-surface p-4 rounded-2xl border border-brand-secondary/5">
              <div className="space-y-1">
                <span className="text-caption text-brand-secondary block font-semibold uppercase">Trước</span>
                <span className="text-body font-bold text-brand-error line-through">Làm tay</span>
              </div>
              <div className="border-r border-brand-secondary/20"></div>
              <div className="space-y-1">
                <span className="text-caption text-brand-success block font-semibold uppercase font-bold">Sau</span>
                <span className="text-body font-extrabold text-brand-success">Tự động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
