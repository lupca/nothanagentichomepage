import React from 'react';
import { getLocale } from 'next-intl/server';
import { Reveal } from './Reveal';

interface Module {
  name: string;
  capability: string;
  stack: string;
}

const content = {
  vi: {
    tag: 'Bằng chứng kỹ thuật',
    heading: 'POC SOAI - 6 module đã nghiệm thu',
    sub: 'Từng module dưới đây đã qua nghiệm thu, kèm năng lực cụ thể và nền tảng kỹ thuật đã dùng.',
    colModule: 'Module',
    colCapability: 'Năng lực',
    colStack: 'Nền tảng kỹ thuật',
    modules: [
      { name: 'Phân tích video đóng gói', capability: 'Bóc tách mã QR trong video đóng hàng, gắn mốc thời gian bắt đầu/kết thúc cho từng đơn. Tra được clip của bất kỳ khiếu nại nào.', stack: 'OpenCV · pyzbar · Celery' },
      { name: 'Đếm SKU trên ảnh', capability: 'Đếm vật thể dày đặc trong dưới 3 giây, xuất ảnh có khung phát hiện và lưu phiên bản mô hình đã dùng.', stack: 'YOLOv8 · SAHI' },
      { name: 'Kiểm tra đúng/sai', capability: 'Nghiệp vụ mới định nghĩa bằng lời và vài ảnh mẫu, không cần huấn luyện lại. Mở rộng sang bài toán mới trong ngày.', stack: 'VLM · few-shot' },
      { name: 'Quản lý thiết bị', capability: 'Khai báo thiết bị, kiểm tra kết nối, mật khẩu mã hoá khi lưu.', stack: 'FastAPI · Fernet' },
      { name: 'Live view & snapshot', capability: 'Xem trực tiếp và chụp ảnh thủ công hoặc theo lịch định kỳ.', stack: 'MJPEG · Celery Beat' },
      { name: 'Ghi & trích xuất video', capability: 'Liệt kê bản ghi và cắt clip chính xác theo khoảng thời gian yêu cầu.', stack: 'FFmpeg' },
    ] as Module[],
  },
  en: {
    tag: 'Technical evidence',
    heading: 'SOAI POC - 6 modules accepted',
    sub: 'Each module below has been accepted, with its concrete capability and the technical stack behind it.',
    colModule: 'Module',
    colCapability: 'Capability',
    colStack: 'Technical stack',
    modules: [
      { name: 'Packing video analysis', capability: 'Extracts QR codes from packing footage and timestamps each order’s segment. Any customer complaint can be traced to its clip.', stack: 'OpenCV · pyzbar · Celery' },
      { name: 'SKU image counting', capability: 'Counts densely packed objects in under 3 seconds, returns an annotated image, and records the model version used.', stack: 'YOLOv8 · SAHI' },
      { name: 'Binary classification', capability: 'New checks are defined in plain language plus a few reference images, with no retraining. A new inspection can ship the same day.', stack: 'VLM · few-shot' },
      { name: 'Device management', capability: 'Device registry, connection testing, credentials encrypted at rest.', stack: 'FastAPI · Fernet' },
      { name: 'Live view & snapshot', capability: 'Live streaming plus manual and scheduled snapshots.', stack: 'MJPEG · Celery Beat' },
      { name: 'Video recording & export', capability: 'Lists recordings and cuts clips to an exact requested time range.', stack: 'FFmpeg' },
    ] as Module[],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

export interface EvidenceProps {}

export const Evidence: React.FC<EvidenceProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" id="bang-chung" aria-label="POC evidence">
      <div className="max-w-7xl mx-auto space-y-8">
        <Reveal className="max-w-2xl space-y-4">
          <span className="text-caption font-mono uppercase tracking-wider text-navy-400">{t.tag}</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.sub}</p>
        </Reveal>

        <Reveal as="div" className="overflow-x-auto border border-line bg-paper">
          <table className="w-full min-w-[640px] text-body">
            <thead>
              <tr>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">{t.colModule}</th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper">{t.colCapability}</th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line bg-paper whitespace-nowrap">{t.colStack}</th>
              </tr>
            </thead>
            <tbody>
              {t.modules.map((m, idx) => (
                <tr key={idx} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3.5 text-navy-400 align-top">{m.capability}</td>
                  <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{m.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

export default Evidence;
