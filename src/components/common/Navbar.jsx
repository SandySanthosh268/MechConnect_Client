import React from 'react';
import { Menu, Bell, User, Wrench } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar({ onOpenSidebar }) {
  const { user } = useAuth();

  return (
    <nav className="nav-blur h-16 px-4 md:px-8 flex items-center justify-between bg-white/80 dark:bg-slate-900/80">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-400"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <Wrench size={16} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">MechConnect</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2.5 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3 pl-1">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-1">
              {user?.name || user?.workshopName || 'User'}
            </p>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {user?.role?.replace('ROLE_', '')}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer hover:border-primary/50 transition-colors">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}
