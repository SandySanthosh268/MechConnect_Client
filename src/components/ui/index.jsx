import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  leftIcon, 
  rightIcon, 
  children, 
  ...props 
}) {
  const cn = twMerge(
    clsx(
      'btn',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-outline': variant === 'outline',
        'btn-ghost': variant === 'ghost',
        'px-4 py-2 text-sm': size === 'sm',
        'px-8 py-4 text-lg': size === 'lg',
      },
      className
    )
  );

  return (
    <button className={cn} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

export function Card({ className, interactive, children, ...props }) {
  return (
    <div 
      className={twMerge(
        clsx(
          'card', 
          { 'card-interactive cursor-pointer': interactive }, 
          className
        )
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
