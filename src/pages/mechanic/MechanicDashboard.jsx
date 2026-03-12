import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getMyServices, addService, deleteService, 
  getMechanicBookings, updateBookingStatus, 
  updateMechanicProfile 
} from '../../services/api';
import Toast from '../../components/Toast';
import { Button, Card } from '../../components/ui';
import BookingTimeline from '../../components/BookingTimeline';
import { 
  Wrench, 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Plus, 
  User, 
  Phone, 
  MapPin, 
  ChevronRight, 
  X, 
  AlertCircle,
  TrendingUp,
  Settings,
  Star,
  Truck,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Dashboard Home ──
function DashboardHome() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => { 
    getMechanicBookings().then(r => setBookings(r.data.data || [])).catch(() => {}); 
  }, []);

  const stats = [
    { icon: <ClipboardList />, label: 'Total Jobs', value: bookings.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: <AlertCircle />, label: 'New Requests', value: bookings.filter(b => b.status === 'REQUESTED').length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: <TrendingUp />, label: 'Active Jobs', value: bookings.filter(b => ['ACCEPTED', 'PICKUP_STARTED', 'SERVICE_IN_PROGRESS'].includes(b.status)).length, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { icon: <CheckCircle2 />, label: 'Done Today', value: bookings.filter(b => ['COMPLETED','PAYMENT_COMPLETED'].includes(b.status)).length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Workshop Center 🔧</h1>
        <p className="text-slate-500 font-medium">Monitoring your workshop activity and performance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 24, strokeWidth: 2.5 })}
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">{s.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 border-none bg-slate-900 text-white shadow-2xl">
           <h3 className="text-xl font-bold mb-4">Workshop Efficiency</h3>
           <p className="text-slate-400 text-sm mb-6 leading-relaxed italic border-l-2 border-primary pl-4">
             Maintaining a high completion rate increases your visibility to premium customers.
           </p>
           <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Performance: Good</span>
              <span>75%</span>
           </div>
        </Card>

        <Card className="p-8 border-none bg-emerald-600 text-white shadow-2xl">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-xl font-bold mb-1">Top Rated Service</h3>
                <p className="text-emerald-100 text-xs font-medium">Your customers love your speed!</p>
             </div>
             <Star size={32} className="text-amber-300" fill="currentColor" />
           </div>
           <div className="mt-8 flex items-end gap-2">
              <span className="text-4xl font-black italic">4.9</span>
              <span className="text-emerald-100 font-bold text-sm mb-1 uppercase tracking-widest">Average Stars</span>
           </div>
        </Card>
      </div>
    </div>
  );
}

// ── My Services ──
function MyServices() {
  const [services, setServices] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => getMyServices().then(r => setServices(r.data.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addService({ ...form, price: parseFloat(form.price) });
      setToast({ message: 'Service added to your list', type: 'success' });
      setShowAdd(false);
      setForm({ name: '', price: '', description: '' });
      load();
    } catch { setToast({ message: 'Error adding service', type: 'error' }); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this service permanently?')) return;
    await deleteService(id);
    setToast({ message: 'Service removed', type: 'success' });
    load();
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Services</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Control what you offer to your customers.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} leftIcon={<Plus size={20} />} className="shadow-lg h-12">
          Add New Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Wrench size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No active services</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">Click the button above to add car or bike services you provide.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 relative group border-slate-200">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <X size={18} />
                  </button>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                  <Wrench size={20} />
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-2 tracking-tight">{s.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">{s.description || 'Professional automotive service.'}</p>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{s.price}</span>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-widest border border-slate-100">Live</span>
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Post New Service</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <div>
                  <label className="input-label">Service Name</label>
                  <input className="input-field" placeholder="e.g. Engine Tuning" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="input-label">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input className="input-field pl-8" type="number" placeholder="0.00" value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="input-label">Short Description</label>
                  <textarea className="input-field font-medium italic" rows={3} placeholder="Describe the quality of work..."
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" type="button" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 h-12" loading={loading}>Add Service</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Bookings ──
function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const load = () => getMechanicBookings().then(r => setBookings(r.data.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const nextStatus = {
    REQUESTED: ['ACCEPTED', 'REJECTED'],
    ACCEPTED: ['PICKUP_STARTED', 'SERVICE_IN_PROGRESS'],
    PICKUP_STARTED: ['SERVICE_IN_PROGRESS'],
    SERVICE_IN_PROGRESS: ['COMPLETED'],
  };

  const handleStatus = async (id, status) => {
    setLoadingId(id + '-' + status);
    try {
      await updateBookingStatus(id, status);
      setToast({ message: `Success: Booking moved to ${status}`, type: 'success' });
      load();
    } catch { setToast({ message: 'Error updating status', type: 'error' }); }
    finally { setLoadingId(null); }
  };

  const getStatusColor = (status) => {
    const map = {
      REQUESTED: 'bg-amber-100 text-amber-700 border-amber-200',
      ACCEPTED: 'bg-blue-100 text-blue-700 border-blue-200',
      COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      PAYMENT_COMPLETED: 'bg-emerald-600 text-white border-transparent',
    };
    return map[status] || 'bg-slate-100 text-slate-500 border-slate-200';
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Bookings</h1>
        <p className="text-slate-500 font-medium">Coordinate with customers and update job progress.</p>
      </div>

      {bookings.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2">
           <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No incoming requests</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-0 overflow-hidden shadow-lg border-slate-200 group">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1 flex flex-col items-stretch gap-6">
                     <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300">
                           <ClipboardList size={24} />
                        </div>
                        <div className="text-center md:text-left flex-1">
                           <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">Job Order #{b.id}</h3>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(b.status)}`}>
                                {b.status.replace(/_/g, ' ')}
                              </span>
                           </div>
                           <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><Clock size={14} /> {b.bookingDate}</span>
                              {b.pickupRequired && <span className="flex items-center gap-1.5 text-indigo-500"><Truck size={14} /> Pickup Required</span>}
                           </div>
                        </div>
                     </div>
                     
                     <div className="px-2">
                        <BookingTimeline currentStatus={b.status} />
                     </div>
                  </div>
                  
                  <div className="p-6 md:w-80 shrink-0 bg-slate-50/50 flex items-center justify-center gap-2">
                    {nextStatus[b.status] ? (
                       <div className="flex gap-2 w-full">
                          {nextStatus[b.status].map(ns => (
                            <Button 
                              key={ns} 
                              size="sm"
                              variant={ns === 'REJECTED' ? 'outline' : 'primary'}
                              onClick={() => handleStatus(b.id, ns)}
                              loading={loadingId === b.id + '-' + ns}
                              className={`flex-1 min-w-[100px] h-11 text-[10px] font-black uppercase tracking-widest ${ns === 'REJECTED' ? 'text-rose-500 border-rose-200 hover:bg-rose-50' : ''}`}
                            >
                              {ns.replace(/_/g, ' ')}
                            </Button>
                          ))}
                       </div>
                    ) : (
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                          <CheckCircle2 size={16} className="text-emerald-500" /> All Managed
                       </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile ──
function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    workshopName: user?.workshopName || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMechanicProfile(form);
      setToast({ message: 'Workshop profile updated!', type: 'success' });
    } catch { setToast({ message: 'Update failed', type: 'error' }); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workshop Profile</h1>
        <p className="text-slate-500 font-medium">Keep your professional details updated for customers.</p>
      </div>

      <div className="max-w-2xl">
         <Card className="p-8 md:p-12 shadow-2xl border-none">
            <div className="w-20 h-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mx-auto mb-8 text-3xl font-black border border-primary/10">
               {form.workshopName?.charAt(0)}
            </div>
            <form onSubmit={handleSave} className="space-y-6">
               <div>
                  <label className="input-label">Workshop Registered Name</label>
                  <div className="relative group">
                     <Wrench size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input className="input-field pl-11" value={form.workshopName} onChange={(e) => setForm({ ...form, workshopName: e.target.value })} required />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="input-label">Business Phone</label>
                     <div className="relative group">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input className="input-field pl-11" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                     </div>
                  </div>
                  <div>
                     <label className="input-label">Operating Location</label>
                     <div className="relative group">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input className="input-field pl-11" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
                     </div>
                  </div>
               </div>
               <Button type="submit" loading={loading} className="w-full h-14 text-lg uppercase tracking-widest font-black shadow-primary/30 mt-4 shadow-2xl">
                  Save Changes
               </Button>
            </form>
         </Card>
      </div>
    </div>
  );
}

// ── Master Component ──
export default function MechanicDashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="services" element={<MyServices />} />
      <Route path="bookings" element={<ManageBookings />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}
