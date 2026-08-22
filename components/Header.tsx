'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { locales } from '@/i18n/routing';

const LocaleSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const pathname = usePathname() || '/vi';
  const segments = pathname.split('/');

  const hrefFor = (locale: string) => {
    const next = [...segments];
    next[1] = locale;
    return next.join('/') || '/';
  };

  const currentLocale = segments[1];

  return (
    <div className={`flex items-center gap-2 text-caption font-bold uppercase ${className}`}>
      {locales.map((locale, idx) => (
        <React.Fragment key={locale}>
          {idx > 0 && <span className="text-white/30">/</span>}
          <a
            href={hrefFor(locale)}
            aria-current={currentLocale === locale ? 'true' : undefined}
            className={
              currentLocale === locale
                ? 'text-white'
                : 'text-white/50 hover:text-white transition-colors'
            }
          >
            {locale}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};

const content = {
  vi: {
    navLinks: [
      { label: 'Năng lực', href: '#nang-luc' },
      { label: 'Công nghệ', href: '/cong-nghe' },
      { label: 'Bảo mật', href: '/bao-mat' },
      { label: 'Đối tác', href: '/doi-tac' },
      { label: 'Công ty', href: '/cong-ty' },
      { label: 'Tin tức', href: '/tin-tuc' },
    ],
    cta: 'Hợp tác cùng chúng tôi',
    homeLabel: 'Nỏ Thần Agentic - Trang chủ',
    menuOpen: 'Đóng menu',
    menuClosed: 'Mở menu',
  },
  en: {
    navLinks: [
      { label: 'Capabilities', href: '#nang-luc' },
      { label: 'Technology', href: '/cong-nghe' },
      { label: 'Security', href: '/bao-mat' },
      { label: 'Partners', href: '/doi-tac' },
      { label: 'Company', href: '/cong-ty' },
      { label: 'News', href: '/tin-tuc' },
    ],
    cta: 'Partner with us',
    homeLabel: 'Nỏ Thần Agentic - Home',
    menuOpen: 'Close menu',
    menuClosed: 'Open menu',
  },
  sv: {
    navLinks: [
      { label: 'Kompetens', href: '#nang-luc' },
      { label: 'Teknik', href: '/cong-nghe' },
      { label: 'Säkerhet', href: '/bao-mat' },
      { label: 'Partners', href: '/doi-tac' },
      { label: 'Företag', href: '/cong-ty' },
      { label: 'Nyheter', href: '/tin-tuc' },
    ],
    cta: 'Bli partner med oss',
    homeLabel: 'Nỏ Thần Agentic - Hem',
    menuOpen: 'Stäng menyn',
    menuClosed: 'Öppna menyn',
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const locale = useLocale();
  const t = pick(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  const hrefFor = (href: string) => `/${locale}${href}`;

  return (
    <header
      className="sticky top-0 z-30 bg-ink/90 backdrop-blur-md border-b border-white/10"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 md:px-12 lg:px-8 xl:px-24 py-3">
        <a href={`/${locale}`} className="p-1 shrink-0" aria-label={t.homeLabel}>
          <Logo variant="negative" />
        </a>

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-5 xl:gap-7">
          {t.navLinks.map((link) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
              className="text-body font-semibold text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4 xl:gap-6 shrink-0">
          <LocaleSwitcher />
          <a
            href={`/${locale}#lead-capture`}
            className="bg-orange hover:bg-orange/90 text-ink font-extrabold px-4 xl:px-5 py-2.5 rounded-lg transition-all min-h-[44px] flex items-center justify-center whitespace-nowrap text-[0.95rem]"
          >
            {t.cta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t.menuOpen : t.menuClosed}
          className="xl:hidden w-11 h-11 flex items-center justify-center text-white shrink-0"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="xl:hidden border-t border-white/10 px-6 py-4 space-y-1 bg-ink"
        >
          {t.navLinks.map((link) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
              onClick={() => setMenuOpen(false)}
              className="block text-body font-semibold text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`/${locale}#lead-capture`}
            onClick={() => setMenuOpen(false)}
            className="block bg-orange text-ink font-extrabold px-5 py-3 rounded-lg text-center mt-3 min-h-[44px] flex items-center justify-center"
          >
            {t.cta}
          </a>
          <LocaleSwitcher className="pt-3" />
        </nav>
      )}
    </header>
  );
};

export default Header;
