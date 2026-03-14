import React from 'react';
import { Card } from '../../components/ui';
import { Search } from 'lucide-react';

export default function BookingMonitoring() {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking Monitoring</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold italic">Track active and recently completed bookings across the platform.</p>
        </div>
      </div>
      
      <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
        <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
          <Search size={40} />
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest italic opacity-60">System Monitoring module coming soon.</p>
      </Card>
    </div>
  );
}
