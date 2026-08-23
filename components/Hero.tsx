import React from 'react';
import { getLocale } from 'next-intl/server';
import { ArrowRight, FileDown } from 'lucide-react';
import HeroVideo from './HeroVideo';

const content = {
  vi: {
    eyebrow: 'Giải pháp phần cứng và phần mềm · Lõi Agentic AI',
    h1: 'Tích hợp camera IP qua ONVIF và RTSP, xử lý dữ liệu ngay tại nhà máy.',
    sub: 'Nỏ Thần Agentic thiết kế và triển khai phần cứng và phần mềm cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá. Agentic AI xử lý dữ liệu tại lõi hệ thống; thông tin đăng nhập thiết bị mã hoá bằng Fernet khi lưu.',
    ctaPrimary: 'Hợp tác cùng chúng tôi',
    ctaSecondary: 'Tải hồ sơ năng lực',
    diagramLabel: 'Bảng điều khiển SOAI',
    dashboardAlt: 'Video quay màn hình hệ thống SOAI, đi qua Bảng điều khiển vận hành, Quản lý thiết bị, Đếm SKU và Phân tích đóng gói',
    dashboardCaption: 'Video thao tác trên hệ thống SOAI với dữ liệu minh hoạ.',
  },
  en: {
    eyebrow: 'Hardware and software solutions · Agentic AI at the core',
    h1: 'Connects to IP cameras over ONVIF and RTSP and processes all data on-site at your factory.',
    sub: 'Nỏ Thần Agentic designs and delivers hardware and software for production monitoring, workplace safety, and goods control. Agentic AI runs at the core of the system, and device credentials are encrypted with Fernet at rest.',
    ctaPrimary: 'Partner with us',
    ctaSecondary: 'Download capability profile',
    diagramLabel: 'The SOAI dashboard',
    dashboardAlt: 'Screen recording walking through the SOAI system: the operations dashboard, device management, SKU counting, and packing analysis',
    dashboardCaption: 'Walkthrough video of the SOAI system with demonstration data.',
  },
  sv: {
    eyebrow: 'Hårdvaru- och mjukvarulösningar · Agentic AI i kärnan',
    h1: 'Ansluter till IP-kameror via ONVIF och RTSP och bearbetar all data på plats i fabriken.',
    sub: 'Nỏ Thần Agentic designar och levererar hårdvara och mjukvara för produktionsövervakning, arbetsmiljösäkerhet och godskontroll. Agentic AI körs i systemets kärna, och enhetsuppgifter krypteras med Fernet i vila.',
    ctaPrimary: 'Bli partner med oss',
    ctaSecondary: 'Ladda ner kompetensprofil',
    diagramLabel: 'SOAI-instrumentpanelen',
    dashboardAlt: 'Skärminspelning som visar SOAI-systemet: driftöversikten, enhetshantering, SKU-räkning och förpackningsanalys',
    dashboardCaption: 'Genomgångsvideo av SOAI-systemet med demonstrationsdata.',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section
      className="relative bg-ink text-white overflow-hidden py-20 px-6 md:px-12 lg:px-24"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,84,30,0.12),transparent_40%)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-block">
            <span className="font-mono bg-orange/15 text-orange font-semibold text-caption tracking-wider uppercase px-3 py-1.5 rounded-full">
              {t.eyebrow}
            </span>
          </div>

          <h1
            className="font-display text-[1.75rem] sm:text-[2.1rem] lg:text-[2.5rem] font-bold leading-[1.2] text-white [text-wrap:balance]"
          >
            {t.h1}
          </h1>

          <p className="text-body text-paper/80 max-w-xl leading-relaxed">
            {t.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href={`/${locale}/doi-tac`}
              className="bg-orange hover:bg-orange/90 text-ink font-extrabold px-8 py-4 rounded-lg shadow-lg hover:shadow-orange/20 transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2 group"
            >
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={locale === 'vi' ? '/nothanagentic-capability-profile-vi.pdf' : '/nothanagentic-capability-profile-en.pdf'}
              target="_blank"
              rel="noreferrer"
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2"
            >
              {t.ctaSecondary}
              <FileDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/*
          Right column: silent walkthrough video of the SOAI system, shown
          uncropped at its native 16:10 aspect ratio. The floating chat widget is
          fixed to the bottom-right of the viewport on every page, so on short mobile
          screens it can land on top of whatever content is at the bottom of the
          initial (unscrolled) view. The extra top margin below pushes this visual
          block down far enough that the widget's circle sits over empty hero
          background instead of the video - the video itself remains fully visible
          once the visitor scrolls a little further.
        */}
        <div className="lg:col-span-6 flex justify-center mt-28 sm:mt-0">
          <div className="relative w-full max-w-[720px] bg-paper/5 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <p className="text-caption font-mono uppercase tracking-wider text-white/60 mb-3">
              {t.diagramLabel}
            </p>

            <div className="relative w-full aspect-[16/10] rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-ink-800">
              <HeroVideo alt={t.dashboardAlt} />
            </div>
            <p className="mt-2 text-caption font-mono text-white/60">{t.dashboardCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
