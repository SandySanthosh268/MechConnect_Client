import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateMechanicProfile } from '../../services/userService';
import { Button, Card, Notification } from '../../components/ui';
import { Wrench, Phone, MapPin, Camera, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkshopProfile() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);
  const [form, setForm] = useState({
    workshopName: user?.workshopName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateMechanicProfile(form);
      const updatedUser = { ...user, ...form };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setNotif({ message: 'Workshop profile updated successfully!', type: 'success' });
    } catch {
      setNotif({ message: 'Update failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Workshop Profile</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Represent your business professionally to your customers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 text-center flex flex-col items-center border-none shadow-2xl bg-white dark:bg-slate-900">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] bg-primary/5 border-4 border-white shadow-2xl flex items-center justify-center text-primary text-4xl font-black italic select-none">
                {form.workshopName?.charAt(0) || 'W'}
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="mt-8 space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{form.workshopName}</h2>
              <div className="flex items-center justify-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/5 italic">
                <ShieldCheck size={14} /> Professional ID Verified
              </div>
            </div>

            <div className="w-full mt-10 space-y-4 pt-8 border-t border-slate-100">
               <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0"><Award size={18} /></div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Expertise</p>
                    <p className="text-sm font-bold truncate">Premium Multi-brand Service</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0"><Clock size={18} /></div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Hours</p>
                    <p className="text-sm font-bold truncate">Mon-Sat: 09:00 - 19:00</p>
                  </div>
               </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-8 md:p-12 border-none shadow-2xl bg-white dark:bg-slate-900">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                 <h3 className="text-lg font-black text-slate-900 dark:text-white border-l-4 border-primary pl-4 tracking-tight uppercase tracking-[0.1em]">Business Identity</h3>
                 <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.25em] ml-1">Workshop Trading Name</label>
                    <div className="relative group">
                      <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input className="input-field h-14 pl-12 font-black italic text-lg" placeholder="Shop Name" value={form.workshopName} onChange={e => setForm({...form, workshopName: e.target.value})} required />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.25em] ml-1">Business Contact</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input className="input-field h-14 pl-12 font-bold" placeholder="+91 XXXX XXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.25em] ml-1">Zip / Location Code</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input className="input-field h-14 pl-12 font-bold" placeholder="560001" value={form.address.split(',').pop()?.trim()} onChange={e => {}} disabled />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.25em] ml-1">Complete Physical Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <textarea className="input-field pl-12 py-5 font-bold italic" rows="4" placeholder="Full shop address including landmark..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <Button 
                  type="submit" 
                  className="h-16 px-12 font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/40 rounded-2xl" 
                  loading={loading}
                >
                  Save Workshop Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
