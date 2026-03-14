import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { icon: <CheckCircle2 className="text-emerald-500" />, class: 'border-emerald-100 bg-emerald-50' },
    error: { icon: <AlertCircle className="text-rose-500" />, class: 'border-rose-100 bg-rose-50' },
    info: { icon: <Info className="text-blue-500" />, class: 'border-blue-100 bg-blue-50' },
    warning: { icon: <AlertCircle className="text-amber-500" />, class: 'border-amber-100 bg-amber-50' },
  };

  const { icon, class: styleClass } = config[type] || config.success;

  return (
    <div className={`fixed top-4 right-4 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl animate-slide-up ${styleClass}`}>
      <div className="shrink-0">{icon}</div>
      <p className="text-sm font-bold text-slate-800 tracking-tight">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-lg transition-colors text-slate-400">
        <X size={14} />
      </button>
    </div>
  );
}
