import React from 'react';
import { getLocale } from 'next-intl/server';
import { Reveal } from './Reveal';

type Status = 'live' | 'poc' | 'roadmap';

interface DeviceRow {
  device: string;
  interfaces: string;
  status: Status;
  note: string;
}

const content = {
  vi: {
    tag: 'Kiến trúc mở',
    heading: 'Ma trận tích hợp thiết bị',
    sub: 'Trạng thái tích hợp theo từng dòng thiết bị và giao thức đang hỗ trợ.',
    colDevice: 'Dòng thiết bị',
    colInterfaces: 'Giao diện tích hợp',
    colStatus: 'Trạng thái',
    colNote: 'Ghi chú',
    statusLabel: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' } as Record<Status, string>,
    rows: [
      { device: 'Camera IP theo chuẩn mở', interfaces: 'ONVIF Profile S · RTSP', status: 'live', note: 'Live view, snapshot định kỳ, ghi và trích xuất clip theo mốc thời gian.' },
      { device: 'Axis', interfaces: 'VAPIX · ONVIF', status: 'poc', note: 'Điều khiển thiết bị và lấy luồng hình. Đang trao đổi để tham gia chương trình đối tác của hãng.' },
      { device: 'Axis — AI tại biên', interfaces: 'ACAP', status: 'roadmap', note: 'Nhúng mô hình phát hiện trực tiếp vào camera qua ACAP là giai đoạn 2 của lộ trình SOAI. Hiện chưa triển khai.' },
      { device: 'Hikvision', interfaces: 'ISAPI · SDK', status: 'poc', note: 'Tích hợp luồng hình và quản lý thiết bị.' },
      { device: 'Hộp xử lý biên', interfaces: 'x86 · NVIDIA Jetson', status: 'poc', note: 'Suy luận tại chỗ khi băng thông hoặc chính sách dữ liệu không cho phép đẩy hình lên máy chủ.' },
      { device: 'Thiết bị bán hàng', interfaces: 'POS · máy quét mã · in QR', status: 'roadmap', note: 'Giai đoạn 2 của lộ trình VOMA. Hiện chưa triển khai.' },
    ] as DeviceRow[],
  },
  en: {
    tag: 'Open architecture',
    heading: 'Device integration matrix',
    sub: 'Integration status by device line and supported protocol.',
    colDevice: 'Device line',
    colInterfaces: 'Integration interface',
    colStatus: 'Status',
    colNote: 'Note',
    statusLabel: { live: 'in production', poc: 'proven in POC', roadmap: 'on roadmap' } as Record<Status, string>,
    rows: [
      { device: 'Open-standard IP cameras', interfaces: 'ONVIF Profile S · RTSP', status: 'live', note: 'Live view, scheduled snapshots, recording and clip extraction by time range.' },
      { device: 'Axis', interfaces: 'VAPIX · ONVIF', status: 'poc', note: 'Device control and stream access. In discussion to join the manufacturer’s partner program.' },
      { device: 'Axis — edge AI', interfaces: 'ACAP', status: 'roadmap', note: 'Embedding detection models directly on the camera via ACAP is stage 2 of the SOAI roadmap. Not yet implemented.' },
      { device: 'Hikvision', interfaces: 'ISAPI · SDK', status: 'poc', note: 'Stream integration and device management.' },
      { device: 'Edge processing box', interfaces: 'x86 · NVIDIA Jetson', status: 'poc', note: 'On-site inference when bandwidth or data policy forbids sending footage to a server.' },
      { device: 'Point-of-sale devices', interfaces: 'POS · barcode scanner · QR printer', status: 'roadmap', note: 'Stage 2 of the VOMA roadmap. Not yet implemented.' },
    ] as DeviceRow[],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

export interface DeviceMatrixProps {}

export const DeviceMatrix: React.FC<DeviceMatrixProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" id="he-thong" aria-label="Device integration matrix">
      <div className="max-w-7xl mx-auto space-y-8">
        <Reveal className="max-w-2xl space-y-4">
          <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.tag}</span>
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.sub}</p>
        </Reveal>

        <Reveal as="div" className="overflow-x-auto border border-line">
          <table className="w-full min-w-[640px] text-body">
            <thead>
              <tr className="bg-paper">
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">{t.colDevice}</th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line whitespace-nowrap">{t.colInterfaces}</th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">{t.colStatus}</th>
                <th className="text-left font-mono text-caption uppercase tracking-wider text-navy-400 font-medium px-4 py-3 border-b border-line">{t.colNote}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, idx) => (
                <tr key={idx} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3.5 font-semibold text-ink align-top whitespace-nowrap">{row.device}</td>
                  <td className="px-4 py-3.5 font-mono text-caption text-navy-400 align-top whitespace-nowrap">{row.interfaces}</td>
                  <td className="px-4 py-3.5 align-top">
                    <span className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[row.status]}`}>
                      {t.statusLabel[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-navy-400 align-top">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
};

export default DeviceMatrix;
