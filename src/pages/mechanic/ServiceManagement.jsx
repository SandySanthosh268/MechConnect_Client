import React, { useState, useEffect } from 'react';
import { getMyServices, addService, deleteService } from '../../services/mechanicService';
import { Button, Card, Notification, Loader } from '../../components/ui';
import { Wrench, Plus, X, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notif, setNotif] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  const load = () => {
    setLoading(true);
    getMyServices()
      .then(r => setServices(r.data.data || []))
      .catch(() => setNotif({ message: 'Error loading services', type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addService({ ...form, price: parseFloat(form.price) });
      setNotif({ message: 'Service added successfully!', type: 'success' });
      setShowAdd(false);
      setForm({ name: '', price: '', description: '' });
      load();
    } catch {
      setNotif({ message: 'Failed to add service', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('This service will be removed from your public profile. Continue?')) return;
    try {
      await deleteService(id);
      setNotif({ message: 'Service successfully removed', type: 'success' });
      load();
    } catch {
      setNotif({ message: 'Error removing service', type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Service Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Define your menu of services and competitive pricing.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} leftIcon={<Plus size={20} />} className="h-12 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-xs">
          Add New Service
        </Button>
      </div>

      {loading ? (
        <div className="py-20"><Loader /></div>
      ) : services.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
          <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Wrench size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No active services</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">Add services like Oil Change, Engine Tuning, or Brake Repair to start receiving bookings.</p>
          <Button variant="outline" onClick={() => setShowAdd(true)} className="font-bold">Create First Service</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-8 relative group bg-white dark:bg-slate-900 hover:shadow-2xl transition-all duration-300 border-slate-200/60 dark:border-slate-800 flex flex-col h-full min-h-[300px]">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-8 shadow-sm">
                  <Wrench size={28} />
                </div>
                <div className="flex-1">
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-3 tracking-tight">{s.name}</h3>
                   <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 font-medium italic opacity-80">{s.description || 'Professional, high-quality automotive care service.'}</p>
                </div>
                <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center group-hover:border-primary/20 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 italic">Service Rate</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">₹{s.price}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">
                    <ShieldCheck size={12} /> Active
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdd(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-12 w-full max-w-lg shadow-3xl relative z-10" onClick={e => e.stopPropagation()}>
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Publish Service</h2>
                  <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400"><X size={24} /></button>
               </div>

               <form onSubmit={handleAdd} className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.2em] ml-1">Service Title</label>
                    <input className="input-field h-14 font-bold" placeholder="e.g. Full Body Polish" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.2em] ml-1">Base Price (₹)</label>
                    <div className="relative group">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-900 dark:text-white text-xl italic group-focus-within:text-primary transition-colors">₹</span>
                      <input className="input-field h-14 pl-12 font-black text-xl italic" type="number" placeholder="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.2em] ml-1">Detailed Description</label>
                    <textarea className="input-field py-5 font-semibold italic" rows="4" placeholder="Briefly explain the process and what's included..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-slate-50">
                    <Button variant="ghost" type="button" className="flex-1 font-bold h-16" onClick={() => setShowAdd(false)}>Cancel</Button>
                    <Button type="submit" className="flex-[2] font-black h-16 rounded-2xl shadow-xl shadow-primary/30 text-lg" loading={isSubmitting}>Publish Service</Button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
