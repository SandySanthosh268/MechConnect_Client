import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  getAdminStats, getPendingMechanics, approveMechanic, rejectMechanic,
  getAllCustomers, getAllMechanics
} from '../../services/api';
import Toast from '../../components/Toast';
import { Button, Card } from '../../components/ui';
import { 
  Users, 
  Wrench, 
  ClipboardList, 
  Car, 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Search,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Dashboard Home ──
function DashboardHome() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getAdminStats().then(r => setStats(r.data.data || {})).catch(() => {});
  }, []);

  const cards = [
    { icon: <Users />, label: 'Total Customers', value: stats.totalCustomers || 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: <Wrench />, label: 'Verified Mechanics', value: stats.totalMechanics || 0, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: <ClipboardList />, label: 'Active Bookings', value: stats.totalBookings || 0, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: <Car />, label: 'Registered Vehicles', value: stats.totalVehicles || 0, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview 📊</h1>
        <p className="text-slate-500 mt-1 font-medium">Monitoring platform-wide performance and user metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
        {cards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 border-slate-200 shadow-xl shadow-slate-200/40">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 28, strokeWidth: 2.5 })}
              </div>
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{s.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3 flex items-center justify-center md:justify-start gap-1">
                {s.label} <ArrowUpRight size={12} className="text-emerald-500" />
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Platform Security</h3>
            <div className="space-y-4">
               {[
                 { label: 'Mechanic Verification', status: 'Optimal', icon: <ShieldCheck className="text-emerald-400" /> },
                 { label: 'Payment Encryption', status: 'Active', icon: <CheckCircle2 className="text-emerald-400" /> },
                 { label: 'API Rate Limiting', status: 'Healthy', icon: <CheckCircle2 className="text-emerald-400" /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                       {item.icon}
                       <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.status}</span>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="p-8 border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Recent Activity Log</h3>
            <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse" />
                    <div>
                       <p className="text-sm font-bold text-slate-800 leading-tight">New mechanic registration request</p>
                       <p className="text-xs text-slate-500 mt-1">10 minutes ago</p>
                    </div>
                 </div>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
}

// ── Manage Mechanics ──
function ManageMechanics() {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [toast, setToast] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const load = () => {
    getPendingMechanics().then(r => setPending(r.data.data || [])).catch(() => {});
    getAllMechanics().then(r => setAll(r.data.data || [])).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    setLoadingId(id + '-approve');
    try {
      await approveMechanic(id);
      setToast({ message: 'Workshop access granted!', type: 'success' });
      load();
    } catch { setToast({ message: 'Approval failed', type: 'error' }); }
    finally { setLoadingId(null); }
  };

  const handleReject = async (id) => {
    setLoadingId(id + '-reject');
    try {
      await rejectMechanic(id);
      setToast({ message: 'Registration rejected', type: 'error' });
      load();
    } catch { setToast({ message: 'Action failed', type: 'error' }); }
    finally { setLoadingId(null); }
  };

  const getStatusBadge = (status) => {
    if (status === 'APPROVED') return 'badge-success';
    if (status === 'REJECTED') return 'badge-danger';
    return 'badge-warning';
  };

  return (
    <div className="space-y-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mechanic Management</h1>
        <p className="text-slate-500 font-medium">Review and verify workshop registrations.</p>
      </div>

      <AnimatePresence>
        {pending.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <AlertTriangle size={16} /> Attention Required ({pending.length})
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pending.map(m => (
                <Card key={m.id} className="p-6 border-amber-100 bg-amber-50/10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5 text-center md:text-left">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-amber-500 text-xl font-black shadow-sm">
                        {m.workshopName?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{m.workshopName || 'Unnamed Workshop'}</h3>
                        <p className="text-xs font-bold text-slate-500 flex flex-wrap justify-center md:justify-start gap-3 mt-1 underline decoration-primary/20">
                          <span className="flex items-center gap-1"><Phone size={12} /> {m.phone}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {m.address}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <Button className="flex-1 md:flex-none uppercase text-[10px] font-black tracking-widest" variant="secondary"
                        onClick={() => handleApprove(m.id)} loading={loadingId === m.id + '-approve'}>
                        Approve
                      </Button>
                      <Button className="flex-1 md:flex-none uppercase text-[10px] font-black tracking-widest text-rose-500 border-rose-200" variant="outline"
                        onClick={() => handleReject(m.id)} loading={loadingId === m.id + '-reject'}>
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">All Mechanics Database</h2>
        <Card className="p-0 border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="rounded-tl-2xl bg-slate-50">Workshop</th>
                  <th className="bg-slate-50">Identity Verified</th>
                  <th className="bg-slate-50">Location</th>
                  <th className="rounded-tr-2xl bg-slate-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic">
                {all.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-800 tracking-tight">{m.workshopName || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-slate-500">{m.phone || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-slate-400 text-xs">{m.address || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getStatusBadge(m.status)} font-black`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Customers List ──
function CustomersList() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => { getAllCustomers().then(r => setCustomers(r.data.data || [])).catch(() => {}); }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Directory</h1>
        <p className="text-slate-500 font-medium">Monitoring platform user engagement.</p>
      </div>

      <Card className="p-0 border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="rounded-tl-2xl bg-slate-50">Full Name</th>
                <th className="bg-slate-50">Contact Info</th>
                <th className="rounded-tr-2xl bg-slate-50">Primary Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                           {c.name?.charAt(0)}
                        </div>
                        <span className="font-black text-slate-800 tracking-tight">{c.name || 'N/A'}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-500 text-sm whitespace-nowrap">{c.phone || 'N/A'}</td>
                  <td className="px-6 py-4 font-bold text-slate-400 text-xs">{c.address || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Master Component ──
export default function AdminDashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="mechanics" element={<ManageMechanics />} />
      <Route path="customers" element={<CustomersList />} />
    </Routes>
  );
}
