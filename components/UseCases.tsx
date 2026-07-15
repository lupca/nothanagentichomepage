'use client';

import React, { useState } from 'react';
import { Landmark, Warehouse, Megaphone, Check } from 'lucide-react';

export interface UseCaseData {
  id: string;
  role: string;
  topic: string;
  title: string;
  desc: string;
  metrics: string[];
  color: string;
  mockupTitle: string;
  mockupValue: string;
  mockupMetricLabel: string;
  mockupAlert?: string;
  mockupAlertLabel?: string;
  mockupAlertLevel?: 'error' | 'warning' | 'success';
}

export interface UseCasesProps {}

export const UseCases: React.FC<UseCasesProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('owner');

  const useCases: UseCaseData[] = [
    {
      id: 'owner',
      role: 'Chủ doanh nghiệp',
      topic: 'Dòng tiền (Cashflow)',
      title: 'Kiểm soát & Tối ưu dòng tiền real-time',
      desc: 'AI phân tích dữ liệu bán hàng đa kênh, dự báo dòng tiền về trong 30 ngày tới và đưa ra các cảnh báo thiếu hụt vốn lưu động, giúp bạn đưa ra các quyết định tái đầu tư chính xác.',
      metrics: [
        'Dự báo dòng tiền chính xác 95%',
        'Cắt giảm chi phí vận hành đến 30%',
        'Phát hiện rủi ro công nợ tự động',
      ],
      color: 'brand-accent',
      mockupTitle: 'Báo cáo Tài chính Đa Kênh',
      mockupValue: '-30%',
      mockupMetricLabel: 'Chi phí vận hành thủ công',
      mockupAlert: 'Cảnh báo: Dòng tiền âm dự kiến (Tuần 3)',
      mockupAlertLabel: 'Rủi ro cao',
      mockupAlertLevel: 'error',
    },
    {
      id: 'warehouse',
      role: 'Quản lý kho',
      topic: 'Dự báo tồn kho (Auto-forecast)',
      title: 'Tự động dự báo nhu cầu & Đồng bộ tồn kho',
      desc: 'Không lo hết hàng (out-of-stock) hay đọng vốn. Hệ thống tự động phân tích tốc độ bán hàng, mùa vụ để đề xuất kế hoạch nhập hàng tối ưu từ nhà cung cấp.',
      metrics: [
        'Giảm tỷ lệ đứt gãy nguồn hàng xuống dưới 1%',
        'Giảm 35% chi phí lưu kho dư thừa',
        'Tự động đồng bộ số liệu trên 3+ sàn thương mại điện tử',
      ],
      color: 'emerald-success',
      mockupTitle: 'Đồng Bộ Kho Tự Động',
      mockupValue: '99.8%',
      mockupMetricLabel: 'Tỉ lệ sẵn sàng hàng hóa',
      mockupAlert: 'Khuyến nghị: Chuyển 150sp từ Kho A sang Kho B',
      mockupAlertLabel: 'Khuyên dùng',
      mockupAlertLevel: 'success',
    },
    {
      id: 'marketing',
      role: 'Đội ngũ Marketing',
      topic: 'Chiến dịch đa kênh (Cross-campaigns)',
      title: 'Tối ưu hóa ngân sách quảng cáo thông minh',
      desc: 'Tự động phân bổ ngân sách dựa trên hiệu quả doanh thu thời gian thực giữa Shopee, TikTok Shop. AI đề xuất thay đổi nội dung, thông điệp chiến dịch quảng cáo hoạt động kém.',
      metrics: [
        'Tăng ROI quảng cáo trung bình 45%',
        'Tự động phân bổ ngân sách quảng cáo đa sàn',
        'Phát hiện và tắt chiến dịch lỗi trong 15 phút',
      ],
      color: 'sand-gold',
      mockupTitle: 'Tối Ưu Chiến Dịch ROI',
      mockupValue: '+45%',
      mockupMetricLabel: 'Lợi tức chi tiêu quảng cáo (ROAS)',
      mockupAlert: 'Cảnh báo: ROI chiến dịch giảm nhanh',
      mockupAlertLabel: 'Chú ý',
      mockupAlertLevel: 'warning',
    },
  ];

  const currentData = useCases.find((item) => item.id === activeTab) || useCases[0]!;

  const getIcon = (id: string) => {
    switch (id) {
      case 'owner': return <Landmark className="w-5 h-5" />;
      case 'warehouse': return <Warehouse className="w-5 h-5" />;
      case 'marketing': return <Megaphone className="w-5 h-5" />;
      default: return null;
    }
  };

  const getAlertBadgeColor = (level?: 'error' | 'warning' | 'success') => {
    switch (level) {
      case 'error': return 'bg-brand-error/10 text-brand-error border-brand-error/20';
      case 'warning': return 'bg-brand-warning/10 text-brand-warning border-brand-warning/20';
      case 'success': return 'bg-brand-success/10 text-brand-success border-brand-success/20';
      default: return 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20';
    }
  };

  return (
    <section 
      className="bg-white py-20 px-6 md:px-12 lg:px-24"
      id="use-cases"
      aria-label="Các trường hợp sử dụng"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-h2 font-bold text-brand-bg">
            Giải Pháp Đo Ni Đóng Giày Cho Từng Vai Trò
          </h2>
          <p className="text-body text-brand-secondary leading-relaxed">
            Mọi thành viên trong doanh nghiệp đều có thể phối hợp nhịp nhàng và tối đa hóa hiệu suất nhờ trợ lý AI.
          </p>
        </div>

        {/* Dynamic Interactive Tabs */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tab Selector List */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0" role="tablist">
            {useCases.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeTab === item.id}
                aria-controls={`usecase-panel-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-all min-h-[72px] flex-shrink-0 w-[280px] lg:w-full ${
                  activeTab === item.id
                    ? 'bg-brand-bg text-white border-brand-bg shadow-lg'
                    : 'bg-brand-surface text-brand-secondary border-brand-secondary/10 hover:bg-brand-surface/70'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-brand-accent text-brand-bg' : 'bg-white text-brand-secondary'}`}>
                  {getIcon(item.id)}
                </div>
                <div>
                  <div className="text-caption font-bold opacity-80">{item.role}</div>
                  <div className={`text-body font-bold ${activeTab === item.id ? 'text-white' : 'text-brand-bg'}`}>{item.topic}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Tab Panel Details */}
          <div 
            id={`usecase-panel-${currentData.id}`}
            role="tabpanel"
            className="w-full lg:w-2/3 bg-brand-surface p-8 md:p-12 rounded-2xl border border-brand-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]"
          >
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-caption font-bold text-brand-accent uppercase tracking-wider block mb-2">
                  {currentData.role}
                </span>
                <h3 className="text-h2 font-bold text-brand-bg mb-4 leading-snug">
                  {currentData.title}
                </h3>
                <p className="text-body text-brand-secondary leading-relaxed">
                  {currentData.desc}
                </p>
              </div>

              <ul className="space-y-3">
                {currentData.metrics.map((metric, index) => (
                  <li key={index} className="flex items-center gap-3 text-body text-brand-bg font-semibold">
                    <div className="p-1 bg-brand-success/10 text-brand-success rounded-full flex-shrink-0">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Placeholder for Mockup */}
            <div className="bg-white rounded-xl border border-brand-secondary/20 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-brand-surface pb-3">
                  <span className="text-caption font-bold text-brand-secondary uppercase">{currentData.mockupTitle}</span>
                  <span className="text-caption bg-brand-success/15 text-brand-success px-2 py-0.5 rounded font-bold">LIVE</span>
                </div>
                {currentData.mockupAlert && (
                  <div className={`border rounded p-2.5 flex items-center justify-between text-caption ${getAlertBadgeColor(currentData.mockupAlertLevel)}`}>
                    <span className="font-semibold">{currentData.mockupAlert}</span>
                    {currentData.mockupAlertLabel && (
                      <span className="text-[10px] uppercase font-bold border px-1 rounded">{currentData.mockupAlertLabel}</span>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <div className="h-4 bg-brand-surface rounded w-3/4"></div>
                  <div className="h-4 bg-brand-surface rounded w-5/6"></div>
                  <div className="h-4 bg-brand-surface rounded w-2/3"></div>
                </div>
              </div>

              {/* Displaying Outcome Metrics */}
              <div className="bg-brand-bg text-white p-4 rounded-lg mt-8 space-y-2">
                <div className="text-caption text-brand-surface/60 font-semibold uppercase">HIỆU QUẢ CAM KẾT</div>
                <div className="text-h2 font-extrabold text-brand-accent">
                  {currentData.mockupValue}
                </div>
                <div className="text-caption text-brand-surface/80">
                  {currentData.mockupMetricLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
