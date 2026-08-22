import React from 'react';

interface Module {
  name: string;
  capability: string;
  stack: string;
}

const modules: Module[] = [
  {
    name: 'Phân tích video đóng gói',
    capability: 'Bóc tách mã QR trong video đóng hàng, gắn mốc thời gian bắt đầu/kết thúc cho từng đơn — tra được clip của bất kỳ khiếu nại nào.',
    stack: 'OpenCV · pyzbar · Celery',
  },
  {
    name: 'Đếm SKU trên ảnh',
    capability: 'Đếm vật thể dày đặc trong dưới 3 giây, xuất ảnh có khung phát hiện và lưu phiên bản mô hình đã dùng.',
    stack: 'YOLOv8 · SAHI',
  },
  {
    name: 'Kiểm tra đúng/sai',
    capability: 'Nghiệp vụ mới định nghĩa bằng lời và vài ảnh mẫu, không cần huấn luyện lại — mở rộng sang bài toán mới trong ngày.',
    stack: 'VLM · few-shot',
  },
  {
    name: 'Quản lý thiết bị',
    capability: 'Khai báo thiết bị, kiểm tra kết nối, mật khẩu mã hoá khi lưu.',
    stack: 'FastAPI · Fernet',
  },
  {
    name: 'Live view & snapshot',
    capability: 'Xem trực tiếp và chụp ảnh thủ công hoặc theo lịch định kỳ.',
    stack: 'MJPEG · Celery Beat',
  },
  {
    name: 'Ghi & trích xuất video',
    capability: 'Liệt kê bản ghi và cắt clip chính xác theo khoảng thời gian yêu cầu.',
    stack: 'FFmpeg',
  },
];

export interface EvidenceProps {}

export const Evidence: React.FC<EvidenceProps> = () => {
  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" id="bang-chung" aria-label="Bằng chứng POC">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-2xl space-y-4">
          <span className="text-caption font-mono uppercase tracking-wider text-orange-600">Bằng chứng, không phải lời hứa</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">POC SOAI — 6 module đã nghiệm thu</h2>
          <p className="text-body text-navy-400 leading-relaxed">
            126/126 kịch bản test tự động, kiểm định độc lập qua 8 test suite (unit, integration, E2E, và stress test với ảnh/video hỏng).
          </p>
        </div>

        <div className="overflow-x-auto border border-line bg-white">
          <table className="w-full min-w-[640px] text-body">
            <thead>
              <tr>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">
                  Module
                </th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">
                  Năng lực
                </th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper whitespace-nowrap">
                  Nền tảng kỹ thuật
                </th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m, idx) => (
                <tr key={idx} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3.5 text-navy-400 align-top">{m.capability}</td>
                  <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{m.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Evidence;
