import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getProfile } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Notification from '../../components/ui/Notification';
import { Button, Card } from '../../components/ui';
import { Mail, Lock, LogIn, Wrench, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      const { token, role } = res.data.data;
      localStorage.setItem('token', token);
      const profileRes = await getProfile();
      const profile = profileRes.data.data;
      loginUser(token, profile);

      if (role === 'ROLE_ADMIN') navigate('/admin');
      else if (role === 'ROLE_MECHANIC') navigate('/mechanic');
      else navigate('/customer');
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

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
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Sign in to your MechConnect account
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="px-10 py-10 shadow-2xl dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="input-label">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  className="input-field pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Password</label>
                <Link to="#" className="text-xs font-bold text-primary hover:text-primary-dark">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="input-field pl-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              id="login-submit" 
              type="submit" 
              className="w-full h-12 shadow-lg shadow-primary/20" 
              loading={loading}
              rightIcon={<ArrowRight size={18} />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">New here?</span>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/register">
              <Button variant="outline" className="w-full h-12 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                Create an account
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
