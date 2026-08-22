import React from 'react';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { ArrowRight, FileDown } from 'lucide-react';

const content = {
  vi: {
    eyebrow: 'Giải pháp phần cứng + phần mềm · Lõi Agentic AI',
    h1: 'AI chạy trên thiết bị thật, trong nhà máy thật.',
    sub: 'Nỏ Thần Agentic thiết kế và triển khai trọn gói phần cứng và phần mềm cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá — với Agentic AI làm lõi và bảo mật là mặc định, không phải tuỳ chọn.',
    ctaPrimary: 'Hợp tác cùng chúng tôi',
    ctaSecondary: 'Tải hồ sơ năng lực',
    diagramLabel: 'Bảng điều khiển SOAI',
    dashboardAlt: 'Ảnh chụp màn hình Bảng điều khiển vận hành SOAI, hiển thị tình trạng thiết bị, độ chính xác đếm SKU và nhật ký hoạt động AI gần đây',
    dashboardCaption: 'Ảnh chụp hệ thống SOAI với dữ liệu minh hoạ.',
  },
  en: {
    eyebrow: 'Hardware + software solutions · Agentic AI at the core',
    h1: 'AI that runs on real devices, on real factory floors.',
    sub: 'Nỏ Thần Agentic designs and delivers end-to-end hardware and software for production monitoring, workplace safety, and goods control — with agentic AI at the core and security as a default, not an option.',
    ctaPrimary: 'Partner with us',
    ctaSecondary: 'Download capability profile',
    diagramLabel: 'The SOAI dashboard',
    dashboardAlt: 'Screenshot of the SOAI operations telemetry dashboard, showing device fleet status, SKU count accuracy, and a recent AI operations log',
    dashboardCaption: 'SOAI system screenshot with demonstration data.',
  },
  sv: {
    eyebrow: 'Hårdvaru- och mjukvarulösningar · Agentic AI i kärnan',
    h1: 'AI som körs på riktiga enheter, på riktiga fabriksgolv.',
    sub: 'Nỏ Thần Agentic designar och levererar kompletta hårdvaru- och mjukvarulösningar för produktionsövervakning, arbetsmiljösäkerhet och godskontroll — med agentic AI i kärnan och säkerhet som standard, inte tillval.',
    ctaPrimary: 'Bli partner med oss',
    ctaSecondary: 'Ladda ner kompetensprofil',
    diagramLabel: 'SOAI-instrumentpanelen',
    dashboardAlt: 'Skärmbild av SOAI:s driftöversikt, som visar enhetsstatus, SKU-räkningens noggrannhet och en logg över senaste AI-åtgärder',
    dashboardCaption: 'Skärmbild av SOAI-systemet med demonstrationsdata.',
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
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-block">
            <span className="font-mono bg-orange/15 text-orange font-semibold text-caption tracking-wider uppercase px-3 py-1.5 rounded-full">
              {t.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-[1.875rem] md:text-h1 font-bold leading-tight text-white">
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

        {/* Right column: real SOAI dashboard screenshot */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[480px] bg-paper/5 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <p className="text-caption font-mono uppercase tracking-wider text-white/40 mb-3">
              {t.diagramLabel}
            </p>

            <div className="rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-ink-800">
              <Image
                src="/media/soai/dashboard.png"
                alt={t.dashboardAlt}
                width={3200}
                height={2000}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="w-full h-auto max-w-full block"
                priority
              />
            </div>
            <p className="mt-2 text-caption font-mono text-white/40">{t.dashboardCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
