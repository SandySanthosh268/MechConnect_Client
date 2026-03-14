import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../../services/userService';
import { Card, Loader } from '../../components/ui';
import { 
  Users, 
  Wrench, 
  ClipboardList, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminOverview() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(r => setStats(r.data.data || {}))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { icon: <Users />, label: 'Total Customers', value: stats.totalCustomers || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: <Wrench />, label: 'Verified Workshops', value: stats.totalMechanics || 0, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: <ClipboardList />, label: 'Active Bookings', value: stats.totalBookings || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: <Car />, label: 'Platform Vehicles', value: stats.totalVehicles || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Analytics 📊</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Consolidated view of platform growth and operational metrics.</p>
        </div>
        <div className="p-1 px-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Platform Heartbeat</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 border-none shadow-xl shadow-slate-200/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                {React.cloneElement(s.icon, { size: 64 })}
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 28, strokeWidth: 2.5 })}
              </div>
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{s.value}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-2">
                {s.label} <ArrowUpRight size={14} className="text-emerald-600" />
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3 relative z-10">
              <Activity size={20} className="text-primary" /> Platform Health
            </h3>
            <div className="space-y-5 relative z-10">
               {[
                 { label: 'Mechanic Onboarding', status: 'Optimal', perc: 94, color: 'bg-emerald-500' },
                 { label: 'Booking Success Rate', status: 'Stable', perc: 88, color: 'bg-blue-500' },
                 { label: 'API Uptime (30d)', status: 'Excellent', perc: 99, color: 'bg-primary' },
               ].map((item, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-sm font-black tracking-tight">{item.label}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{item.status}</p>
                       </div>
                       <span className="text-lg font-black italic">{item.perc}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${item.perc}%` }} 
                        className={`h-full ${item.color} shadow-lg shadow-white/5`} 
                       />
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="p-8 border-none shadow-xl bg-white">
            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
              <TrendingUp size={20} className="text-primary" /> Recent Alerts
            </h3>
            <div className="space-y-6">
               {[
                 { msg: 'New mechanic registration: Apex Motors', time: '10m ago', type: 'NEW', icon: <Wrench size={16} /> },
                 { msg: 'System reached 500+ active users', time: '1h ago', type: 'MILESTONE', icon: <TrendingUp size={16} /> },
                 { msg: 'Daily backup sequence completed', time: '4h ago', type: 'SYS', icon: <CheckCircle2 size={16} /> },
               ].map((alert, i) => (
                 <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300">
                       {alert.icon}
                    </div>
                    <div className="flex-1 border-b border-slate-50 pb-4">
                       <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-slate-900 transition-colors">{alert.msg}</p>
                          <span className="text-[10px] font-black text-primary uppercase ml-4">{alert.type}</span>
                       </div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{alert.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="pt-4 text-center">
               <button className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.3em]">View Audit Logs</button>
            </div>
         </Card>
      </div>
    </div>
  );
}
