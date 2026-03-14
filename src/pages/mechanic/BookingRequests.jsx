import React, { useState, useEffect } from 'react';
import { getMechanicBookings, updateBookingStatus } from '../../services/bookingService';
import { Button, Card, BookingCard, Notification, Loader } from '../../components/ui';
import { ClipboardList, Filter, RefreshCw } from 'lucide-react';

export default function BookingRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const load = () => {
    setLoading(true);
    getMechanicBookings()
      .then(r => setBookings(r.data.data || []))
      .catch(() => setNotif({ message: 'Failed to load bookings', type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleUpdate = async (id, status) => {
    setLoadingId(`${id}-${status}`);
    try {
      await updateBookingStatus(id, status);
      setNotif({ message: `Job ${id} updated to ${status.replace(/_/g, ' ')}`, type: 'success' });
      load();
    } catch {
      setNotif({ message: 'Error updating job status', type: 'error' });
    } finally {
      setLoadingId(null);
    }
  };

  const nextStatusMap = {
    REQUESTED: ['ACCEPTED', 'REJECTED'],
    ACCEPTED: ['PICKUP_STARTED', 'SERVICE_IN_PROGRESS'],
    PICKUP_STARTED: ['SERVICE_IN_PROGRESS'],
    SERVICE_IN_PROGRESS: ['COMPLETED'],
    COMPLETED: [],
    PAYMENT_PENDING: [],
    PAYMENT_COMPLETED: [],
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking Requests</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Real-time job management and status tracking.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={load} leftIcon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />} className="font-bold border-slate-200">
            Refresh
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Filter size={16} />} className="font-bold border-slate-200">
            Filter
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="py-20"><Loader /></div>
      ) : bookings.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
           <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <ClipboardList size={40} />
           </div>
           <p className="text-slate-500 font-black uppercase tracking-widest text-sm opacity-60">No active job requests found.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((b, i) => (
            <BookingCard 
              key={b.id} 
              booking={b} 
              index={i} 
              role="ROLE_MECHANIC" 
              onAction={(type, data) => {
                // Here we can show a detailed view or status update prompt
                console.log('Action:', type, data);
              }}
            />
          ))}
          
          <div className="mt-12 space-y-4">
             <h2 className="text-xl font-black text-slate-900 dark:text-white border-l-4 border-primary pl-4 tracking-tight">Active Job Pipeline</h2>
             <div className="space-y-3">
                {bookings.filter(b => nextStatusMap[b.status]?.length > 0).map(b => (
                  <Card key={b.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-black text-primary border border-slate-100 dark:border-slate-700 italic">#{b.id}</div>
                        <div>
                           <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{b.customerName || 'Customer'}</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{b.serviceName}</p>
                        </div>
                     </div>
                     <div className="flex gap-2 w-full md:w-auto">
                        {nextStatusMap[b.status].map(ns => (
                          <Button 
                            key={ns} 
                            size="sm"
                            variant={ns === 'REJECTED' ? 'outline' : 'primary'}
                            onClick={() => handleUpdate(b.id, ns)}
                            loading={loadingId === `${b.id}-${ns}`}
                            className={`flex-1 md:flex-none min-w-[120px] h-11 text-[10px] font-black uppercase tracking-widest ${ns === 'REJECTED' ? 'text-rose-500 border-rose-100 hover:bg-rose-50' : 'shadow-lg shadow-primary/20'}`}
                          >
                            {ns.replace(/_/g, ' ')}
                          </Button>
                        ))}
                     </div>
                  </Card>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
