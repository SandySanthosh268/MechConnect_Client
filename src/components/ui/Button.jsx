import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', loading, leftIcon, children, ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md shadow-secondary/20',
    outline: 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50',
    ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      ref={ref}
      disabled={loading}
      className={cn(
        'btn active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none transition-all duration-300 h-fit',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Processing...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {leftIcon}
          {children}
        </div>
      )}
    </button>
  );
});

Button.displayName = 'Button';
