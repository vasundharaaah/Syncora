import React from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useSyncoraStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderGlow = 'border-[#0e9aa7]/40 shadow-[0_4px_24px_rgba(14,154,167,0.25)]';
        let iconColor = 'text-[#5fe3c0]';

        if (toast.type === 'alert') {
          Icon = AlertTriangle;
          borderGlow = 'border-[#8c2b3d]/50 shadow-[0_4px_24px_rgba(140,43,61,0.35)]';
          iconColor = 'text-[#ff6b81]';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderGlow = 'border-[#2f7be8]/40 shadow-[0_4px_24px_rgba(47,123,232,0.25)]';
          iconColor = 'text-[#cdbbf0]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#0d0b17]/90 backdrop-blur-2xl border ${borderGlow} transition-all duration-300 animate-in slide-in-from-bottom-3`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-white truncate">{toast.title}</h4>
                <span className="text-[10px] font-mono text-white/40">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-white/70 mt-1 leading-relaxed line-clamp-2">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-white/40 hover:text-white p-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
