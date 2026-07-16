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
      topic: 'Theo dõi dòng tiền',
      title: 'Biết tiền về khi nào, thiếu lúc nào',
      desc: 'Gộp dữ liệu từ các sàn, hệ thống tự tính dòng tiền dự kiến và cảnh báo khi có nguy cơ thiếu vốn. Không cần ngồi cộng Excel nữa.',
      metrics: [
        'Dự báo dòng tiền 30 ngày tới',
        'Cảnh báo khi sắp âm vốn',
        'Tổng hợp từ nhiều nguồn tự động',
      ],
      color: 'brand-accent',
      mockupTitle: 'Báo cáo dòng tiền',
      mockupValue: '30 ngày',
      mockupMetricLabel: 'Dự báo trước',
      mockupAlert: 'Cảnh báo: Dự kiến thiếu vốn tuần 3',
      mockupAlertLabel: 'Cần xem',
      mockupAlertLevel: 'error',
    },
    {
      id: 'warehouse',
      role: 'Quản lý kho',
      topic: 'Đồng bộ tồn kho',
      title: 'Hết lo sai lệch số giữa các sàn',
      desc: 'Số trên Shopee, TikTok Shop, Lazada tự đồng bộ về một chỗ. Hệ thống cảnh báo khi sắp hết hàng hoặc tồn quá nhiều.',
      metrics: [
        'Đồng bộ tồn kho nhiều sàn',
        'Cảnh báo sắp hết hàng',
        'Gợi ý điều chuyển kho',
      ],
      color: 'emerald-success',
      mockupTitle: 'Tồn kho đa kênh',
      mockupValue: 'Realtime',
      mockupMetricLabel: 'Đồng bộ liên tục',
      mockupAlert: 'Gợi ý: Chuyển hàng từ Kho A sang Kho B',
      mockupAlertLabel: 'Xem thử',
      mockupAlertLevel: 'success',
    },
    {
      id: 'marketing',
      role: 'Đội Marketing',
      topic: 'Quảng cáo đa sàn',
      title: 'Biết chiến dịch nào đang lỗ',
      desc: 'Gom số liệu quảng cáo từ các sàn, so sánh hiệu quả và cảnh báo khi có chiến dịch đang chạy lỗ để tắt kịp thời.',
      metrics: [
        'So sánh ROI giữa các sàn',
        'Cảnh báo chiến dịch lỗ',
        'Gợi ý phân bổ ngân sách',
      ],
      color: 'sand-gold',
      mockupTitle: 'Hiệu quả quảng cáo',
      mockupValue: 'So sánh',
      mockupMetricLabel: 'ROI các sàn',
      mockupAlert: 'Cảnh báo: Chiến dịch X đang lỗ',
      mockupAlertLabel: 'Xem ngay',
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
          <h2 className="text-2xl md:text-h2 font-bold text-brand-bg">
            Giải Pháp Đo Ni Đóng Giày Cho Từng Vai Trò
          </h2>
          <p className="text-body text-brand-secondary leading-relaxed">
            Mỗi người một việc, AI hỗ trợ đúng chỗ cần.
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
                <h3 className="text-xl md:text-2xl font-bold text-brand-bg mb-4 leading-snug">
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
                <div className="text-3xl md:text-h2 font-extrabold text-brand-accent">
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
