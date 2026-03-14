import React from 'react';
import { Card } from '../../components/ui';
import { BarChart3 } from 'lucide-react';

export default function SystemAnalytics() {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold italic">View performance metrics and platform growth trends.</p>
        </div>
      </div>
      
      <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
        <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
          <BarChart3 size={40} />
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest italic opacity-60">Analytics dashboard coming soon.</p>
      </Card>
    </div>
  );
}
