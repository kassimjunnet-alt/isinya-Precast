import React, { useEffect } from 'react';
import { CheckCircle2, Info, X, ArrowRight } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info';
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-white border border-stone-200 rounded-xl shadow-xl p-4 text-stone-900 animate-in slide-in-from-top-4 fade-in duration-200">
      <div className="flex items-start gap-3">
        <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-stone-950 font-['Space_Grotesk'] leading-snug">
            {toast.title}
          </h4>
          {toast.description && (
            <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
              {toast.description}
            </p>
          )}
          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                onClose();
              }}
              className="mt-2 text-[11px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{toast.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 p-1 -mr-1 -mt-1 transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
