import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Search, 
  ClipboardList, 
  Car, 
  Settings, 
  LogOut, 
  User,
  Wrench,
  CreditCard,
  X,
  Star,
  Users,
  BarChart3,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar({ isOpen, onClose, role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const getLinks = () => {
    if (role === 'ROLE_CUSTOMER') return [
      { to: '/customer', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/customer/mechanics', icon: Search, label: 'Search Mechanics' },
      { to: '/customer/booking-history', icon: ClipboardList, label: 'Booking History' },
      { to: '/customer/vehicles', icon: Car, label: 'Vehicle Management' },
      { to: '/customer/profile', icon: User, label: 'My Profile' },
    ];
    if (role === 'ROLE_MECHANIC') return [
      { to: '/mechanic', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/mechanic/booking-requests', icon: ClipboardList, label: 'Booking Requests' },
      { to: '/mechanic/services', icon: Wrench, label: 'Service Management' },
      { to: '/mechanic/profile', icon: User, label: 'Workshop Profile' },
      { to: '/mechanic/ratings-feedback', icon: Star, label: 'Ratings & Feedback' },
    ];
    if (role === 'ROLE_ADMIN') return [
      { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/admin/users', icon: Users, label: 'Manage Users' },
      { to: '/admin/mechanics', icon: Wrench, label: 'Manage Mechanics' },
      { to: '/admin/booking-monitoring', icon: Search, label: 'Booking Monitoring' },
      { to: '/admin/system-analytics', icon: BarChart3, label: 'System Analytics' },
    ];
    return [];
  };

  const links = getLinks();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-400">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-white shadow-lg">
            <Wrench size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight">MechConnect</span>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              {role?.replace('ROLE_', '')} Panel
            </div>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'hover:bg-slate-800 hover:text-white'}
            `}
          >
            <link.icon size={20} strokeWidth={2} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-slate-800/30">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-600 shrink-0">
            <User size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.name || user?.workshopName || 'User'}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200"
        >
          <LogOut size={20} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[280px] shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[280px] border-r border-slate-800 z-40">
        <SidebarContent />
      </div>
    </>
  );
}
