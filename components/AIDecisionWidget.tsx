import React from 'react';
import { Settings2, HardHat, PackageSearch } from 'lucide-react';
import HumanOverridePanel from './HumanOverridePanel';

interface QueuedDecision {
  icon: React.ElementType;
  title: string;
  confidence: number;
}

const queuedDecisions: QueuedDecision[] = [
  { icon: PackageSearch, title: 'Số lượng SKU đếm được lệch so với phiếu xuất kho', confidence: 87 },
  { icon: HardHat, title: 'Phát hiện người ở khu vực hạn chế không đeo bảo hộ', confidence: 78 },
];

export interface AIDecisionWidgetProps {}

export const AIDecisionWidget: React.FC<AIDecisionWidgetProps> = () => {
  return (
    <div id="ai-decisions" className="space-y-6" aria-label="Minh hoạ: AI đề xuất, người vận hành duyệt">
      <div className="max-w-2xl space-y-2">
        <span className="inline-flex items-center gap-2 text-caption font-mono font-bold uppercase tracking-wider text-orange">
          <Settings2 className="w-4 h-4" />
          Minh hoạ tương tác
        </span>
        <h3 className="text-h3 font-bold text-ink">AI đề xuất — người vận hành quyết định</h3>
        <p className="text-body text-navy-400 leading-relaxed">
          Hệ thống phát hiện, chấm điểm độ tin cậy, và đề xuất hành động. Không có bước nào tự thực hiện mà thiếu người duyệt.
        </p>
      </div>

      <div
        data-testid="ai-decision-widget"
        className="bg-ink text-white rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 space-y-6"
      >
        <div
          data-testid="ai-pending-header"
          className="flex items-center gap-2.5 text-state-wait bg-state-wait/10 border border-state-wait/30 rounded-lg px-4 py-2.5 w-fit"
        >
          <HardHat className="w-5 h-5" />
          <span className="text-body font-bold">Đang chờ duyệt (3 phát hiện)</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-orange shrink-0 mt-1" />
              <div>
                <p className="text-body font-bold text-white">
                  Phát hiện: công nhân không đội mũ bảo hộ · Line 2
                </p>
                <p className="text-caption text-white/60 mt-1">
                  Camera khu vực đóng gói · khung hình 14:02:37
                </p>
              </div>
            </div>
            <span className="text-h3 font-extrabold text-orange shrink-0 tabular-nums">92%</span>
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
              <div className="h-full rounded-full bg-orange transition-all" style={{ width: '92%' }} />
            </div>
          </div>

          <HumanOverridePanel itemLabel="Phát hiện: công nhân không đội mũ bảo hộ · Line 2" />
        </div>

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
              <span className="text-caption font-bold text-white/60 shrink-0 tabular-nums">
                {item.confidence}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIDecisionWidget;
