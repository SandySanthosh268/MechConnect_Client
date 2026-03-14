import React, { useState, useEffect } from 'react';
import { getMyVehicles, addVehicle, deleteVehicle } from '../../services/mechanicService';
import { Button, Card, Notification } from '../../components/ui';
import { Car, Bike, Plus, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: 'CAR', brand: '', model: '', registrationNumber: '' });
  const [notif, setNotif] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => getMyVehicles().then(r => setVehicles(r.data.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addVehicle(form);
      setNotif({ message: 'Vehicle added successfully!', type: 'success' });
      setShowAdd(false);
      setForm({ type: 'CAR', brand: '', model: '', registrationNumber: '' });
      load();
    } catch {
      setNotif({ message: 'Failed to add vehicle', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to remove this vehicle?')) return;
    try {
      await deleteVehicle(id);
      setNotif({ message: 'Vehicle removed from your list', type: 'success' });
      load();
    } catch {
      setNotif({ message: 'Error removing vehicle', type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-center md:text-left">Vehicle Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold text-center md:text-left">Register and manage your fleet for instant bookings.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} leftIcon={<Plus size={20} />} className="w-full md:w-auto h-12 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-xs">
          Add New Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
          <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Car size={48} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Start Your Fleet</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">Add your car or bike details once and reuse them for all your future bookings.</p>
          <Button variant="outline" onClick={() => setShowAdd(true)} className="font-bold">Register My First Vehicle</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 relative group overflow-hidden border-slate-200/60 bg-white hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(v.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl border ${v.type === 'CAR' ? 'bg-blue-50 border-blue-100 text-blue-500 shadow-blue-900/5' : 'bg-orange-50 border-orange-100 text-orange-500 shadow-orange-900/5'}`}>
                  {v.type === 'CAR' ? <Car size={28} /> : <Bike size={28} />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{v.brand} {v.model}</h3>
                  <p className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] mt-2 italic shadow-sm">
                    {v.registrationNumber}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Eligibility: Active</span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                    <ChevronRight size={18} />
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-[32px] p-8 md:p-12 w-full max-w-lg shadow-2xl relative z-10" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Register Vehicle</h2>
                <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 ml-1">Type of Vehicle</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['CAR', 'BIKE'].map(t => (
                      <button 
                        key={t} type="button" onClick={() => setForm({...form, type: t})}
                        className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-black tracking-[0.1em] transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-slate-100 dark:border-slate-800 text-slate-400 opacity-60'}`}
                      >
                        {t === 'CAR' ? <Car size={18} /> : <Bike size={18} />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 ml-1">Brand</label>
                    <input className="input-field h-12 font-bold" placeholder="e.g. Toyota" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 ml-1">Model</label>
                    <input className="input-field h-12 font-bold" placeholder="e.g. Supra" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 ml-1">Registration #</label>
                  <input className="input-field h-12 uppercase font-black tracking-[0.2em] italic" placeholder="KA-01-BK-1234" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} required />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="outline" type="button" className="flex-1 font-bold h-14 rounded-2xl" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 font-black h-14 rounded-2xl shadow-xl shadow-primary/30" loading={loading}>Save Vehicle</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
