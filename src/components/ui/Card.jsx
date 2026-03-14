import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={cn('card border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/50', className)} {...props}>
      {children}
    </div>
  );
};
