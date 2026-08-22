import React from 'react';
import { getLocale } from 'next-intl/server';
import { Reveal } from './Reveal';

const content = {
  vi: {
    quote: 'Nỏ Thần Agentic là công ty kỹ thuật, thành lập tại Hà Nội ngày 23/07/2026.',
    p1: 'Đội kỹ thuật chọn thiết bị, viết phần mềm phân tích, và triển khai tại nhà máy khách hàng. Kiến trúc plugin tách nguồn hình ảnh (DeviceProvider) khỏi lõi phân tích (AnalysisEngine); thêm một dòng camera mới là viết một plugin, không sửa lõi hệ thống.',
    p2: 'Công ty có hai thành viên góp vốn và một đội kỹ thuật nội bộ. Sản phẩm SOAI đã qua nghiệm thu POC với 126/126 kịch bản test tự động pass trên 8 test suite, kiểm định độc lập.',
  },
  en: {
    quote: 'Nỏ Thần Agentic is an engineering company, founded in Hanoi on 23 July 2026.',
    p1: 'The team selects hardware, writes the analysis software, and deploys it on customer factory floors. A plugin architecture separates the image source (DeviceProvider) from the analysis core (AnalysisEngine); adding a new camera line means writing a plugin, not changing the core.',
    p2: 'The company has two founding members and an in-house engineering team. The SOAI platform completed its POC with 126 of 126 automated test scenarios passed across 8 test suites, verified by an independent audit.',
  },
  sv: {
    quote: 'Nỏ Thần Agentic är ett tekniskt företag, grundat i Hanoi den 23 juli 2026.',
    p1: 'Teamet väljer hårdvara, skriver analysmjukvaran och installerar den hos kundens fabriker. En pluginarkitektur separerar bildkällan (DeviceProvider) från analyskärnan (AnalysisEngine); att lägga till en ny kameramodell innebär att skriva en plugin, inte att ändra kärnan.',
    p2: 'Företaget har två grundare och ett internt tekniskt team. SOAI-plattformen genomförde sin POC med 126 av 126 automatiska testscenarier godkända över 8 testsviter, verifierat av en oberoende granskning.',
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
