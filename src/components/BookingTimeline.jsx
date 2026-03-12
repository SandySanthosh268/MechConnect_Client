import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Truck, 
  Wrench, 
  CheckCircle,
  CreditCard,
  AlertCircle
} from 'lucide-react';

const ShieldCheck = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const steps = [
  { id: 'REQUESTED', label: 'Requested', icon: <Clock size={16} /> },
  { id: 'ACCEPTED', label: 'Accepted', icon: <CheckCircle2 size={16} /> },
  { id: 'PICKUP_STARTED', label: 'Pickup', icon: <Truck size={16} /> },
  { id: 'SERVICE_IN_PROGRESS', label: 'Repairing', icon: <Wrench size={16} /> },
  { id: 'COMPLETED', label: 'Done', icon: <CheckCircle size={16} /> },
  { id: 'PAYMENT_PENDING', label: 'Payable', icon: <CreditCard size={16} /> },
  { id: 'PAYMENT_COMPLETED', label: 'Finished', icon: <ShieldCheck size={16} /> },
];

export default function BookingTimeline({ currentStatus }) {
  const currentIndex = steps.findIndex(s => s.id === currentStatus);
  const isRejected = currentStatus === 'REJECTED';
  const isCancelled = currentStatus === 'CANCELLED';

  if (isRejected || isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
        <AlertCircle size={20} />
        <span className="text-sm font-black uppercase tracking-widest">
           Booking {isRejected ? 'Rejected by Mechanic' : 'Cancelled'}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8 overflow-x-auto no-scrollbar">
      <div className="flex items-start justify-between min-w-[600px] px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || currentStatus === 'PAYMENT_COMPLETED';
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex && currentStatus !== 'PAYMENT_COMPLETED';

          return (
            <div key={step.id} className="relative flex flex-col items-center flex-1">
              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    className="h-full bg-primary"
                  />
                </div>
              )}

              {/* Node */}
              <motion.div 
                initial={false}
                animate={{ 
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-bg-card)',
                  borderColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-border)'
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors z-10 
                  ${isCompleted || isCurrent ? 'text-white' : 'text-slate-300'}`}
              >
                {isCompleted ? <CheckCircle2 size={20} /> : step.icon}
              </motion.div>

              {/* Label */}
              <div className="mt-4 text-center">
                <p className={`text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-primary' : isCompleted ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                   {step.label}
                </p>
                {isCurrent && (
                   <motion.div 
                    layoutId="active-indicator"
                    className="w-1 h-1 rounded-full bg-primary mx-auto mt-1"
                   />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
