import React from 'react';

export interface BrandStoryProps {}

export const BrandStory: React.FC<BrandStoryProps> = () => {
  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label="Câu chuyện thương hiệu">
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <p className="font-display text-2xl md:text-3xl font-bold text-ink leading-snug border-l-[3px] border-orange pl-6">
          Phần cứng là cây nỏ. Agentic AI là mũi tên. Chúng tôi làm cả hai.
        </p>
        <p className="text-body text-navy-400 leading-relaxed">
          Một mô hình AI đặt trên máy chủ có thể rất chính xác mà vẫn vô dụng, nếu nó không nhìn thấy dây chuyền và không ai hành động theo nó. Giá trị chỉ xuất hiện ở nơi phần mềm chạm được vào thiết bị: camera nào, đặt ở đâu, suy luận tại biên hay trên máy chủ, ai duyệt cảnh báo, và điều gì xảy ra trong ba giây sau đó. Chúng tôi nhận trách nhiệm cho toàn bộ đường đi đó — chọn thiết bị, tích hợp, mô hình, giao diện vận hành, và bảo trì.
        </p>
        <p className="text-body text-navy-400 leading-relaxed">
          Nỏ thần là vũ khí trong truyền thuyết Âu Lạc, được nhớ đến vì độ chính xác và vì một lần giương bắn ra nhiều mũi. Với một công ty làm thị giác máy tính cho an toàn và an ninh, chúng tôi không tìm được cái tên nào đúng hơn.
        </p>
      </div>
    </section>
  );
};

export default BrandStory;
