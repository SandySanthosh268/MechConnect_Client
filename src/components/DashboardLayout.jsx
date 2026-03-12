import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAuth();

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        role={role} 
      />
      
      <div className="lg:ml-[280px] min-h-screen flex flex-col">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        <BottomNav role={role} />
      </div>
    </div>
  );
}
