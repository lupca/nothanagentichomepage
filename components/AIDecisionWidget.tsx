import React from 'react';
import { getLocale } from 'next-intl/server';
import { Settings2, HardHat, PackageSearch } from 'lucide-react';
import HumanOverridePanel from './HumanOverridePanel';

const content = {
  vi: {
    tag: 'Minh hoạ tương tác',
    title: 'AI đề xuất - người vận hành quyết định',
    sub: 'Hệ thống phát hiện, chấm điểm độ tin cậy, và đề xuất hành động. Không có bước nào tự thực hiện mà thiếu người duyệt.',
    pendingLabel: 'Đang chờ duyệt (3 phát hiện)',
    primaryTitle: 'Phát hiện: công nhân không đội mũ bảo hộ · Line 2',
    primaryMeta: 'Camera khu vực đóng gói · khung hình 14:02:37',
    confidenceLabel: 'Độ tin cậy của AI',
    confidenceLevel: 'Rất cao',
    itemLabel: 'Phát hiện: công nhân không đội mũ bảo hộ · Line 2',
    queue: [
      { title: 'Số lượng SKU đếm được lệch so với phiếu xuất kho', confidence: 87 },
      { title: 'Phát hiện người ở khu vực hạn chế không đeo bảo hộ', confidence: 78 },
    ],
  },
  en: {
    tag: 'Interactive demo',
    title: 'AI proposes - the operator decides',
    sub: 'The system detects, scores its own confidence, and proposes an action. No step runs on its own without a human approval.',
    pendingLabel: 'Pending review (3 detections)',
    primaryTitle: 'Detection: worker without a hard hat · Line 2',
    primaryMeta: 'Packing area camera · frame 14:02:37',
    confidenceLabel: 'AI confidence',
    confidenceLevel: 'Very high',
    itemLabel: 'Detection: worker without a hard hat · Line 2',
    queue: [
      { title: 'Counted SKU quantity differs from the outbound slip', confidence: 87 },
      { title: 'Person detected in a restricted area without PPE', confidence: 78 },
    ],
  },
  sv: {
    tag: 'Interaktiv demo',
    title: 'AI föreslår - operatören beslutar',
    sub: 'Systemet upptäcker, bedömer sin egen tillförlitlighet och föreslår en åtgärd. Inget steg utförs på egen hand utan mänskligt godkännande.',
    pendingLabel: 'Väntar på godkännande (3 upptäckter)',
    primaryTitle: 'Upptäckt: arbetare utan skyddshjälm · Linje 2',
    primaryMeta: 'Kamera vid förpackningsområdet · bildruta 14:02:37',
    confidenceLabel: 'AI-tillförlitlighet',
    confidenceLevel: 'Mycket hög',
    itemLabel: 'Upptäckt: arbetare utan skyddshjälm · Linje 2',
    queue: [
      { title: 'Räknad SKU-mängd avviker från utleveranssedeln', confidence: 87 },
      { title: 'Person upptäckt i ett begränsat område utan skyddsutrustning', confidence: 78 },
    ],
  },
};

function pick(locale: string) {
  return content[locale as 'vi' | 'en' | 'sv'] ?? content.en;
}

export interface AIDecisionWidgetProps {}

export const AIDecisionWidget: React.FC<AIDecisionWidgetProps> = async () => {
  const locale = await getLocale();
  const t = pick(locale);
  const queueIcons = [PackageSearch, HardHat] as const;

  return (
    <div id="ai-decisions" className="space-y-6" aria-label="AI proposes, operator approves">
      <div className="max-w-2xl space-y-2">
        <span className="inline-flex items-center gap-2 text-caption font-mono font-bold uppercase tracking-wider text-orange">
          <Settings2 className="w-4 h-4" />
          {t.tag}
        </span>
        <h3 className="text-h3 font-bold text-ink">{t.title}</h3>
        <p className="text-body text-navy-400 leading-relaxed">{t.sub}</p>
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
          <span className="text-body font-bold">{t.pendingLabel}</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-orange shrink-0 mt-1" />
              <div>
                <p className="text-body font-bold text-white">{t.primaryTitle}</p>
                <p className="text-caption text-white/60 mt-1">{t.primaryMeta}</p>
              </div>
            </div>
            <span className="text-h3 font-extrabold text-orange shrink-0 tabular-nums">92%</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-caption text-white/60">
              <span>{t.confidenceLabel}</span>
              <span>{t.confidenceLevel}</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={92}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${t.confidenceLabel} 92%`}
              className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden"
            >
              <div className="h-full rounded-full bg-orange transition-all" style={{ width: '92%' }} />
            </div>
          </div>

          <HumanOverridePanel itemLabel={t.itemLabel} />
        </div>

        <ul className="space-y-3">
          {t.queue.map((item, idx) => {
            const Icon = queueIcons[idx]!;
            return (
              <li
                key={idx}
                className="flex items-center justify-between gap-4 rounded-lg bg-white/5 border border-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 text-white/50 shrink-0" />
                  <span className="text-body text-white/80 truncate">{item.title}</span>
                </div>
                <span className="text-caption font-bold text-white/60 shrink-0 tabular-nums">
                  {item.confidence}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AIDecisionWidget;
