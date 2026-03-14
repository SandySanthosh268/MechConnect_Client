import React, { useState, useEffect } from 'react';
import { getMechanicBookings } from '../../services/bookingService';
import { Card, Loader } from '../../components/ui';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  Star,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MechanicOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getMechanicBookings()
      .then(r => setBookings(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) return <Loader />;

  const stats = [
    { icon: <ClipboardList />, label: 'Total Jobs', value: bookings.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: <AlertCircle />, label: 'New Requests', value: bookings.filter(b => b.status === 'REQUESTED').length, color: 'text-amber-600', bg: 'bg-amber-600/10' },
    { icon: <TrendingUp />, label: 'Active Jobs', value: bookings.filter(b => ['ACCEPTED', 'PICKUP_STARTED', 'SERVICE_IN_PROGRESS'].includes(b.status)).length, color: 'text-indigo-600', bg: 'bg-indigo-600/10' },
    { icon: <CheckCircle2 />, label: 'Completed', value: bookings.filter(b => ['COMPLETED','PAYMENT_COMPLETED'].includes(b.status)).length, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Workshop Overview 🔧</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Monitoring your business performance and incoming jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 border-none shadow-xl shadow-slate-200/50 flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 24, strokeWidth: 2.5 })}
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">{s.value}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 border-none bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
           <h3 className="text-xl font-black mb-4 tracking-tight relative z-10">Workshop Efficiency</h3>
           <p className="text-slate-400 text-sm mb-8 leading-relaxed italic border-l-4 border-primary pl-4 relative z-10 font-medium">
             Maintaining over 90% completion rate boosts your workshop to the top of customer search results.
           </p>
           <div className="w-full bg-slate-800 rounded-full h-3 mb-3 relative z-10">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '82%' }} 
                className="bg-primary h-3 rounded-full shadow-lg shadow-primary/40" 
              />
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 relative z-10">
              <span>Performance: Optimized</span>
              <span>82% Consistency</span>
           </div>
        </Card>

        <Card className="p-8 border-none bg-emerald-600 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
           <div className="flex justify-between items-start relative z-10">
             <div>
                <h3 className="text-xl font-black mb-1 tracking-tight">Customer Satisfaction</h3>
                <p className="text-emerald-100/80 text-xs font-bold uppercase tracking-widest">Global Workshop Rating</p>
             </div>
             <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Star size={24} className="text-amber-300" fill="currentColor" />
             </div>
           </div>
           <div className="mt-12 flex items-end gap-3 relative z-10">
              <span className="text-5xl font-black italic tracking-tighter leading-none">4.9</span>
              <div className="flex flex-col mb-1">
                 <div className="flex gap-0.5 text-amber-300">
                    {[1,2,3,4,5].map(n => <Star key={n} size={12} fill="currentColor" />)}
                 </div>
                 <span className="text-emerald-100 font-black text-[10px] uppercase tracking-widest mt-1">Based on 150+ Reviews</span>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
