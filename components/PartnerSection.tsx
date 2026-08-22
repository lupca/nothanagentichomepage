import React from 'react';
import { getLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

const content = {
  vi: {
    heading: 'Dành cho các hãng phần cứng',
    intro: 'Chúng tôi tiếp cận với vị thế đối tác giải pháp: vừa phát triển phần mềm trên nền tảng của hãng, vừa tích hợp và cung cấp thiết bị cho dự án trọn gói tại Việt Nam.',
    points: [
      { title: 'Phần mềm làm thiết bị của bạn đáng giá hơn.', body: 'Mỗi bài toán nghiệp vụ chúng tôi giải trên camera của hãng là một lý do để khách hàng chọn thiết bị đó thay vì thiết bị rẻ hơn.' },
      { title: 'Mô hình thu phí định kỳ kèm thiết bị.', body: 'Phần mềm được cung cấp theo hình thức thuê bao định kỳ, đi kèm thiết bị đồng bộ. Đội kỹ thuật tiếp tục bảo trì trong suốt thời gian hợp đồng còn hiệu lực.' },
      { title: 'Đội kỹ thuật nội bộ.', body: 'Kiến trúc plugin (AnalysisEngine/DeviceProvider), mô hình AI (YOLOv8, SAHI, VLM) và tích hợp thiết bị (VAPIX, ONVIF, ISAPI) đều do đội kỹ thuật nội bộ của công ty thực hiện.' },
    ],
    cta: 'Trao đổi về hợp tác',
    ctaLink: 'doi-tac',
  },
  en: {
    heading: 'For hardware manufacturers',
    intro: 'We come to you as a solution partner: developing software on your platform, while integrating and supplying your equipment for turnkey projects in Vietnam.',
    points: [
      { title: 'Software makes your hardware worth more.', body: 'Every business problem we solve on your cameras is another reason a customer chooses them over a cheaper alternative.' },
      { title: 'Recurring subscription bundled with hardware.', body: 'Software is delivered as a recurring subscription paired with matched equipment. Our team continues maintenance for the life of the contract.' },
      { title: 'In-house engineering team.', body: 'The plugin architecture (AnalysisEngine/DeviceProvider), the AI models (YOLOv8, SAHI, VLM), and the device integrations (VAPIX, ONVIF, ISAPI) are all built by our in-house team.' },
    ],
    cta: 'Start a partnership conversation',
    ctaLink: 'doi-tac',
  },
  sv: {
    heading: 'För hårdvarutillverkare',
    intro: 'Vi kommer till er som en lösningspartner: vi utvecklar mjukvara på er plattform, samtidigt som vi integrerar och levererar er utrustning för nyckelfärdiga projekt i Vietnam.',
    points: [
      { title: 'Mjukvara gör er hårdvara mer värd.', body: 'Varje affärsproblem vi löser på era kameror är ännu ett skäl för en kund att välja dem framför ett billigare alternativ.' },
      { title: 'Återkommande prenumeration paketerad med hårdvara.', body: 'Mjukvaran levereras som en återkommande prenumeration tillsammans med matchad utrustning. Vårt team fortsätter underhållet under hela avtalstiden.' },
      { title: 'Internt tekniskt team.', body: 'Pluginarkitekturen (AnalysisEngine/DeviceProvider), AI-modellerna (YOLOv8, SAHI, VLM) och enhetsintegrationerna (VAPIX, ONVIF, ISAPI) byggs alla av vårt interna team.' },
    ],
    cta: 'Starta ett partnersamtal',
    ctaLink: 'doi-tac',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface PartnerSectionProps {}

export const PartnerSection: React.FC<PartnerSectionProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" id="doi-tac" aria-label="For hardware manufacturers">
      <div className="max-w-4xl mx-auto space-y-8">
        <Reveal className="space-y-4 max-w-2xl">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.intro}</p>
        </Reveal>

        <div className="space-y-6">
          {t.points.map((p, idx) => (
            <Reveal key={idx} delay={idx * 0.07}>
              <div className="flex gap-4">
                <span className="font-mono text-caption text-orange-600 mt-1.5 shrink-0">0{idx + 1}</span>
                <div>
                  <p className="text-body font-bold text-ink">{p.title}</p>
                  <p className="text-body text-navy-400 leading-relaxed mt-1">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={t.points.length * 0.07}>
          <a
            href={`/${locale}/${t.ctaLink}`}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-ink font-extrabold px-7 py-3.5 rounded-lg transition-all min-h-[48px] group"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default PartnerSection;
