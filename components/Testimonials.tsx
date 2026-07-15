import React from 'react';
import { Star } from 'lucide-react';

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
          <h2 className="text-h2 font-bold text-brand-bg">
            Minh Chứng Từ Thực Tế Vận Hành
          </h2>
          <p className="text-body text-brand-secondary max-w-lg mx-auto leading-relaxed">
            Lắng nghe câu chuyện chuyển đổi số thành công từ đối tác đồng hành cùng NoThanagentic.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-secondary/10 space-y-8 relative">
          {/* Star ratings */}
          <div className="flex gap-1 text-brand-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-h3 font-medium text-brand-bg italic leading-relaxed">
            &ldquo;Trước khi dùng NoThanagentic, đội ngũ của chúng tôi mất 4-5 tiếng mỗi ngày chỉ để đối soát đơn hàng và tồn kho giữa Shopee và Lazada. Từ khi áp dụng AI Decision Support, thời gian xử lý giảm xuống chỉ còn vài phút, tỉ lệ sai lệch đơn hàng gần như bằng không.&rdquo;
          </blockquote>

          <div className="border-t border-brand-surface pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Author details */}
            <div>
              <div className="font-bold text-brand-bg text-body">Nguyễn Văn Bình</div>
              <div className="text-caption text-brand-secondary">Giám đốc Vận hành (COO) — TechMart Vietnam</div>
            </div>

            {/* Before / After Metrics comparison */}
            <div className="flex gap-4 sm:gap-6 bg-brand-surface p-4 rounded-2xl border border-brand-secondary/5">
              <div className="space-y-1">
                <span className="text-caption text-brand-secondary block font-semibold uppercase">Trước</span>
                <span className="text-body font-bold text-brand-error line-through">45 phút / đơn</span>
              </div>
              <div className="border-r border-brand-secondary/20"></div>
              <div className="space-y-1">
                <span className="text-caption text-brand-success block font-semibold uppercase font-bold">Sau (AI)</span>
                <span className="text-body font-extrabold text-brand-success">3 phút / đơn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
