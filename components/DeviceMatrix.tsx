import React from 'react';

type Status = 'live' | 'poc' | 'roadmap';

interface DeviceRow {
  device: string;
  interfaces: string;
  status: Status;
  note: string;
}

const rows: DeviceRow[] = [
  {
    device: 'Camera IP theo chuẩn mở',
    interfaces: 'ONVIF Profile S · RTSP',
    status: 'live',
    note: 'Live view, snapshot định kỳ, ghi và trích xuất clip theo mốc thời gian.',
  },
  {
    device: 'Axis',
    interfaces: 'VAPIX · ONVIF',
    status: 'poc',
    note: 'Điều khiển thiết bị và lấy luồng hình. Đang trao đổi để tham gia chương trình đối tác của hãng.',
  },
  {
    device: 'Axis — AI tại biên',
    interfaces: 'ACAP',
    status: 'roadmap',
    note: 'Đưa mô hình phát hiện chạy trực tiếp trên camera. Mục tiêu hợp tác kỹ thuật đề xuất với hãng.',
  },
  {
    device: 'Hikvision',
    interfaces: 'ISAPI · SDK',
    status: 'poc',
    note: 'Tích hợp luồng hình và quản lý thiết bị.',
  },
  {
    device: 'Hộp xử lý biên',
    interfaces: 'x86 · NVIDIA Jetson',
    status: 'poc',
    note: 'Suy luận tại chỗ khi băng thông hoặc chính sách dữ liệu không cho phép đẩy hình lên máy chủ.',
  },
  {
    device: 'Thiết bị bán hàng',
    interfaces: 'POS · máy quét mã · in QR',
    status: 'roadmap',
    note: 'Thuộc giai đoạn 2 của nền tảng VOMA.',
  },
];

const STATUS_LABEL: Record<Status, string> = {
  live: 'đang chạy',
  poc: 'poc',
  roadmap: 'lộ trình',
};

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

export interface DeviceMatrixProps {}

export const DeviceMatrix: React.FC<DeviceMatrixProps> = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" id="he-thong" aria-label="Ma trận tích hợp thiết bị">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-2xl space-y-4">
          <span className="text-caption font-mono uppercase tracking-wider text-orange-600">Kiến trúc mở</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">Ma trận tích hợp thiết bị</h2>
          <p className="text-body text-navy-400 leading-relaxed">
            Một lớp trừu tượng <code className="font-mono text-caption">DeviceProvider</code> tách nguồn hình ảnh khỏi lõi phân tích — thêm một dòng thiết bị mới là viết thêm plugin, không sửa lõi.
          </p>
        </div>

        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[640px] text-body">
            <thead>
              <tr className="bg-paper">
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                  Dòng thiết bị
                </th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line whitespace-nowrap">
                  Giao diện tích hợp
                </th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                  Trạng thái
                </th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{row.device}</td>
                  <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{row.interfaces}</td>
                  <td className="px-4 py-3.5 align-top">
                    <span className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[row.status]}`}>
                      {STATUS_LABEL[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-navy-400 align-top">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DeviceMatrix;
