import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getMyVehicles, addVehicle, deleteVehicle, 
  getApprovedMechanics, getMechanicServices, 
  createBooking, getCustomerBookings, 
  processPayment, submitRating, submitFeedback 
} from '../../services/api';
import Toast from '../../components/Toast';
import { Button, Card } from '../../components/ui';
import BookingTimeline from '../../components/BookingTimeline';
import { 
  Car, 
  Bike,
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  CreditCard, 
  Star, 
  X, 
  ChevronRight,
  Truck,
  Wrench,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Dashboard Home ──
function DashboardHome() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerBookings().then(r => setBookings(r.data.data || [])).catch(() => {});
    getMyVehicles().then(r => setVehicles(r.data.data || [])).catch(() => {});
  }, []);

  const stats = [
    { icon: <Car />, label: 'Vehicles', value: vehicles.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: <ClipboardList />, label: 'Total Bookings', value: bookings.length, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: <Clock />, label: 'Active', value: bookings.filter(b => !['COMPLETED','PAYMENT_COMPLETED','CANCELLED','REJECTED'].includes(b.status)).length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: <CheckCircle2 />, label: 'Completed', value: bookings.filter(b => b.status === 'PAYMENT_COMPLETED' || b.status === 'COMPLETED').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, {user?.name || 'Customer'}! 👋</h1>
        <p className="text-slate-500 mt-1 font-medium">Here's what's happening with your vehicles today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="flex flex-col md:flex-row items-center md:items-start gap-4 p-5 md:p-6 text-center md:text-left">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 24, strokeWidth: 2.5 })}
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">{s.value}</p>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Bookings</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/customer/bookings')}>View All</Button>
           </div>
           {bookings.length === 0 ? (
             <Card className="p-12 text-center border-dashed">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ClipboardList size={32} />
                </div>
                <p className="text-slate-500 font-medium italic">No recent bookings to show.</p>
             </Card>
           ) : (
             <div className="space-y-4">
                {bookings.slice(0, 3).map(b => (
                   <Card key={b.id} className="p-4 flex items-center justify-between card-interactive" onClick={() => navigate('/customer/bookings')}>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <Wrench size={18} />
                         </div>
                         <div>
                            <p className="font-bold text-slate-900 dark:text-white">Booking #{b.id}</p>
                            <p className="text-xs text-slate-500 font-medium">{b.bookingDate}</p>
                         </div>
                      </div>
                      <span className={`badge ${b.status === 'COMPLETED' ? 'badge-success' : 'badge-info'}`}>
                        {b.status.replace(/_/g, ' ')}
                      </span>
                   </Card>
                ))}
             </div>
           )}
        </div>

        <Card className="h-fit bg-primary text-white border-none shadow-2xl shadow-primary/30 p-8 space-y-6">
           <h3 className="text-2xl font-black leading-tight">Need a professional fix?</h3>
           <p className="text-primary-light text-sm font-medium leading-relaxed italic opacity-90">
             Find the best verified mechanics in your area and book a service with just a few taps.
           </p>
           <Button variant="secondary" className="w-full h-14 bg-white text-primary hover:bg-slate-50 border-none text-lg font-black" onClick={() => navigate('/customer/mechanics')}>
             Find a Mechanic
           </Button>
        </Card>
      </div>
    </div>
  );
}

// ── Vehicles ──
function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: 'CAR', brand: '', model: '', registrationNumber: '' });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => getMyVehicles().then(r => setVehicles(r.data.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addVehicle(form);
      setToast({ message: 'Vehicle added successfully!', type: 'success' });
      setShowAdd(false);
      setForm({ type: 'CAR', brand: '', model: '', registrationNumber: '' });
      load();
    } catch (err) {
      setToast({ message: 'Failed to add vehicle', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Remove this vehicle?')) return;
    await deleteVehicle(id);
    setToast({ message: 'Vehicle removed', type: 'success' });
    load();
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-center md:text-left">My Vehicles</h1>
          <p className="text-slate-500 mt-1 font-medium text-center md:text-left text-sm md:text-base">Keep track of your fleet for faster bookings.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} leftIcon={<Plus size={20} />} className="w-full md:w-auto h-12 shadow-primary/20">
          Add New Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <Card className="p-20 text-center border-dashed">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Car size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No vehicles yet</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">Add your car or bike to start booking services with local mechanics.</p>
          <Button variant="outline" onClick={() => setShowAdd(true)}>Register Your First Vehicle</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 relative group overflow-hidden border-slate-200">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(v.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl border ${v.type === 'CAR' ? 'bg-blue-50 border-blue-100 text-blue-500' : 'bg-orange-50 border-orange-100 text-orange-500'}`}>
                  {v.type === 'CAR' ? <Car size={24} /> : <Bike size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.brand} {v.model}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 italic">{v.registrationNumber}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.type} SERVICE READY</span>
                   <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="modal-overlay" onClick={() => setShowAdd(false)}>
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Add Vehicle</h2>
                <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-6">
                <div>
                  <label className="input-label">Vehicle Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['CAR', 'BIKE'].map(t => (
                      <button key={t} type="button" onClick={() => setForm({...form, type: t})}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Brand</label>
                    <input className="input-field" placeholder="Toyota" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
                  </div>
                  <div>
                    <label className="input-label">Model</label>
                    <input className="input-field" placeholder="Camry" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="input-label">Registration Number</label>
                  <input className="input-field uppercase font-bold tracking-widest" placeholder="KA-01-AB-1234" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} required />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" type="button" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1" loading={loading}>Save Vehicle</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Find Mechanics ──
function FindMechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookingForm, setBookingForm] = useState({ serviceId: '', vehicleId: '', bookingDate: '', pickupRequired: false });
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState('ALL');

  useEffect(() => {
    getApprovedMechanics().then(r => setMechanics(r.data.data || [])).catch(() => {});
    getMyVehicles().then(r => setVehicles(r.data.data || [])).catch(() => {});
  }, []);

  const filtered = mechanics.filter(m => {
    const matchesSearch = !search || m.workshopName?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const selectMechanic = async (mech) => {
    setSelectedMechanic(mech);
    try {
      const res = await getMechanicServices(mech.id);
      setServices(res.data.data || []);
    } catch { setServices([]); }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await createBooking({
        mechanicId: selectedMechanic.id,
        vehicleId: parseInt(bookingForm.vehicleId),
        serviceId: parseInt(bookingForm.serviceId),
        bookingDate: bookingForm.bookingDate,
        pickupRequired: bookingForm.pickupRequired,
      });
      setToast({ message: 'Booking created successfully!', type: 'success' });
      setSelectedMechanic(null);
      setBookingForm({ serviceId: '', vehicleId: '', bookingDate: '', pickupRequired: false });
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Booking failed', type: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Mechanic Discovery</h1>
          <p className="text-slate-500 mt-1 font-medium">Find verified professionals for your car or bike.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            className="input-field pl-12 h-12 shadow-sm" 
            placeholder="Search workshops by name..."
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-20 text-center bg-slate-50/50 dark:bg-slate-900/20 border-dashed">
          <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No mechanics found in your area</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-transparent bg-white shadow-xl shadow-slate-200/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary text-2xl font-black border border-slate-100">
                    {m.workshopName?.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Verified
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{m.workshopName || 'Professional Workshop'}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500 text-sm italic">
                      <MapPin size={14} className="shrink-0" />
                      <span className="truncate">{m.address || 'Location Hidden'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <Phone size={14} className="shrink-0" />
                      <span>{m.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 w-full h-12 rounded-xl text-sm font-black uppercase tracking-widest" onClick={() => selectMechanic(m)}>
                  View Services & Book
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedMechanic && (
          <div className="modal-overlay" onClick={() => setSelectedMechanic(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content max-w-[600px]" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Book Service</h2>
                   <p className="text-sm font-bold text-primary uppercase tracking-widest mt-0.5">{selectedMechanic.workshopName}</p>
                </div>
                <button onClick={() => setSelectedMechanic(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
              </div>

              {services.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 rounded-2xl border-dashed border-2 border-slate-200">
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No services listed yet</p>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">Select Service</label>
                      <select className="select-field h-12" value={bookingForm.serviceId}
                        onChange={(e) => setBookingForm({ ...bookingForm, serviceId: e.target.value })} required>
                        <option value="">Choose service...</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.name} — ₹{s.price}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="input-label">Select Vehicle</label>
                      <select className="select-field h-12" value={bookingForm.vehicleId}
                        onChange={(e) => setBookingForm({ ...bookingForm, vehicleId: e.target.value })} required>
                        <option value="">Choose vehicle...</option>
                        {vehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.model}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="input-label">Preferred Date</label>
                    <input type="date" className="input-field h-12" value={bookingForm.bookingDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, bookingDate: e.target.value })} required />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setBookingForm({...bookingForm, pickupRequired: !bookingForm.pickupRequired})}>
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${bookingForm.pickupRequired ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-400'}`}>
                          <Truck size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-700">Add Pickup Service</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Doorstep vehicle transport</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${bookingForm.pickupRequired ? 'bg-primary border-primary' : 'border-slate-300'}`}>
                       {bookingForm.pickupRequired && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" type="button" className="flex-1" onClick={() => setSelectedMechanic(null)}>Cancel</Button>
                    <Button type="submit" className="flex-1 h-12 text-lg uppercase tracking-widest font-black">Confirm Booking</Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── My Bookings ──
function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);
  const [payModal, setPayModal] = useState(null);
  const [rateModal, setRateModal] = useState(null);
  const [payForm, setPayForm] = useState({ amount: '', method: 'UPI' });
  const [rateForm, setRateForm] = useState({ ratingValue: 5, comments: '' });
  const [loading, setLoading] = useState(false);

  const load = () => getCustomerBookings().then(r => setBookings(r.data.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const getStatusStyle = (status) => {
    const map = {
      REQUESTED: 'bg-amber-100 text-amber-600 border-amber-200',
      ACCEPTED: 'bg-blue-100 text-blue-600 border-blue-200',
      PICKUP_STARTED: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      SERVICE_IN_PROGRESS: 'bg-purple-100 text-purple-600 border-purple-200',
      COMPLETED: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      PAYMENT_PENDING: 'bg-rose-100 text-rose-600 border-rose-200',
      PAYMENT_COMPLETED: 'bg-emerald-600 text-white border-transparent',
      REJECTED: 'bg-slate-200 text-slate-600 border-slate-300',
      CANCELLED: 'bg-slate-200 text-slate-600 border-slate-300',
    };
    return map[status] || 'bg-slate-100 text-slate-500';
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await processPayment({ bookingId: payModal.id, amount: parseFloat(payForm.amount), method: payForm.method });
      setToast({ message: 'Payment successful! Service closed.', type: 'success' });
      setPayModal(null);
      load();
    } catch (err) {
      setToast({ message: 'Payment failed to process', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRating({ bookingId: rateModal.id, ratingValue: rateForm.ratingValue });
      if (rateForm.comments) {
        await submitFeedback({ bookingId: rateModal.id, comments: rateForm.comments });
      }
      setToast({ message: 'Honest feedback received. Thank you!', type: 'success' });
      setRateModal(null);
    } catch (err) {
      setToast({ message: 'Failed to submit review', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking History</h1>
        <p className="text-slate-500 mt-1 font-medium">Manage and track your service requests.</p>
      </div>

      {bookings.length === 0 ? (
        <Card className="p-20 text-center bg-slate-50/50 border-dashed border-2">
           <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-6 text-slate-300">
              <ClipboardList size={32} />
           </div>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No bookings in record</p>
           <Button variant="ghost" className="mt-4 text-primary font-bold">Find a Mechanic</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-0 border-slate-200 overflow-hidden group">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x dark:divide-slate-800">
                  <div className="p-6 flex-1 flex flex-col items-stretch gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <Wrench size={24} />
                      </div>
                      <div className="text-center md:text-left flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                          <h3 className="text-lg font-black text-slate-900 tracking-tight">Booking #{b.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(b.status)}`}>
                            {b.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> {b.bookingDate}</span>
                          {b.pickupRequired && <span className="flex items-center gap-1.5 text-indigo-500"><Truck size={14} /> Pickup Service</span>}
                          {b.amount > 0 && <span className="flex items-center gap-1.5 text-slate-900 font-black">₹{b.amount}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-2">
                      <BookingTimeline currentStatus={b.status} />
                    </div>
                  </div>
                  
                  <div className="p-6 shrink-0 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-center">
                    {(b.status === 'COMPLETED' || b.status === 'PAYMENT_PENDING') && (
                      <Button onClick={() => { setPayModal(b); setPayForm({ amount: b.amount || '', method: 'UPI' }); }} 
                        className="h-12 px-8 font-black uppercase tracking-widest text-sm shadow-xl" leftIcon={<CreditCard size={18} />}>
                        Pay Now
                      </Button>
                    )}
                    {b.status === 'PAYMENT_COMPLETED' && (
                      <Button onClick={() => { setRateModal(b); setRateForm({ ratingValue: 5, comments: '' }); }} 
                        variant="secondary" className="h-12 px-8 font-black uppercase tracking-widest text-sm bg-white" leftIcon={<Star size={18} />}>
                        Rate Service
                      </Button>
                    )}
                    {!['COMPLETED','PAYMENT_PENDING','PAYMENT_COMPLETED'].includes(b.status) && (
                       <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Tracking Live
                       </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pay Modal */}
      <AnimatePresence>
        {payModal && (
          <div className="modal-overlay" onClick={() => setPayModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Complete Payment</h2>
              <form onSubmit={handlePay} className="space-y-6">
                <div>
                  <label className="input-label">Payable Amount (₹)</label>
                  <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-primary text-xl">₹</span>
                     <input className="input-field pl-10 h-14 text-2xl font-black text-slate-900" type="number" 
                       value={payForm.amount} onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="input-label">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['UPI','CARD','NET_BANKING','CASH'].map(m => (
                      <button key={m} type="button" onClick={() => setPayForm({...payForm, method: m})}
                        className={`py-4 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${payForm.method === m ? 'border-primary bg-primary text-white shadow-lg' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}>
                        {m.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" type="button" onClick={() => setPayModal(null)}>Cancel</Button>
                  <Button type="submit" className="flex-1 h-12 shadow-primary/30" loading={loading}>Pay Now</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rate Modal */}
      <AnimatePresence>
        {rateModal && (
          <div className="modal-overlay" onClick={() => setRateModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Rate Your Experience</h2>
              <form onSubmit={handleRate} className="space-y-8">
                <div>
                  <label className="input-label text-center mb-6">How was the service?</label>
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button" onClick={() => setRateForm({ ...rateForm, ratingValue: n })}
                        className={`text-4xl transition-all duration-300 hover:scale-125 ${rateForm.ratingValue >= n ? 'grayscale-0' : 'grayscale brightness-150 opacity-40 hover:opacity-100'}`}>
                        {n <= 2 ? '☹️' : n <= 3 ? '😐' : n <= 4 ? '🙂' : '🤩'}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex gap-1 text-amber-400">
                      {[1,2,3,4,5].map(n => <Star key={n} fill={rateForm.ratingValue >= n ? 'currentColor' : 'none'} size={20} />)}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="input-label">Any specific comments?</label>
                  <textarea className="input-field font-medium italic" rows={3} placeholder="Tell us what you liked..."
                    value={rateForm.comments} onChange={(e) => setRateForm({ ...rateForm, comments: e.target.value })} />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" type="button" onClick={() => setRateModal(null)}>Later</Button>
                  <Button type="submit" className="flex-1 h-12 font-black" loading={loading}>Submit Review</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Master Component ──
export default function CustomerDashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="mechanics" element={<FindMechanics />} />
      <Route path="bookings" element={<MyBookings />} />
    </Routes>
  );
}
