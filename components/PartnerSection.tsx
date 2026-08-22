import React from 'react';
import { getLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';

const content = {
  vi: {
    heading: 'Dành cho các hãng phần cứng',
    intro: 'Chúng tôi tiếp cận với vị thế đối tác giải pháp: vừa phát triển phần mềm trên nền tảng của hãng, vừa tích hợp và cung cấp thiết bị cho dự án trọn gói tại Việt Nam.',
    points: [
      { title: 'Phần mềm làm thiết bị của bạn đáng giá hơn.', body: 'Mỗi bài toán nghiệp vụ chúng tôi giải trên camera của hãng là một lý do để khách hàng chọn thiết bị đó thay vì thiết bị rẻ hơn.' },
      { title: 'Chúng tôi sống bằng doanh thu định kỳ, nên chúng tôi ở lại.', body: 'Mô hình của chúng tôi là phần mềm thuê theo chu kỳ kèm thiết bị, không phải dự án một lần rồi rút. Khách hàng còn dùng thì chúng tôi còn phải bảo trì.' },
      { title: 'Đội kỹ thuật là người của chúng tôi.', body: 'Kiến trúc, mô hình và tích hợp thiết bị đều do đội nội bộ làm và chịu trách nhiệm, không gia công lại cho bên thứ ba.' },
    ],
    cta: 'Trao đổi về hợp tác',
    ctaLink: 'doi-tac',
  },
  en: {
    heading: 'For hardware manufacturers',
    intro: 'We come to you as a solution partner: developing software on your platform, while integrating and supplying your equipment for turnkey projects in Vietnam.',
    points: [
      { title: 'Software makes your hardware worth more.', body: 'Every business problem we solve on your cameras is another reason a customer chooses them over a cheaper alternative.' },
      { title: 'We live on recurring revenue, so we stay.', body: 'Our model is subscription software bundled with equipment, not one-off project delivery. As long as the customer is running, we are still maintaining.' },
      { title: 'The engineering team is ours.', body: 'Architecture, models, and device integration are built and owned by our in-house team, not subcontracted.' },
    ],
    cta: 'Start a partnership conversation',
    ctaLink: 'doi-tac',
  },
  sv: {
    heading: 'För hårdvarutillverkare',
    intro: 'Vi kommer till er som en lösningspartner: vi utvecklar mjukvara på er plattform, samtidigt som vi integrerar och levererar er utrustning för nyckelfärdiga projekt i Vietnam.',
    points: [
      { title: 'Mjukvara gör er hårdvara mer värd.', body: 'Varje affärsproblem vi löser på era kameror är ännu ett skäl för en kund att välja dem framför ett billigare alternativ.' },
      { title: 'Vi lever på återkommande intäkter, så vi stannar.', body: 'Vår modell är prenumerationsmjukvara paketerad med utrustning, inte engångsprojekt. Så länge kunden är i drift fortsätter vi att underhålla systemet.' },
      { title: 'Det tekniska teamet är vårt eget.', body: 'Arkitektur, modeller och enhetsintegration byggs och ägs av vårt interna team, inte av underleverantörer.' },
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
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.intro}</p>
        </div>

        <div className="space-y-6">
          {t.points.map((p, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="font-mono text-caption text-orange-600 mt-1.5 shrink-0">0{idx + 1}</span>
              <div>
                <p className="text-body font-bold text-ink">{p.title}</p>
                <p className="text-body text-navy-400 leading-relaxed mt-1">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href={`/${locale}/${t.ctaLink}`}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-ink font-extrabold px-7 py-3.5 rounded-lg transition-all min-h-[48px] group"
        >
          {t.cta}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default PartnerSection;
