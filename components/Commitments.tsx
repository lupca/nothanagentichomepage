import React from 'react';
import { getLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

const content = {
  vi: {
    heading: 'Năm cam kết',
    sub: 'Cam kết có thể kiểm chứng bằng hợp đồng hoặc log hệ thống.',
    items: [
      'Lộ trình công khai. Ba giai đoạn của mỗi nền tảng được công bố và cập nhật, kèm ngày.',
      'Dữ liệu là của khách hàng. Xuất toàn bộ dữ liệu ra định dạng mở bất kỳ lúc nào, không phí, không điều kiện.',
      'Bảo trì theo SLA trong hợp đồng: phản hồi trong 4 giờ làm việc, uptime tối thiểu 98%/tháng, báo trước bảo trì 24 giờ.',
      'Minh bạch khi thẩm định. Cung cấp báo cáo tài chính, danh sách nhân sự và tài liệu kiến trúc cho đối tác trong quá trình đánh giá.',
      'Không khoá bằng phần cứng. Thiết bị được cung cấp nhưng phần mềm không bị khoá vào thiết bị của công ty; hệ thống dùng giao thức mở như ONVIF và RTSP.',
    ],
  },
  en: {
    heading: 'Five commitments',
    sub: 'Commitments that can be checked against the contract or system logs.',
    items: [
      'Public roadmap. Each platform’s three phases are published and updated, with dates.',
      'Your data is yours. Full data export to an open format any time, no fee, no conditions.',
      'Maintenance under contract SLA: response within 4 working hours, minimum 98% monthly uptime, 24 hours’ notice before maintenance.',
      'Transparent under due diligence. We provide financial reports, staff lists, and architecture documentation to partners during evaluation.',
      'No hardware lock-in. We supply equipment, but the software is not tied to our own hardware; the system uses open protocols such as ONVIF and RTSP.',
    ],
  },
  sv: {
    heading: 'Fem åtaganden',
    sub: 'Åtaganden som kan kontrolleras mot avtalet eller systemloggarna.',
    items: [
      'Offentlig färdplan. Varje plattforms tre faser publiceras och uppdateras, med datum.',
      'Er data är er egen. Fullständig dataexport till ett öppet format när som helst, utan avgift, utan villkor.',
      'Underhåll enligt avtalets SLA: svar inom 4 arbetstimmar, minst 98 % månatlig drifttid, 24 timmars varsel före underhåll.',
      'Transparens vid due diligence. Vi tillhandahåller finansiella rapporter, personallistor och arkitekturdokumentation till partners under utvärdering.',
      'Ingen inlåsning till hårdvara. Vi levererar utrustning, men mjukvaran är inte bunden till vår egen hårdvara; systemet använder öppna protokoll som ONVIF och RTSP.',
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface CommitmentsProps {}

export const Commitments: React.FC<CommitmentsProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" id="cong-ty" aria-label="Commitments">
      <div className="max-w-3xl mx-auto space-y-8">
        <Reveal className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.sub}</p>
        </Reveal>

        <ul className="space-y-4">
          {t.items.map((c, idx) => (
            <Reveal key={idx} as="li" delay={idx * 0.06} className="flex gap-3">
              <div className="p-1 bg-state-ok/10 text-state-ok rounded-full shrink-0 mt-0.5">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-body text-ink leading-relaxed">{c}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Commitments;
