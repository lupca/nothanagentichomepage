import type { Metadata } from 'next';
import { ShoppingBag, BadgeCheck, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import FloatingContact from '@/components/FloatingContact';
import { Reveal } from '@/components/Reveal';
import { ImageLightbox } from '@/components/ImageLightbox';

type Status = 'live' | 'poc' | 'roadmap';

const STATUS_LABEL: Record<'vi' | 'en', Record<Status, string>> = {
  vi: { live: 'đang chạy', poc: 'poc', roadmap: 'lộ trình' },
  en: { live: 'in production', poc: 'proven in poc', roadmap: 'on roadmap' },
};

const STATUS_CLASS: Record<Status, string> = {
  live: 'text-state-ok border-state-ok',
  poc: 'text-state-wait border-state-wait',
  roadmap: 'text-navy-400 border-navy-400',
};

function StatusTag({ status, locale }: { status: Status; locale: 'vi' | 'en' }) {
  return (
    <span
      className={`inline-block whitespace-nowrap text-caption font-mono uppercase tracking-wide px-2 py-0.5 border ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[locale][status]}
    </span>
  );
}

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const content = {
  vi: {
    metaTitle: 'VOMA.VN - Nền tảng bán hàng đa kênh và quản trị vận hành',
    metaDescription:
      'VOMA là nền tảng bán hàng đa kênh và quản trị vận hành, đã đăng ký bảo hộ nhãn hiệu độc quyền tại Việt Nam. Nỏ Thần Agentic phụ trách phần tích hợp phần cứng.',
    eyebrow: 'VOMA.VN - Thương mại đa kênh',
    h1: 'Nền tảng bán hàng đa kênh và quản trị vận hành',
    intro:
      'VOMA là nền tảng phần mềm quản trị bán hàng đa kênh: hoá đơn điện tử, bán hàng online (các sàn như TikTok, Shopee) và offline, kế toán, và quản lý kho bãi trong một hệ thống. VOMA được một đội kỹ thuật riêng trong Nỏ Thần Agentic phụ trách và phát triển trực tiếp.',
    screenshotsEyebrow: 'Giao diện thật',
    screenshotsTitle: 'Ảnh chụp trực tiếp từ nền tảng VOMA',
    screenshots: [
      {
        src: '/media/voma/channel.png',
        alt: 'Màn hình Kênh bán hàng của VOMA, hiển thị trạng thái kết nối và uỷ quyền với Shopee Vietnam, TikTok Shop và Lazada Vietnam',
        caption: 'Ảnh chụp hệ thống VOMA với dữ liệu minh hoạ.',
        width: 1829,
        height: 923,
      },
      {
        src: '/media/voma/order.png',
        alt: 'Màn hình Quản lý đơn hàng của VOMA, liệt kê đơn hàng theo kênh bán, trạng thái và tổng tiền',
        caption: 'Ảnh chụp hệ thống VOMA với dữ liệu minh hoạ.',
        width: 1847,
        height: 920,
      },
    ] satisfies Screenshot[],
    trademarkEyebrow: 'Tài sản pháp lý',
    trademarkTitle: 'Đã đăng ký bảo hộ nhãn hiệu độc quyền tại Việt Nam',
    trademarkBody:
      'VOMA đã đăng ký bảo hộ nhãn hiệu độc quyền tại Việt Nam. Một đội kỹ thuật riêng trong Nỏ Thần Agentic phát triển và duy trì nền tảng liên tục.',
    hardwareEyebrow: 'Nơi giao nhau với phần cứng NTA',
    hardwareTitle: 'Lộ trình tích hợp phần cứng',
    hardwareIntro:
      'Nỏ Thần Agentic là đơn vị phụ trách phần tích hợp phần cứng của VOMA trong lộ trình 3 giai đoạn của nền tảng:',
    hardwarePhase2Title: 'Giai đoạn 2',
    hardwarePhase2Body: 'Tích hợp cổng thanh toán và phần cứng bán hàng, ví dụ máy POS, máy quét mã vạch, thiết bị tạo mã QR. Chưa triển khai.',
    hardwarePhase3Title: 'Giai đoạn 3',
    hardwarePhase3Body: 'Ứng dụng thị giác máy tính vào giám sát vận hành bán hàng và quản lý nhập/xuất kho. Chưa triển khai; cần chạy thử nghiệm trước khi thương mại hoá.',
    ctaTitle: 'Xem chi tiết sản phẩm tại voma.vn',
    ctaBody: 'Toàn bộ tính năng, bảng giá và tài liệu sản phẩm VOMA được công bố tại trang chính của nền tảng.',
    ctaButton: 'Truy cập voma.vn',
  },
  en: {
    metaTitle: 'VOMA.VN - Multi-channel Commerce and Management Platform',
    metaDescription:
      'VOMA is a multi-channel commerce and management platform with a registered trademark in Vietnam. Nỏ Thần Agentic handles its hardware integration track.',
    eyebrow: 'VOMA.VN - Multi-channel Commerce',
    h1: 'A multi-channel commerce and management platform',
    intro:
      'VOMA is a commerce management platform covering e-invoicing, online selling (marketplaces like TikTok and Shopee) and offline selling, accounting, and warehouse management in one system. It is owned and developed by a dedicated team within Nỏ Thần Agentic.',
    screenshotsEyebrow: 'Real UI',
    screenshotsTitle: 'Screenshots straight from the VOMA platform',
    screenshots: [
      {
        src: '/media/voma/channel.png',
        alt: 'VOMA sales channels screen, showing connection and authorization status with Shopee Vietnam, TikTok Shop, and Lazada Vietnam',
        caption: 'VOMA system screenshot with demonstration data.',
        width: 1829,
        height: 923,
      },
      {
        src: '/media/voma/order.png',
        alt: 'VOMA order management screen, listing orders by sales channel, status, and total amount',
        caption: 'VOMA system screenshot with demonstration data.',
        width: 1847,
        height: 920,
      },
    ] satisfies Screenshot[],
    trademarkEyebrow: 'Legal asset',
    trademarkTitle: 'Registered trademark protection in Vietnam',
    trademarkBody:
      'VOMA has registered trademark protection in Vietnam. A dedicated team within Nỏ Thần Agentic develops and maintains the platform on an ongoing basis.',
    hardwareEyebrow: 'Where it meets NTA hardware',
    hardwareTitle: 'Hardware integration roadmap',
    hardwareIntro: 'Nỏ Thần Agentic handles the hardware integration track of VOMA’s three-phase roadmap:',
    hardwarePhase2Title: 'Phase 2',
    hardwarePhase2Body: 'Payment gateway and point-of-sale hardware, such as POS terminals, barcode scanners, and QR code generation devices. Not yet implemented.',
    hardwarePhase3Title: 'Phase 3',
    hardwarePhase3Body: 'Computer vision applied to sales floor monitoring and warehouse in/out management. Not yet implemented; a trial run is planned before commercial rollout.',
    ctaTitle: 'See the full product at voma.vn',
    ctaBody: 'Full feature set, pricing, and product documentation for VOMA are published on the platform’s own site.',
    ctaButton: 'Visit voma.vn',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en'] ?? content.en;
}

const LIGHTBOX_LABELS: Record<'vi' | 'en' | 'sv', { open: string; close: string }> = {
  vi: { open: 'Xem ảnh phóng to', close: 'Đóng' },
  en: { open: 'Enlarge image', close: 'Close' },
  sv: { open: 'Förstora bild', close: 'Stäng' },
};

function pickLightboxLabels(locale: string) {
  return LIGHTBOX_LABELS[locale as 'vi' | 'en' | 'sv'] ?? LIGHTBOX_LABELS.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = pick(locale);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function VomaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === 'vi' ? 'vi' : 'en') as 'vi' | 'en';
  const t = pick(rawLocale);
  const lightboxLabels = pickLightboxLabels(rawLocale);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper text-ink antialiased">
        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-wider text-orange">
              <ShoppingBag className="w-4 h-4" />
              {t.eyebrow}
            </span>
            <h1 className="font-display text-h1 font-extrabold text-white">{t.h1}</h1>
            <p className="text-body text-white/80 leading-relaxed max-w-2xl">{t.intro}</p>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line" aria-label={t.screenshotsTitle}>
          <div className="max-w-5xl mx-auto space-y-8">
            <Reveal className="max-w-2xl space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.screenshotsEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.screenshotsTitle}</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {t.screenshots.map((s, idx) => (
                <Reveal key={idx} delay={idx * 0.07}>
                  <figure className="space-y-2">
                    <ImageLightbox
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      caption={s.caption}
                      openLabel={lightboxLabels.open}
                      closeLabel={lightboxLabels.close}
                      className="shadow-sm"
                    />
                    <figcaption className="text-caption font-mono text-navy-400">{s.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-3xl mx-auto space-y-6">
            <div
              className="bg-paper border border-line p-8 space-y-4"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
              }}
            >
              <div className="p-3 bg-ink rounded-lg w-fit">
                <BadgeCheck className="w-6 h-6 text-orange" />
              </div>
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.trademarkEyebrow}</span>
              <h2 className="text-h3 font-bold text-ink">{t.trademarkTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.trademarkBody}</p>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 px-6 md:px-12 lg:px-24 border-b border-line">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="text-caption font-mono uppercase tracking-wider text-orange-600">{t.hardwareEyebrow}</span>
              <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.hardwareTitle}</h2>
              <p className="text-body text-navy-400 leading-relaxed">{t.hardwareIntro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-line p-6 space-y-3">
                <StatusTag status="roadmap" locale={locale} />
                <h3 className="text-h3 font-bold text-ink">{t.hardwarePhase2Title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{t.hardwarePhase2Body}</p>
              </div>
              <div className="bg-white border border-line p-6 space-y-3">
                <StatusTag status="roadmap" locale={locale} />
                <h3 className="text-h3 font-bold text-ink">{t.hardwarePhase3Title}</h3>
                <p className="text-body text-navy-400 leading-relaxed">{t.hardwarePhase3Body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink text-white py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="font-display text-2xl md:text-h2 font-bold text-white">{t.ctaTitle}</h2>
            <p className="text-body text-white/80 leading-relaxed">{t.ctaBody}</p>
            <a
              href="https://voma.vn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold text-body px-8 py-4 rounded-lg hover:bg-orange-400 transition-colors text-lg"
            >
              {t.ctaButton}
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <CommandPalette />
      <FloatingContact />
    </>
  );
}
