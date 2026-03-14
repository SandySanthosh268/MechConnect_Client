import React, { useState, useEffect } from 'react';
import { searchMechanics, getMechanicServices } from '../../services/mechanicService';
import { createBooking } from '../../services/bookingService';
import { getMyVehicles } from '../../services/mechanicService';
import { Button, Card, MechanicCard, Notification, Loader } from '../../components/ui';
import { Search, MapPin, Wrench, X, Calendar, Truck, CreditCard, Car, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchMechanics() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookingForm, setBookingForm] = useState({ 
    vehicleId: '', serviceId: '', bookingDate: '', pickupRequired: false, 
    pickupAddress: '', latitude: 0, longitude: 0 
  });
  const [notif, setNotif] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    handleSearch();
    getMyVehicles().then(r => setVehicles(r.data.data || [])).catch(() => {});
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchMechanics(query);
      setResults(res.data.data || []);
    } catch {
      setNotif({ message: 'Error fetching mechanics', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMechanic = async (m) => {
    setSelectedMechanic(m);
    setLoading(true);
    try {
      const res = await getMechanicServices(m.id);
      setServices(res.data.data || []);
    } catch {
      setNotif({ message: 'Error fetching services', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.vehicleId || !bookingForm.serviceId || !bookingForm.bookingDate) {
      setNotif({ message: 'Please fill all required fields', type: 'warning' });
      return;
    }
    setBookingLoading(true);
    try {
      await createBooking({ ...bookingForm, mechanicId: selectedMechanic.id });
      setNotif({ message: 'Booking requested successfully!', type: 'success' });
      setSelectedMechanic(null);
      setBookingForm({ vehicleId: '', serviceId: '', bookingDate: '', pickupRequired: false, pickupAddress: '', latitude: 0, longitude: 0 });
    } catch {
      setNotif({ message: 'Booking failed. Please try again.', type: 'error' });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight text-center">Find Expert Mechanics</h1>
        <p className="text-slate-600 dark:text-slate-400 text-center font-bold">Search from 500+ verified professionals in your area.</p>
        
        <div className="relative mt-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          </div>
          <input 
            type="text"
            className="w-full h-16 pl-12 pr-32 rounded-3xl border-none bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 focus:ring-2 focus:ring-primary/20 text-lg font-bold transition-all"
            placeholder="Search by workshop name, location or services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-3 top-3 bottom-3 px-8 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-dark transition-all shadow-lg active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20"><Loader /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {results.length > 0 ? (
            results.map((m, i) => (
              <MechanicCard key={m.id} mechanic={m} index={i} onBook={handleSelectMechanic} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 rounded-[40px] bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Search size={40} />
              </div>
              <p className="text-slate-500 font-black uppercase tracking-widest italic">No mechanics found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedMechanic && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMechanic(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="bg-white dark:bg-slate-950 rounded-[40px] p-8 md:p-12 w-full max-w-2xl shadow-3xl relative z-10 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 right-0 p-8 opacity-5 -z-10 text-primary">
                  <Wrench size={200} />
                </div>
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{selectedMechanic.workshopName}</h2>
                    <p className="flex items-center gap-2 text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">
                      <MapPin size={14} /> {selectedMechanic.address}
                    </p>
                  </div>
                  <button onClick={() => setSelectedMechanic(null)} className="p-2 hover:bg-slate-100 rounded-2xl transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handleBooking} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Select Your Vehicle</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {vehicles.map(v => (
                          <button 
                            key={v.id} type="button" onClick={() => setBookingForm({...bookingForm, vehicleId: v.id})}
                            className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all text-slate-900 dark:text-white ${bookingForm.vehicleId === v.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'}`}
                          >
                            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Car size={16} /></div>
                            <span className="font-black text-sm dark:text-white">{v.brand} {v.model}</span>
                          </button>
                        ))}
                        {vehicles.length === 0 && <p className="text-rose-500 text-xs font-bold p-2">Please add a vehicle first.</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Select Service</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {services.map(s => (
                          <button 
                            key={s.id} type="button" onClick={() => setBookingForm({...bookingForm, serviceId: s.id})}
                            className={`w-full p-4 rounded-2xl border-2 text-left flex justify-between items-center transition-all text-slate-900 dark:text-white ${bookingForm.serviceId === s.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'}`}
                          >
                            <span className="font-black text-sm dark:text-white">{s.name}</span>
                            <span className="text-primary font-black">₹{s.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Preferred Date</label>
                      <input type="date" className="input-field h-14 font-black" value={bookingForm.bookingDate} onChange={e => setBookingForm({...bookingForm, bookingDate: e.target.value})} required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="flex flex-col justify-end pb-1">
                       <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${bookingForm.pickupRequired ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'}`}>
                          <div className="flex items-center gap-3">
                            <Truck className={bookingForm.pickupRequired ? 'text-indigo-600' : 'text-slate-400'} />
                            <span className={`text-sm font-black uppercase tracking-widest ${bookingForm.pickupRequired ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>Request Pickup</span>
                          </div>
                          <input type="checkbox" className="hidden" checked={bookingForm.pickupRequired} onChange={e => setBookingForm({...bookingForm, pickupRequired: e.target.checked})} />
                          <div className={`w-6 h-6 rounded-full border-2 border-current flex items-center justify-center ${bookingForm.pickupRequired ? 'text-indigo-600' : 'text-slate-200'}`}>
                            {bookingForm.pickupRequired && <CheckCircle2 size={12} />}
                          </div>
                       </label>
                    </div>
                  </div>

                  {bookingForm.pickupRequired && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                      <label className="block text-xs font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Pickup Address</label>
                      <textarea className="input-field py-4 font-bold" rows="2" placeholder="Full address for vehicle pickup..." value={bookingForm.pickupAddress} onChange={e => setBookingForm({...bookingForm, pickupAddress: e.target.value})} required />
                    </motion.div>
                  )}

                  <div className="flex gap-4 pt-8 border-t border-slate-100">
                    <Button variant="ghost" type="button" className="flex-1 font-bold h-16 rounded-2xl" onClick={() => setSelectedMechanic(null)}>Cancel</Button>
                    <Button type="submit" className="flex-[2] font-black h-16 rounded-2xl shadow-xl shadow-primary/30 text-lg" loading={bookingLoading} leftIcon={<Calendar size={20} />}>Confirm Booking</Button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
