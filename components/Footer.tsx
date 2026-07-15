import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const navigationGroups = [
    {
      title: 'Giải Pháp',
      links: [
        { label: 'Tự động hóa Kho', href: '#use-cases' },
        { label: 'Tối ưu Dòng tiền', href: '#use-cases' },
        { label: 'Marketing Đa kênh', href: '#use-cases' },
      ],
    },
    {
      title: 'Hỗ Trợ',
      links: [
        { label: 'Tài liệu hướng dẫn', href: '#' },
        { label: 'Trung tâm trợ giúp', href: '#' },
        { label: 'Đơn vị kết nối', href: '#' },
      ],
    },
    {
      title: 'Doanh Nghiệp',
      links: [
        { label: 'Về chúng tôi', href: '#' },
        { label: 'Liên hệ tư vấn', href: '#lead-capture' },
        { label: 'Bảo mật ISO', href: '#' },
      ],
    },
  ];

  return (
    <footer 
      className="bg-brand-bg text-white border-t border-white/10 py-16 px-6 md:px-12 lg:px-24"
      aria-label="Footer doanh nghiệp"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          {/* Company details */}
          <div className="md:col-span-5 space-y-4">
            {/* Logo has minimum 4x buffer provided by p-1 */}
            <div className="p-1 inline-block">
              <Logo variant="negative" />
            </div>
            <p className="text-body text-oatmeal-white/70 max-w-sm leading-relaxed">
              Hệ sinh thái vận hành & bán hàng đa kênh bằng Agentic AI tiên phong tại Việt Nam, nâng tầm hiệu suất và tự động hóa chuỗi cung ứng.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/15 bg-white/5 text-caption font-semibold">
              <ShieldCheck className="w-5 h-5 text-brand-success" />
              <p className="m-0">Tiêu chuẩn bảo mật ISO/IEC 27001</p>
            </div>
          </div>

          {/* Links Column matrix */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navigationGroups.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-caption font-bold uppercase tracking-wider text-brand-accent">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        className="text-body text-oatmeal-white/75 hover:text-white transition-colors min-h-[40px] flex items-center"
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

        {/* Contact info column */}
        <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-brand-accent shrink-0" />
            <span className="text-body text-oatmeal-white/75">lienhe@nothanagentic.vn</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-brand-accent shrink-0" />
            <span className="text-body text-oatmeal-white/75">097 6007006</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
            <span className="text-body text-oatmeal-white/75">Phố Lê Văn Hiến, Phường Đức Thắng, Quận Bắc Từ Liêm, Hà Nội</span>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-caption text-oatmeal-white/60">
          <p>
            &copy; {new Date().getFullYear()} NoThanagentic. Bảo lưu mọi quyền.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1 min-h-[36px]"
            >
              <span>Zalo OA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1 min-h-[36px]"
            >
              <span>Facebook Messenger</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="hover:text-white transition-colors min-h-[36px] flex items-center">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors min-h-[36px] flex items-center">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
