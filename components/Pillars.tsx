import React from 'react';
import { BrainCircuit, Cable, ShieldCheck } from 'lucide-react';
import { AIDecisionWidget } from './AIDecisionWidget';

interface Pillar {
  icon: React.ElementType;
  title: string;
  body: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    icon: BrainCircuit,
    title: 'Lõi Agentic AI',
    body: (
      <>
        Không phải chatbot. Là tác nhân quan sát dây chuyền, đánh giá độ tin cậy, đề xuất quyết định và chờ người duyệt. Kết hợp mô hình thị giác chuyên biệt (<code className="font-mono text-caption">YOLOv8</code>, <code className="font-mono text-caption">SAHI</code>) với mô hình ngôn ngữ-thị giác cho các bài kiểm tra tuỳ biến theo mô tả bằng lời.
      </>
    ),
  },
  {
    icon: Cable,
    title: 'Tích hợp phần cứng',
    body: (
      <>
        Một lớp trừu tượng <code className="font-mono text-caption">DeviceProvider</code> tách nguồn hình ảnh khỏi lõi phân tích: thêm dòng camera mới, đầu đọc mã, hay thiết bị POS là viết thêm plugin, không sửa lõi. Chúng tôi cung cấp cả thiết bị và triển khai tại chỗ, không chỉ giao phần mềm.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Bảo mật toàn diện',
    body: (
      <>
        Thông tin đăng nhập thiết bị mã hoá khi lưu. Mọi API xem và tải tệp chặn path traversal. Hệ thống chạy được hoàn toàn trong mạng nhà máy — hình ảnh sản xuất của khách hàng không cần rời khỏi cơ sở của họ.
      </>
    ),
  },
];

export interface PillarsProps {}

export const Pillars: React.FC<PillarsProps> = () => {
  return (
    <section
      className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line"
      id="nang-luc"
      aria-label="Ba trụ năng lực"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">
            Ba trụ năng lực
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-paper border border-line"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                }}
              >
                <div className="p-3 bg-ink rounded-lg w-fit mb-5">
                  <Icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-h3 font-bold text-ink mb-3">{pillar.title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{pillar.body}</p>
              </div>
            );
          })}
        </div>

        <AIDecisionWidget />
      </div>
    </section>
  );
};

export default Pillars;
