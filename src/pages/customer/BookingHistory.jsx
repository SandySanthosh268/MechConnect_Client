import React, { useState, useEffect } from 'react';
import { getCustomerBookings, processPayment } from '../../services/bookingService';
import { submitRating } from '../../services/mechanicService';
import { Button, Card, BookingCard, Notification, RatingStars, Loader } from '../../components/ui';
import { ClipboardList, Star, CreditCard, X, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPay, setShowPay] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [notif, setNotif] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBookings = async () => {
    try {
      const res = await getCustomerBookings();
      setBookings(res.data.data || []);
    } catch {
      setNotif({ message: 'Error loading bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBookings(); }, []);

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      await processPayment({ bookingId: selectedBooking.id, amount: selectedBooking.amount, paymentMethod: 'UPI' });
      setNotif({ message: 'Payment successful!', type: 'success' });
      setShowPay(false);
      loadBookings();
    } catch {
      setNotif({ message: 'Payment failed', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitRating({ bookingId: selectedBooking.id, ratingValue: rating });
      setNotif({ message: 'Thank you for your feedback!', type: 'success' });
      setShowRate(false);
      setRating(5);
      setComment('');
    } catch {
      setNotif({ message: 'Failed to submit rating', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {notif && <Notification {...notif} onClose={() => setNotif(null)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking History</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Track your previous services and manage payments.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {['ALL', 'ACTIVE', 'COMPLETED'].map(f => (
            <button key={f} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${f === 'ALL' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20"><Loader /></div>
      ) : bookings.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 bg-slate-50/50">
          <div className="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center mx-auto mb-6 text-slate-200">
            <ClipboardList size={40} />
          </div>
          <p className="text-slate-500 font-black uppercase tracking-widest italic tracking-wider opacity-60">You haven't made any bookings yet.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((b, i) => (
            <BookingCard 
              key={b.id} 
              booking={b} 
              index={i} 
              role="ROLE_CUSTOMER" 
              onAction={(type, data) => {
                setSelectedBooking(data);
                if (type === 'PAY') setShowPay(true);
                if (type === 'RATE') setShowRate(true);
              }} 
            />
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <AnimatePresence>
        {showPay && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPay(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[40px] p-8 md:p-12 w-full max-w-lg shadow-3xl relative z-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8">
                <CreditCard size={40} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Secure Payment</h2>
              <p className="text-slate-500 font-bold mb-8">Total Amount to Pay: <span className="text-2xl text-slate-900 ml-2 italic font-black">₹{selectedBooking?.amount}</span></p>
              
              <div className="bg-slate-50 rounded-[32px] p-8 mb-10 border border-slate-100 flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center font-black text-primary italic text-xl">UPI</div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Encrypted Handshake Active</p>
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1 font-bold h-14" onClick={() => setShowPay(false)}>Cancel</Button>
                <Button className="flex-[2] font-black h-14 rounded-2xl shadow-xl shadow-primary/20" loading={isSubmitting} onClick={handlePay}>Confirm & Pay</Button>
              </div>
              <p className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Shield size={14} className="text-emerald-500" /> Secure SSL Environment
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRate && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRate(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white rounded-[40px] p-8 md:p-12 w-full max-w-lg shadow-3xl relative z-10">
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-6">
                  <Star size={40} fill="currentColor" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Rate Service</h2>
                <p className="text-slate-500 font-bold mt-2">How was your experience with {selectedBooking?.mechanicName || 'the mechanic'}?</p>
              </div>

              <form onSubmit={handleRate} className="space-y-8 text-center">
                <RatingStars interactive={true} rating={rating} onRate={setRating} />
                
                <div className="text-left">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Share your thoughts</label>
                  <textarea className="input-field py-4 font-bold" rows="3" placeholder="Tell us more about the service quality..." value={comment} onChange={e => setComment(e.target.value)} required />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="ghost" type="button" className="flex-1 font-bold h-14" onClick={() => setShowRate(false)}>Ignore</Button>
                  <Button type="submit" className="flex-[2] font-black h-14 rounded-2xl shadow-xl shadow-primary/20" loading={isSubmitting}>Submit Review</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
