import React from 'react';
import { getLocale } from 'next-intl/server';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

const content = {
  vi: {
    description: 'Giải pháp phần cứng + phần mềm lấy Agentic AI làm lõi, cho giám sát sản xuất, an toàn lao động và kiểm soát hàng hoá tại doanh nghiệp Việt Nam.',
    securityNote: 'Mã hoá tại chỗ · chặn path traversal · triển khai on-prem',
    groups: [
      { title: 'Giải Pháp', links: [
        { label: 'Ba trụ năng lực', href: '#nang-luc' },
        { label: 'Công nghệ', href: '/cong-nghe' },
        { label: 'Bằng chứng POC', href: '/giai-phap/soai#bang-chung-soai' },
      ]},
      { title: 'Đối Tác', links: [
        { label: 'Dành cho hãng phần cứng', href: '/doi-tac' },
        { label: 'Bảo mật & engineering', href: '/bao-mat' },
        { label: 'Liên hệ hợp tác', href: '/lien-he' },
      ]},
      { title: 'Công Ty', links: [
        { label: 'Về chúng tôi', href: '/cong-ty' },
        { label: 'Tuyển dụng', href: '/tuyen-dung' },
        { label: 'Tin tức', href: '/tin-tuc' },
      ]},
    ],
    copyright: 'Bảo lưu mọi quyền.',
    privacy: 'Chính sách bảo mật',
    terms: 'Điều khoản dịch vụ',
  },
  en: {
    description: 'Hardware + software solutions with Agentic AI at the core, for production monitoring, workplace safety, and goods control at Vietnamese businesses.',
    securityNote: 'Encrypted at rest · path traversal blocked · on-prem deployment',
    groups: [
      { title: 'Solutions', links: [
        { label: 'Three capability pillars', href: '#nang-luc' },
        { label: 'Technology', href: '/cong-nghe' },
        { label: 'POC evidence', href: '/giai-phap/soai#bang-chung-soai' },
      ]},
      { title: 'Partners', links: [
        { label: 'For hardware manufacturers', href: '/doi-tac' },
        { label: 'Security & engineering', href: '/bao-mat' },
        { label: 'Partner inquiries', href: '/lien-he' },
      ]},
      { title: 'Company', links: [
        { label: 'About us', href: '/cong-ty' },
        { label: 'Careers', href: '/tuyen-dung' },
        { label: 'News', href: '/tin-tuc' },
      ]},
    ],
    copyright: 'All rights reserved.',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
  },
  sv: {
    description: 'Hårdvaru- och mjukvarulösningar med Agentic AI i kärnan, för produktionsövervakning, arbetsmiljösäkerhet och godskontroll hos vietnamesiska företag.',
    securityNote: 'Krypterat i vila · skydd mot path traversal · installation on-prem',
    groups: [
      { title: 'Lösningar', links: [
        { label: 'Tre kompetenspelare', href: '#nang-luc' },
        { label: 'Teknik', href: '/cong-nghe' },
        { label: 'POC-bevis', href: '/giai-phap/soai#bang-chung-soai' },
      ]},
      { title: 'Partners', links: [
        { label: 'För hårdvarutillverkare', href: '/doi-tac' },
        { label: 'Säkerhet & teknik', href: '/bao-mat' },
        { label: 'Partnerförfrågningar', href: '/lien-he' },
      ]},
      { title: 'Företag', links: [
        { label: 'Om oss', href: '/cong-ty' },
        { label: 'Karriär', href: '/tuyen-dung' },
        { label: 'Nyheter', href: '/tin-tuc' },
      ]},
    ],
    copyright: 'Alla rättigheter förbehållna.',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);
  const hrefFor = (href: string) => (href.startsWith('http') ? href : `/${locale}${href}`);

  return (
    <footer
      className="bg-ink text-white border-t border-white/10 py-16 px-6 md:px-12 lg:px-24"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          <div className="md:col-span-5 space-y-4">
            <div className="p-1 inline-block">
              <Logo variant="negative" />
            </div>
            <p className="text-body text-paper/70 max-w-sm leading-relaxed">{t.description}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/15 bg-white/5 text-caption font-semibold">
              <ShieldCheck className="w-5 h-5 text-state-ok" />
              <p className="m-0">{t.securityNote}</p>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {t.groups.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-caption font-bold uppercase tracking-wider text-orange">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={hrefFor(link.href)}
                        className="text-body text-paper/75 hover:text-white transition-colors min-h-[40px] flex items-center"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-orange shrink-0" />
            <span className="text-body text-paper/75">lienhe@nothanagentic.vn</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-orange shrink-0" />
            <span className="text-body text-paper/75">097 6007006</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" />
            <span className="text-body text-paper/75">Phố Lê Văn Hiến, Phường Đức Thắng, Quận Bắc Từ Liêm, Hà Nội</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-caption text-paper/60">
          <p>&copy; {new Date().getFullYear()} Nỏ Thần Agentic. {t.copyright}</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://zalo.me/nothanagentic"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 min-h-[36px]"
            >
              <span>Zalo OA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.messenger.com/t/nothanagentic"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 min-h-[36px]"
            >
              <span>Facebook Messenger</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="hover:text-white transition-colors min-h-[36px] flex items-center">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors min-h-[36px] flex items-center">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
