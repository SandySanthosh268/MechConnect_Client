import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateCustomerProfile } from '../../services/userService';
import { Button, Card, Notification } from '../../components/ui';
import { User, Mail, Phone, MapPin, Camera, ShieldCheck } from 'lucide-react';

export default function CustomerProfile() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCustomerProfile(form);
      const updatedUser = { ...user, ...form };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setNotif({ message: 'Profile updated successfully!', type: 'success' });
    } catch {
      setNotif({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Your Profile</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 text-center flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] bg-slate-50 border-4 border-white shadow-2xl flex items-center justify-center text-primary text-4xl font-black italic">
                {user?.name?.charAt(0) || 'C'}
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-6 tracking-tight">{user?.name}</h2>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mt-2">
              <ShieldCheck size={14} /> Verified Account
            </p>
            
            <div className="w-full mt-10 pt-8 border-t border-slate-100 flex flex-col gap-4 text-left">
               <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-sm font-bold truncate">{user?.email}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-sm font-bold">{user?.phone || 'Not provided'}</span>
               </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-8 md:p-10 border-none shadow-2xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input className="input-field h-14 pl-12 font-bold" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input className="input-field h-14 pl-12 font-bold" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Default Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <textarea className="input-field pl-12 py-4 font-bold" rows="3" placeholder="Enter your full home or office address..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button 
                  type="submit" 
                  className="h-14 px-10 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/30" 
                  loading={loading}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
