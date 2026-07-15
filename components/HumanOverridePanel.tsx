'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, X, RotateCcw, Undo2 } from 'lucide-react';

type ActionType = 'approve' | 'reject' | 'override';

interface PendingToast {
  action: ActionType;
  label: string;
  secondsLeft: number;
}

const ACTION_COPY: Record<ActionType, string> = {
  approve: 'Đã phê duyệt',
  reject: 'Đã từ chối',
  override: 'Đã ghi đè',
};

const COUNTDOWN_SECONDS = 10;

export interface HumanOverridePanelProps {
  itemLabel?: string;
}

export const HumanOverridePanel: React.FC<HumanOverridePanelProps> = ({
  itemLabel = 'Chuyển 150 sản phẩm từ Kho A sang Kho B',
}) => {
  const [toast, setToast] = useState<PendingToast | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => clearCountdown, []);

  const triggerAction = (action: ActionType) => {
    clearCountdown();
    setToast({ action, label: ACTION_COPY[action], secondsLeft: COUNTDOWN_SECONDS });

    intervalRef.current = setInterval(() => {
      setToast((current) => {
        if (!current) return current;
        const next = current.secondsLeft - 1;
        if (next <= 0) {
          clearCountdown();
          return null;
        }
        return { ...current, secondsLeft: next };
      });
    }, 1000);
  };

  const handleUndo = () => {
    clearCountdown();
    setToast(null);
  };

  return (
    <div
      data-testid="human-override-panel"
      className="rounded-xl border border-brand-secondary/15 bg-white p-4 space-y-3"
    >
      <p className="text-caption font-bold text-brand-secondary uppercase tracking-wider">
        Hành động kiểm duyệt
      </p>
      <p className="text-body text-brand-bg leading-snug">{itemLabel}</p>

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={() => triggerAction('approve')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-brand-success text-white font-bold text-body hover:bg-brand-success/90 transition-colors"
        >
          <Check className="w-4 h-4" />
          Phê duyệt
        </button>
        <button
          type="button"
          onClick={() => triggerAction('reject')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-brand-error text-white font-bold text-body hover:bg-brand-error/90 transition-colors"
        >
          <X className="w-4 h-4" />
          Từ chối
        </button>
        <button
          type="button"
          onClick={() => triggerAction('override')}
          className="flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-brand-secondary/30 text-brand-bg font-bold text-body hover:bg-brand-surface transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Ghi đè
        </button>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center gap-4 bg-brand-bg text-white px-5 py-4 rounded-xl shadow-2xl border border-white/10 min-w-[300px]"
        >
          <span className="text-body font-semibold flex-1">
            {toast.label} · Hoàn tất sau {toast.secondsLeft}s
          </span>
          <button
            type="button"
            onClick={handleUndo}
            className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-lg bg-white/10 hover:bg-white/20 font-bold text-body transition-colors shrink-0"
          >
            <Undo2 className="w-4 h-4" />
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default HumanOverridePanel;
