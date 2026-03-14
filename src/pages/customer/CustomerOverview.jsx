import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCustomerBookings } from '../../services/bookingService';
import { getMyVehicles } from '../../services/mechanicService';
import { Card, Button, BookingCard } from '../../components/ui';
import { 
  Car, 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Wrench,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerOverview() {
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
    { icon: <ClipboardList />, label: 'Total Bookings', value: bookings.length, color: 'text-purple-600', bg: 'bg-purple-600/10' },
    { icon: <Clock />, label: 'Active', value: bookings.filter(b => !['COMPLETED','PAYMENT_COMPLETED','CANCELLED','REJECTED'].includes(b.status)).length, color: 'text-amber-600', bg: 'bg-amber-600/10' },
    { icon: <CheckCircle2 />, label: 'Completed', value: bookings.filter(b => b.status === 'PAYMENT_COMPLETED' || b.status === 'COMPLETED').length, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name || 'Customer'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">
            Everything looks good with your vehicles today.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/customer/mechanics')}
          className="shadow-xl"
        >
          Book New Service
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
            <Card className="flex flex-col md:flex-row items-center md:items-start gap-4 p-5 md:p-6 text-center md:text-left border-none shadow-xl shadow-slate-200/50">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                {React.cloneElement(s.icon, { size: 24, strokeWidth: 2.5 })}
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">{s.value}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Recent Activity</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/customer/booking-history')} className="font-bold">View History</Button>
           </div>
           {bookings.length === 0 ? (
             <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50">
                <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <ClipboardList size={32} />
                </div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">No recent activity detected.</p>
             </Card>
           ) : (
             <div className="space-y-4">
                {bookings.slice(0, 3).map((b, i) => (
                   <BookingCard 
                    key={b.id} 
                    booking={b} 
                    index={i} 
                    role="ROLE_CUSTOMER" 
                    onAction={(type) => navigate('/customer/booking-history')}
                   />
                ))}
             </div>
           )}
        </div>

        <Card className="h-fit bg-slate-900 text-white border-none shadow-2xl p-8 space-y-6 relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
           <h3 className="text-2xl font-black leading-tight relative z-10 tracking-tight">Quick Professional Fix?</h3>
           <p className="text-slate-400 text-sm font-semibold leading-relaxed relative z-10 italic opacity-90">
             Find verified workshops and get your vehicle serviced without any friction.
           </p>
           <Button 
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white border-none text-lg font-black relative z-10" 
            onClick={() => navigate('/customer/mechanics')}
           >
             Find Mechanic
           </Button>
        </Card>
      </div>
    </div>
  );
}
