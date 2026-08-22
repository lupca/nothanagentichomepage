'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
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

const NAV_LINKS = [
  { label: 'Năng lực', href: '#nang-luc' },
  { label: 'Công nghệ', href: '#he-thong' },
  { label: 'Bằng chứng', href: '#bang-chung' },
  { label: 'Bảo mật', href: '#bao-mat' },
  { label: 'Đối tác', href: '#doi-tac' },
  { label: 'Công ty', href: '#cong-ty' },
];

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 bg-ink/90 backdrop-blur-md border-b border-white/10"
      aria-label="Điều hướng chính"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 md:px-12 lg:px-24 py-3">
        <a href="#" className="p-1 shrink-0" aria-label="NoThanagentic - Trang chủ">
          <Logo variant="negative" />
        </a>

        <nav aria-label="Danh mục điều hướng" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body font-semibold text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <LocaleSwitcher />
          <a
            href="#lead-capture"
            className="bg-orange hover:bg-orange/90 text-ink font-extrabold px-5 py-2.5 rounded-lg transition-all min-h-[44px] flex items-center justify-center"
          >
            Hợp tác cùng chúng tôi
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          className="lg:hidden w-11 h-11 flex items-center justify-center text-white shrink-0"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Danh mục điều hướng di động"
          className="lg:hidden border-t border-white/10 px-6 py-4 space-y-1 bg-ink"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-body font-semibold text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#lead-capture"
            onClick={() => setMenuOpen(false)}
            className="block bg-orange text-ink font-extrabold px-5 py-3 rounded-lg text-center mt-3 min-h-[44px] flex items-center justify-center"
          >
            Hợp tác cùng chúng tôi
          </a>
          <LocaleSwitcher className="pt-3" />
        </nav>
      )}
    </header>
  );
};

export default Header;
