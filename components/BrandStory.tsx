import React from 'react';
import { getLocale } from 'next-intl/server';
import { Reveal } from './Reveal';

const content = {
  vi: {
    quote: 'Nỏ Thần Agentic là công ty kỹ thuật, thành lập tại Hà Nội ngày 23/07/2026.',
    p1: 'Đội kỹ thuật chọn thiết bị, viết phần mềm phân tích, và triển khai trực tiếp tại nhà máy khách hàng.',
    p2: 'Toàn bộ phát triển — từ mô hình AI đến tích hợp thiết bị — do đội kỹ thuật nội bộ thực hiện.',
  },
  en: {
    quote: 'Nỏ Thần Agentic is an engineering company, founded in Hanoi on 23 July 2026.',
    p1: 'The team selects hardware, writes the analysis software, and deploys it directly on customer factory floors.',
    p2: 'All development — from the AI models to device integration — is done by our in-house engineering team.',
  },
  sv: {
    quote: 'Nỏ Thần Agentic är ett tekniskt företag, grundat i Hanoi den 23 juli 2026.',
    p1: 'Teamet väljer hårdvara, skriver analysmjukvaran och installerar den direkt hos kundens fabriker.',
    p2: 'All utveckling — från AI-modellerna till enhetsintegration — görs av vårt interna tekniska team.',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface BrandStoryProps {}

export const BrandStory: React.FC<BrandStoryProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label="Brand story">
      <Reveal className="max-w-3xl mx-auto space-y-6 text-left">
        <p className="font-display text-2xl md:text-3xl font-bold text-ink leading-snug border-l-[3px] border-orange pl-6">
          {t.quote}
        </p>
        <p className="text-body text-navy-400 leading-relaxed">{t.p1}</p>
        <p className="text-body text-navy-400 leading-relaxed">{t.p2}</p>
      </Reveal>
    </section>
  );
};

export default BrandStory;
