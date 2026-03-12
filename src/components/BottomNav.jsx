import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ClipboardList, User } from 'lucide-react';

export function BottomNav({ role }) {
  const getLinks = () => {
    if (role === 'ROLE_CUSTOMER') return [
      { to: '/customer', icon: Home, label: 'Home', end: true },
      { to: '/customer/mechanics', icon: Search, label: 'Search' },
      { to: '/customer/bookings', icon: ClipboardList, label: 'Bookings' },
      { to: '/customer/vehicles', icon: User, label: 'Profile' },
    ];
    if (role === 'ROLE_MECHANIC') return [
      { to: '/mechanic', icon: Home, label: 'Home', end: true },
      { to: '/mechanic/bookings', icon: ClipboardList, label: 'Requests' },
      { to: '/mechanic/profile', icon: User, label: 'Profile' },
    ];
    return [];
  };

  const links = getLinks();
  if (links.length === 0) return null;

  return (
    <div className="mobile-bottom-nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 min-w-[64px] transition-colors
            ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}
          `}
        >
          {({ isActive }) => (
            <>
              <link.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
