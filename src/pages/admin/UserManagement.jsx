import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../services/userService';
import { Card, Loader, Button } from '../../components/ui';
import { Users, Search, MoreHorizontal, Mail, MapPin, Phone, Shield } from 'lucide-react';

export default function UserManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllCustomers()
      .then(r => setCustomers(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(c => 
    c.name?.toLowerCase().includes(query.toLowerCase()) || 
    c.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Directory</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-semibold">Managing and monitoring customer engagement across the platform.</p>
        </div>
        <div className="relative w-full md:w-80 group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
           <input 
            className="input-field h-12 pl-12 font-bold shadow-sm" 
            placeholder="Search by name or email..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
           />
        </div>
      </div>

      {loading ? (
        <div className="py-20"><Loader /></div>
      ) : (
        <Card className="p-0 border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden rounded-[32px]">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 italic">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Customer Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Reachability</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Primary Footprint</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-center">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((c, i) => (
                  <tr key={c.id || i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-primary border border-slate-100 italic group-hover:scale-110 transition-transform">
                             {c.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                             <p className="font-black text-slate-900 tracking-tight leading-none text-lg">{c.name || 'Anonymous User'}</p>
                             <div className="flex items-center gap-1.5 mt-1.5">
                                <Shield size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Member</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                             <Mail size={14} className="text-slate-400" /> {c.email || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                             <Phone size={14} className="text-slate-400" /> {c.phone || 'NO_CONTACT'}
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-start gap-2 max-w-[250px]">
                          <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                          <p className="text-xs font-bold text-slate-500 leading-relaxed italic">{c.address || 'Location data not shared.'}</p>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl hover:bg-slate-100">
                          <MoreHorizontal size={20} className="text-slate-400" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
             <div className="py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-200">
                   <Users size={40} />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">No matching customers found.</p>
             </div>
          )}
        </Card>
      )}
    </div>
  );
}
