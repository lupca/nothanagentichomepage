'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, TrendingUp, Warehouse, Megaphone, Calendar, Settings2 } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  icon: React.ElementType;
  href: string;
}

const COMMANDS: CommandItem[] = [
  {
    id: 'cashflow',
    label: 'Xem báo cáo Dòng tiền doanh nghiệp',
    hint: 'Dành cho chủ doanh nghiệp',
    icon: TrendingUp,
    href: '#use-cases',
  },
  {
    id: 'inventory',
    label: 'Dự báo tồn Kho tự động',
    hint: 'Dành cho quản lý kho vận',
    icon: Warehouse,
    href: '#use-cases',
  },
  {
    id: 'marketing',
    label: 'Quản lý Chiến dịch Marketing đa kênh',
    hint: 'Dành cho đội ngũ marketing',
    icon: Megaphone,
    href: '#use-cases',
  },
  {
    id: 'ai-decisions',
    label: 'Mở Trung tâm điều khiển',
    hint: 'Duyệt đề xuất từ hệ thống',
    icon: Settings2,
    href: '#ai-decisions',
  },
  {
    id: 'demo',
    label: 'Đặt lịch Demo tư vấn',
    hint: 'Nói chuyện với chuyên gia',
    icon: Calendar,
    href: '#lead-capture',
  },
];

export interface CommandPaletteProps {}

export const CommandPalette: React.FC<CommandPaletteProps> = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape') {
        setOpen((prev) => (prev ? false : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
    setQuery('');
    return undefined;
  }, [open]);

  const handleSelect = (item: CommandItem) => {
    close();
    window.setTimeout(() => {
      const target = document.querySelector(item.href);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-brand-bg/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bảng lệnh nhanh"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-secondary/10">
          <Search className="w-5 h-5 text-brand-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm tác vụ, ví dụ: Dòng tiền, Kho hàng..."
            className="w-full text-body text-brand-bg placeholder:text-brand-secondary/50 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-caption font-bold text-brand-secondary/60 border border-brand-secondary/20 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        <ul role="listbox" aria-label="Kết quả lệnh" className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 ? (
            <li className="px-5 py-6 text-body text-brand-secondary text-center">
              Không tìm thấy kết quả phù hợp.
            </li>
          ) : (
            results.map((item) => (
              <li key={item.id} role="option" aria-selected="false">
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center gap-3 px-5 py-3 min-h-[48px] text-left hover:bg-brand-surface transition-colors"
                >
                  <item.icon className="w-4 h-4 text-brand-accent shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-body font-semibold text-brand-bg truncate">
                      {item.label}
                    </span>
                    <span className="block text-caption text-brand-secondary truncate">
                      {item.hint}
                    </span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
