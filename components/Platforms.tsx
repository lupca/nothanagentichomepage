import React from 'react';
import { getLocale } from 'next-intl/server';
import { ArrowUpRight, ScanEye, ShoppingBag } from 'lucide-react';
import { Reveal } from './Reveal';

const content = {
  vi: {
    heading: 'Hai nền tảng, một đội kỹ thuật',
    sub: 'Nỏ Thần Agentic là đơn vị kỹ thuật xây và vận hành hai nền tảng sản phẩm. Mỗi nền tảng có vai trò riêng.',
    soaiTitle: 'SOAI.VN — AI Vision',
    soaiBody: 'Giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá bằng thị giác máy tính. Nền tảng mũi nhọn — 6 module đã nghiệm thu, xem mục bằng chứng bên dưới.',
    soaiCta: 'Xem bằng chứng kỹ thuật',
    vomaTitle: 'VOMA.VN — Thương mại đa kênh',
    vomaBody: 'Nền tảng bán hàng đa kênh với các module hoá đơn điện tử, bán hàng online/offline, kế toán và quản lý kho. Đã đăng ký bảo hộ nhãn hiệu độc quyền tại Việt Nam.',
    vomaCta: 'Xem tại voma.vn',
  },
  en: {
    heading: 'Two platforms, one engineering team',
    sub: 'Nỏ Thần Agentic is the engineering unit that builds and operates two product platforms. Each has its own role.',
    soaiTitle: 'SOAI.VN — AI Vision',
    soaiBody: 'Production monitoring, workplace safety, and goods control via computer vision. Our flagship platform — 6 modules already accepted, see the evidence section below.',
    soaiCta: 'See the technical evidence',
    vomaTitle: 'VOMA.VN — Multichannel commerce',
    vomaBody: 'A multichannel sales platform with modules for e-invoicing, online/offline sales, accounting, and warehousing. Trademark-registered in Vietnam.',
    vomaCta: 'Visit voma.vn',
  },
  sv: {
    heading: 'Två plattformar, ett tekniskt team',
    sub: 'Nỏ Thần Agentic är det tekniska team som bygger och driver två produktplattformar. Var och en har sin egen roll.',
    soaiTitle: 'SOAI.VN — AI Vision',
    soaiBody: 'Produktionsövervakning, arbetsmiljösäkerhet och godskontroll med datorseende. Vår flaggskeppsplattform — 6 moduler redan godkända, se bevisavsnittet nedan.',
    soaiCta: 'Se den tekniska dokumentationen',
    vomaTitle: 'VOMA.VN — Multikanalhandel',
    vomaBody: 'En plattform för multikanalförsäljning med moduler för e-fakturering, online- och offlineförsäljning, bokföring och lagerhantering. Varumärkesregistrerad i Vietnam.',
    vomaCta: 'Besök voma.vn',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface PlatformsProps {}

export const Platforms: React.FC<PlatformsProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);

  return (
    <section className="bg-paper py-20 px-6 md:px-12 lg:px-24" aria-label="Two product platforms">
      <div className="max-w-7xl mx-auto space-y-10">
        <Reveal className="max-w-2xl space-y-4">
          <h2 className="font-display text-2xl md:text-h2 font-bold text-ink">{t.heading}</h2>
          <p className="text-body text-navy-400 leading-relaxed">{t.sub}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-white border border-line p-8 space-y-4 h-full">
              <div className="p-3 bg-ink rounded-lg w-fit">
                <ScanEye className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-h3 font-bold text-ink">{t.soaiTitle}</h3>
              <p className="text-body text-navy-400 leading-relaxed">{t.soaiBody}</p>
              <a href={`/${locale}/giai-phap/soai`} className="inline-flex items-center gap-1.5 text-body font-semibold text-orange-600 hover:underline">
                {t.soaiCta}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="bg-white border border-line p-8 space-y-4 h-full">
              <div className="p-3 bg-ink rounded-lg w-fit">
                <ShoppingBag className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-h3 font-bold text-ink">{t.vomaTitle}</h3>
              <p className="text-body text-navy-400 leading-relaxed">{t.vomaBody}</p>
              <a href={`/${locale}/giai-phap/voma`} className="inline-flex items-center gap-1.5 text-body font-semibold text-orange-600 hover:underline">
                {t.vomaCta}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
