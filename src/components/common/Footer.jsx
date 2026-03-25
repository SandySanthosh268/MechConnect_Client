import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="MechConnect Logo" className="w-8 h-8 rounded-lg shadow-sm object-cover" />
              <span className="text-xl font-black text-slate-900 tracking-tighter">MechConnect</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              The ultimate platform for vehicle owners to connect with professional, verified mechanics for reliable services.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm text-slate-600 font-semibold">
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Our Process</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Verified Mechanics</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Services</h5>
            <ul className="space-y-4 text-sm text-slate-600 font-semibold">
              <li><Link to="#" className="hover:text-primary transition-colors">Car Repair</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Bike Servicing</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Engine Diagnostics</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Oil Change</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h5>
            <ul className="space-y-4 text-sm text-slate-600 font-semibold">
              <li><Link to="#" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Facebook</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© 2026 MechConnect Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
