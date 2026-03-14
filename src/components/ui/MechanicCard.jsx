import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Phone } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

export function MechanicCard({ mechanic, onBook, index = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-transparent bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 text-2xl font-black border border-slate-100 italic">
  {mechanic.workshopName?.charAt(0)}
</div>
          <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <CheckCircle2 size={12} /> Verified
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2 tracking-tight">
            {mechanic.workshopName || 'Professional Workshop'}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm italic">
              <MapPin size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="truncate">{mechanic.address || 'Location Hidden'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-semibold">
              <Phone size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
              <span>{mechanic.phone || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <Button 
          className="mt-8 w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest" 
          onClick={() => onBook(mechanic)}
        >
          View Services & Book
        </Button>
      </Card>
    </motion.div>
  );
}
