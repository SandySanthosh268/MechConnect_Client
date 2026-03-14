import React from 'react';
import { Wrench } from 'lucide-react';

export default function Loader({ fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <Wrench size={32} strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-2xl animate-spin" />
      </div>
      <p className="text-sm font-black text-slate-600 uppercase tracking-widest animate-bounce">Loading...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[10000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
