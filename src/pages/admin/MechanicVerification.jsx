import React, { useState, useEffect } from 'react';
import { getPendingMechanics, approveMechanic, rejectMechanic } from '../../services/mechanicService';
import { getAllMechanics } from '../../services/userService';
import { Card, Loader, Button, Notification } from '../../components/ui';
import { Wrench, CheckCircle2, XCircle, ShieldCheck, MapPin, Phone, AlertTriangle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MechanicVerification() {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [notif, setNotif] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([getPendingMechanics(), getAllMechanics()])
      .then(([pRes, aRes]) => {
        setPending(pRes.data.data || []);
        setAll(aRes.data.data || []);
      })
      .catch(() => setNotif({ message: 'Error fetching mechanics', type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id, action) => {
    setActionId(`${id}-${action}`);
    try {
      if (action === 'APPROVE') await approveMechanic(id);
      else await rejectMechanic(id);
      
      setNotif({ 
        message: `Mechanic ${action === 'APPROVE' ? 'verified' : 'rejected'} successfully`, 
        type: action === 'APPROVE' ? 'success' : 'warning' 
      });
      load();
    } catch {
      setNotif({ message: 'Action failed. Please check network logs.', type: 'error' });
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Mechanic Verification</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold italic">Review credentials and certify workshops for premium delivery.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" size="sm" leftIcon={<Filter size={16} />} className="font-bold border-slate-200">Database Filter</Button>
        </div>
      </div>

      <AnimatePresence>
        {pending.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-sm font-black text-amber-600 uppercase tracking-[0.3em] flex items-center gap-3">
              <AlertTriangle size={18} className="animate-pulse" /> Pending Verification ({pending.length})
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {pending.map((m, i) => (
                <Card key={m.id || i} className="p-8 border-none bg-amber-50/20 shadow-xl shadow-amber-900/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900">
                    <Wrench size={120} />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="flex items-center gap-6 text-center md:text-left">
                      <div className="w-16 h-16 rounded-[28px] bg-white border-2 border-amber-100 flex items-center justify-center text-amber-600 text-2xl font-black shadow-lg italic">
                        {m.workshopName?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{m.workshopName || 'Premium Workshop'}</h3>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-2">
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                             <Phone size={14} className="text-amber-500" /> {m.phone || 'N/A'}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                             <MapPin size={14} className="text-amber-500" /> {m.address || 'N/A'}
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <Button 
                        className="flex-1 md:flex-none h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs bg-emerald-600 shadow-xl shadow-emerald-900/10" 
                        leftIcon={<CheckCircle2 size={16} />} 
                        loading={actionId === `${m.id}-APPROVE`}
                        onClick={() => handleAction(m.id, 'APPROVE')}
                      >
                        Verify
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 md:flex-none h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs text-rose-500 hover:bg-rose-50" 
                        leftIcon={<XCircle size={16} />}
                        loading={actionId === `${m.id}-REJECT`}
                        onClick={() => handleAction(m.id, 'REJECT')}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
          <ShieldCheck size={18} className="text-emerald-500" /> Certified Workshops
        </h2>
        {loading ? (
          <div className="py-20"><Loader /></div>
        ) : (
          <Card className="p-0 border-none shadow-2xl bg-white overflow-hidden rounded-[40px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 italic">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Workshop Business</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Credentials</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Operation Area</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {all.map((m, i) => (
                    <tr key={m.id || i} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-primary border border-slate-100 italic group-hover:bg-primary/5 transition-colors">
                               {m.workshopName?.charAt(0) || 'W'}
                            </div>
                            <span className="font-black text-slate-900 tracking-tight leading-none text-lg">{m.workshopName || 'Workshop'}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-600 text-sm italic">{m.phone || 'HIDDEN'}</td>
                      <td className="px-8 py-6 overflow-hidden max-w-[200px]">
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest truncate">{m.address || 'N/A'}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          m.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          m.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                             m.status === 'APPROVED' ? 'bg-emerald-500' : 
                             m.status === 'REJECTED' ? 'bg-rose-500' : 
                             'bg-amber-500'
                          }`} />
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {all.length === 0 && (
               <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-200">
                     <Wrench size={40} />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic tracking-widest">Workshop database is empty.</p>
               </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
