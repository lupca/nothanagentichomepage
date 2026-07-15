'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Cách hoạt động', href: '#how-it-works' },
  { label: 'Use case', href: '#use-cases' },
  { label: 'Trung tâm AI', href: '#ai-decisions' },
  { label: 'Khách hàng', href: '#testimonials' },
  { label: 'Câu hỏi', href: '#faq' },
];

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 bg-brand-bg/90 backdrop-blur-md border-b border-white/10"
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

        <div className="hidden lg:block shrink-0">
          <a
            href="#lead-capture"
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-extrabold px-5 py-2.5 rounded-lg transition-all min-h-[44px] flex items-center justify-center"
          >
            Dùng thử miễn phí
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
          className="lg:hidden border-t border-white/10 px-6 py-4 space-y-1 bg-brand-bg"
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
            className="block bg-brand-accent text-brand-bg font-extrabold px-5 py-3 rounded-lg text-center mt-3 min-h-[44px] flex items-center justify-center"
          >
            Dùng thử miễn phí
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
