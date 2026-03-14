import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';
import { MobileMenu } from '../components/common/MobileMenu';
import { useAuth } from '../context/AuthContext';

export default function MechanicLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        role={role} 
      />
      
      <div className="main-container lg:ml-[280px]">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      <MobileMenu role={role} />
    </div>
  );
}
