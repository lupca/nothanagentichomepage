'use client';

import React, { useState } from 'react';
import { ArrowRight, Play, Activity } from 'lucide-react';
import { Logo } from './Logo';

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);

  return (
    <section 
      className="relative bg-brand-bg text-white overflow-hidden py-20 px-6 md:px-12 lg:px-24"
      aria-label="Introduction Hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,92,5,0.1),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-block">
            <span className="bg-brand-accent/20 text-brand-accent font-semibold text-caption tracking-wider uppercase px-3 py-1.5 rounded-full">
              Công cụ quản lý bán hàng đa sàn
            </span>
          </div>

          <h1 className="text-[1.875rem] md:text-h1 font-bold leading-tight text-white">
            Tự động hóa toàn diện chuỗi cung ứng & Marketing
          </h1>

          <p className="text-body text-oatmeal-white/80 max-w-xl leading-relaxed">
            Quản lý tồn kho, đơn hàng và quảng cáo trên nhiều sàn TMĐT từ một nơi. Hệ thống tự cảnh báo khi có vấn đề, bạn chỉ cần duyệt và quyết định.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Primary CTA: Safety Orange bg, Dark text for WCAG 2.1 AA (5.5:1 contrast) */}
            <a
              href="#lead-capture"
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-extrabold px-8 py-4 rounded-lg shadow-lg hover:shadow-brand-accent/20 transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2 group"
            >
              Dùng thử miễn phí 7 ngày
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA: Outline */}
            <a
              href="#lead-capture"
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all text-center min-h-[48px] min-w-[200px] flex items-center justify-center gap-2"
            >
              Đặt lịch Demo tư vấn
              <Play className="w-4 h-4 fill-current" />
            </a>
          </div>

          {/* Platform integrations */}
          <div className="pt-8 space-y-3 border-t border-white/10">
            <p className="text-caption text-oatmeal-white/60 uppercase tracking-wider font-semibold">
              Tích hợp sẵn với
            </p>
            <div className="flex flex-wrap gap-6 items-center text-caption text-oatmeal-white/50">
              <span>Shopee</span>
              <span>•</span>
              <span>TikTok Shop</span>
              <span>•</span>
              <span>Lazada</span>
              <span>•</span>
              <span>GHTK</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive SVG AI Dashboard Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[480px] aspect-[4/3] bg-brand-surface/5 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-sm group hover:border-brand-accent/30 transition-all">
            
            <div className="absolute -top-3 -left-3 bg-brand-accent text-brand-bg p-2 rounded-lg shadow-lg">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>

            {/* SVG AI Dashboard Mockup */}
            <svg
              className="w-full h-full text-white"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Bảng vận hành AI"
            >
              {/* Grid Lines */}
              <path d="M10 50 H390 M10 100 H390 M10 150 H390 M10 200 H390" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Header Bar */}
              <rect x="15" y="15" width="80" height="15" rx="3" fill="rgba(255,255,255,0.1)" />
              <circle cx="365" cy="22" r="5" fill="#059669" />
              <rect x="300" y="18" width="50" height="8" rx="2" fill="rgba(255,255,255,0.15)" />

              {/* Sidebar items */}
              <rect x="15" y="45" width="70" height="10" rx="2" fill="rgba(255,255,255,0.05)" />
              <rect x="15" y="65" width="70" height="10" rx="2" fill="rgba(255,255,255,0.05)" />
              <rect x="15" y="85" width="70" height="10" rx="2" fill="rgba(255,255,255,0.05)" />

              {/* Interactive Widget 1: Inventory */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredWidget('inventory')}
                onMouseLeave={() => setHoveredWidget(null)}
                onClick={() => setHoveredWidget(hoveredWidget === 'inventory' ? null : 'inventory')}
              >
                <rect 
                  x="100" 
                  y="45" 
                  width="135" 
                  height="110" 
                  rx="6" 
                  fill={hoveredWidget === 'inventory' ? 'rgba(242, 92, 5, 0.15)' : 'rgba(29, 11, 59, 0.6)'} 
                  stroke={hoveredWidget === 'inventory' ? '#F25C05' : 'rgba(255, 255, 255, 0.1)'} 
                  strokeWidth="1.5"
                  className="transition-colors duration-200"
                />
                <text x="110" y="65" fill="#F8F6F0" fontSize="10" fontWeight="bold">DỰ BÁO TỒN KHO</text>
                <text x="110" y="105" fill="#059669" fontSize="24" fontWeight="bold">99.8%</text>
                <text x="110" y="130" fill="rgba(255,255,255,0.5)" fontSize="8">Độ chính xác dự báo</text>
              </g>

              {/* Interactive Widget 2: Orders */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredWidget('orders')}
                onMouseLeave={() => setHoveredWidget(null)}
                onClick={() => setHoveredWidget(hoveredWidget === 'orders' ? null : 'orders')}
              >
                <rect 
                  x="250" 
                  y="45" 
                  width="135" 
                  height="110" 
                  rx="6" 
                  fill={hoveredWidget === 'orders' ? 'rgba(242, 92, 5, 0.15)' : 'rgba(29, 11, 59, 0.6)'} 
                  stroke={hoveredWidget === 'orders' ? '#F25C05' : 'rgba(255, 255, 255, 0.1)'} 
                  strokeWidth="1.5"
                  className="transition-colors duration-200"
                />
                <text x="260" y="65" fill="#F8F6F0" fontSize="10" fontWeight="bold">ĐƠN HÀNG TỰ ĐỘNG</text>
                <text x="260" y="105" fill="#F25C05" fontSize="24" fontWeight="bold">1,842</text>
                <text x="260" y="130" fill="rgba(255,255,255,0.5)" fontSize="8">Đơn đã xử lý / ngày</text>
              </g>

              {/* Status bar & Recommendations */}
              <g>
                <rect x="100" y="165" width="285" height="60" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255, 255, 255, 0.1)" />
                {hoveredWidget === 'inventory' ? (
                  <>
                    <text x="115" y="185" fill="#059669" fontSize="10" fontWeight="bold">✓ KHÔNG CÓ RỦI RO ĐỨT GÃY</text>
                    <text x="115" y="200" fill="rgba(255,255,255,0.8)" fontSize="8">Đã đồng bộ tồn kho Shopee & TikTok Shop</text>
                    <text x="115" y="213" fill="#D97706" fontSize="8" fontWeight="bold">Khuyến nghị: Chuyển 150sp từ Kho A sang B</text>
                  </>
                ) : hoveredWidget === 'orders' ? (
                  <>
                    <text x="115" y="185" fill="#F25C05" fontSize="10" fontWeight="bold">⚡ XỬ LÝ TỰ ĐỘNG SIÊU TỐC</text>
                    <text x="115" y="200" fill="rgba(255,255,255,0.8)" fontSize="8">Thời gian xử lý trung bình: 1.2s / đơn hàng</text>
                    <text x="115" y="213" fill="#059669" fontSize="8" fontWeight="bold">Tỷ lệ tự động hoàn thành: 94.2%</text>
                  </>
                ) : (
                  <>
                    <text x="115" y="185" fill="#D97706" fontSize="10" fontWeight="bold">💡 ĐỀ XUẤT HỆ THỐNG AI</text>
                    <text x="115" y="200" fill="rgba(255,255,255,0.7)" fontSize="8">Hover hoặc click vào các ô trên để phân tích dữ liệu chi tiết</text>
                    <text x="115" y="213" fill="rgba(255,255,255,0.5)" fontSize="8">AI Agent đang chạy ngầm...</text>
                  </>
                )}
              </g>

              {/* Status bar */}
              <rect x="15" y="240" width="370" height="45" rx="6" fill="rgba(242, 92, 5, 0.1)" stroke="rgba(242, 92, 5, 0.3)" />
              <text x="30" y="266" fill="#F25C05" fontSize="10" fontFamily="sans-serif" fontWeight="bold">AI AGENT ACTIVE</text>
              <text x="140" y="266" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Tự động đồng bộ hóa kho Shopee & TikTok Shop thành công</text>
            </svg>
            
            {/* Absolute overlay logo for visual connection */}
            <div className="absolute top-2 left-2 p-2 bg-brand-bg rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Logo variant="negative" className="scale-75 origin-top-left" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
