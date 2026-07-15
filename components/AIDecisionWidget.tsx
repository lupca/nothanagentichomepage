import React from 'react';
import { Sparkles, Warehouse, Megaphone, TrendingUp } from 'lucide-react';
import HumanOverridePanel from './HumanOverridePanel';

interface QueuedDecision {
  icon: React.ElementType;
  title: string;
  confidence: number;
}

const queuedDecisions: QueuedDecision[] = [
  { icon: Megaphone, title: 'Tăng ngân sách quảng cáo TikTok Shop thêm 20%', confidence: 87 },
  { icon: TrendingUp, title: 'Đề xuất giá bán mới cho nhóm SKU chậm luân chuyển', confidence: 78 },
];

export interface AIDecisionWidgetProps {}

export const AIDecisionWidget: React.FC<AIDecisionWidgetProps> = () => {
  return (
    <section
      className="bg-brand-surface py-20 px-6 md:px-12 lg:px-24"
      id="ai-decisions"
      aria-label="Trung tâm điều hành quyết định AI"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-brand-accent">
            <Sparkles className="w-4 h-4" />
            Agentic AI Decision Support
          </span>
          <h2 className="text-h2 font-bold text-brand-bg">
            AI Đề Xuất — Con Người Quyết Định
          </h2>
          <p className="text-body text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Mọi hành động tự động hóa quan trọng đều đi qua bước kiểm duyệt của bạn trước khi thực thi, kèm điểm tin cậy minh bạch từ mô hình AI.
          </p>
        </div>

        <div
          data-testid="ai-decision-widget"
          className="bg-brand-bg text-white rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 space-y-6"
        >
          <div
            data-testid="ai-pending-header"
            className="flex items-center gap-2.5 text-brand-warning bg-brand-warning/10 border border-brand-warning/30 rounded-lg px-4 py-2.5 w-fit"
          >
            <Warehouse className="w-5 h-5" />
            <span className="text-body font-bold">Đang chờ duyệt (3 tác vụ)</span>
          </div>

          {/* Primary decision card with confidence progress bar */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <Warehouse className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                <div>
                  <p className="text-body font-bold text-white">
                    Chuyển 150 sản phẩm từ Kho A sang Kho B
                  </p>
                  <p className="text-caption text-white/60 mt-1">
                    Ngăn ngừa đứt gãy tồn kho dự kiến trong 5 ngày tới
                  </p>
                </div>
              </div>
              <span className="text-h3 font-extrabold text-brand-accent shrink-0">92%</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-caption text-white/60">
                <span>Độ tin cậy của AI</span>
                <span>Rất cao</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={92}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Độ tin cậy AI 92%"
                className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-brand-accent transition-all"
                  style={{ width: '92%' }}
                />
              </div>
            </div>

            <HumanOverridePanel itemLabel="Chuyển 150 sản phẩm từ Kho A sang Kho B" />
          </div>

          {/* Secondary queue - display only, no interactive controls to keep a single override panel */}
          <ul className="space-y-3">
            {queuedDecisions.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-4 rounded-lg bg-white/5 border border-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className="w-4 h-4 text-white/50 shrink-0" />
                  <span className="text-body text-white/80 truncate">{item.title}</span>
                </div>
                <span className="text-caption font-bold text-white/60 shrink-0">
                  {item.confidence}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIDecisionWidget;
