import React from 'react';
import { getLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

const content = {
  vi: {
    heading: 'Năm cam kết',
    sub: 'Chỉ những cam kết khách hàng có thể bắt lỗi được.',
    items: [
      'Lộ trình công khai. Ba giai đoạn của mỗi nền tảng được công bố và cập nhật, kèm ngày.',
      'Dữ liệu là của khách hàng. Xuất toàn bộ dữ liệu ra định dạng mở bất kỳ lúc nào, không phí, không điều kiện.',
      'Bảo trì cam kết theo hợp đồng. Ghi rõ thời hạn và mức phản hồi trong hợp đồng, không để "theo thoả thuận".',
      'Minh bạch khi thẩm định. Cung cấp báo cáo tài chính, danh sách nhân sự và tài liệu kiến trúc cho đối tác trong quá trình đánh giá.',
      'Không khoá bằng phần cứng. Chúng tôi cung cấp thiết bị nhưng không khoá phần mềm vào thiết bị của mình — chuẩn mở là mặc định.',
    ],
  },
  en: {
    heading: 'Five commitments',
    sub: 'Only commitments a customer can actually catch us breaking.',
    items: [
      'Public roadmap. Each platform’s three phases are published and updated, with dates.',
      'Your data is yours. Full data export to an open format any time, no fee, no conditions.',
      'Maintenance committed in the contract. Response times and terms are written into the contract, not left as "by agreement".',
      'Transparent under due diligence. We provide financial reports, staff lists, and architecture documentation to partners during evaluation.',
      'No hardware lock-in. We supply equipment but never lock our software to our own hardware — open standards by default.',
    ],
  },
  sv: {
    heading: 'Fem åtaganden',
    sub: 'Endast åtaganden en kund faktiskt kan hålla oss ansvariga för.',
    items: [
      'Offentlig färdplan. Varje plattforms tre faser publiceras och uppdateras, med datum.',
      'Er data är er egen. Fullständig dataexport till ett öppet format när som helst, utan avgift, utan villkor.',
      'Underhåll som avtalas skriftligt. Svarstider och villkor skrivs in i avtalet, inte lämnas som "enligt överenskommelse".',
      'Transparens vid due diligence. Vi tillhandahåller finansiella rapporter, personallistor och arkitekturdokumentation till partners under utvärdering.',
      'Ingen inlåsning till hårdvara. Vi levererar utrustning men låser aldrig vår mjukvara till vår egen hårdvara — öppna standarder som standard.',
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
