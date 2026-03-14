import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/userService';
import Notification from '../../components/ui/Notification';
import { Button, Card } from '../../components/ui';
import { Mail, Lock, User, Phone, MapPin, Wrench, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '', password: '', role: 'ROLE_CUSTOMER',
    name: '', phone: '', address: '', workshopName: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    try {
      await register(form);
      setToast({ message: 'Registration successful! Please log in.', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Registration failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const isMechanic = form.role === 'ROLE_MECHANIC';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      {toast && <Notification {...toast} onClose={() => setToast(null)} />}
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Wrench size={28} strokeWidth={2.5} />
          </div>
        </motion.div>
        <h2 className="text-center text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Join the MechConnect community
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10"
      >
        <Card className="px-6 py-10 md:px-12 shadow-2xl dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="input-label text-center block mb-4">Register as</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[{ val: 'ROLE_CUSTOMER', label: 'Customer', icon: '🚗' }, { val: 'ROLE_MECHANIC', label: 'Mechanic', icon: '🔧' }].map(
                        (r) => (
                          <button key={r.val} type="button"
                            onClick={() => update('role', r.val)}
                            className={`
                              flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200
                              ${form.role === r.val 
                                ? 'bg-primary/10 border-primary text-primary shadow-inner' 
                                : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/30'}
                            `}
                          >
                            <span className="text-3xl">{r.icon}</span>
                            <span className="font-bold uppercase tracking-widest text-xs">{r.label}</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="input-label">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Mail size={18} />
                        </div>
                        <input id="reg-email" className="input-field pl-11" type="email" placeholder="name@example.com"
                          value={form.email} onChange={(e) => update('email', e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="input-label">Password</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Lock size={18} />
                        </div>
                        <input id="reg-password" className="input-field pl-11" type="password" placeholder="Min 6 characters"
                          value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={6} />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14" rightIcon={<ArrowRight size={20} />}>
                    Continue
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${isMechanic ? 'md:col-span-1' : 'md:col-span-2'}`}>
                      <label className="input-label">{isMechanic ? 'Contact Name' : 'Full Name'}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <User size={18} />
                        </div>
                        <input className="input-field pl-11" placeholder="John Doe"
                          value={form.name} onChange={(e) => update('name', e.target.value)} required />
                      </div>
                    </div>

                    {isMechanic && (
                      <div>
                        <label className="input-label">Workshop Name</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <Wrench size={18} />
                          </div>
                          <input className="input-field pl-11" placeholder="AutoPro Workshop"
                            value={form.workshopName} onChange={(e) => update('workshopName', e.target.value)} required />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="input-label">Phone Number</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <Phone size={18} />
                        </div>
                        <input className="input-field pl-11" placeholder="+91 9876543210"
                          value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
                      </div>
                    </div>

                    <div>
                      <label className="input-label">Location/Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                          <MapPin size={18} />
                        </div>
                        <input className="input-field pl-11" placeholder="City, State"
                          value={form.address} onChange={(e) => update('address', e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" type="button" onClick={() => setStep(1)} className="w-[120px]" leftIcon={<ArrowLeft size={20} />}>
                      Back
                    </Button>
                    <Button type="submit" loading={loading} className="flex-1" rightIcon={<ArrowRight size={20} />}>
                        Complete Registration
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-primary-dark">
              Sign In
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
