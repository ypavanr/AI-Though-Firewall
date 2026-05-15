import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Network, 
  Rss, 
  AppWindow, 
  FileBarChart, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Activity },
  { name: 'Live Analysis', path: '/analysis', icon: Search },
  { name: 'Agent Monitor', path: '/agents', icon: Network },
  { name: 'Threat Feed', path: '/threats', icon: Rss },
  { name: 'Browser Shield', path: '/browser-shield', icon: AppWindow },
  { name: 'Reports', path: '/reports', icon: FileBarChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 flex flex-col relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldAlert className="text-[var(--color-cyber-blue)]" size={24} />
            <span className="font-bold text-lg tracking-wider text-white">THOUGHT<span className="text-[var(--color-cyber-blue)]">FW</span></span>
          </div>
        )}
        {collapsed && (
          <ShieldAlert className="text-[var(--color-cyber-blue)] mx-auto" size={24} />
        )}
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-2 px-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-slate-800/80 text-[var(--color-cyber-blue)] border border-slate-700/50 shadow-[0_0_10px_rgba(0,240,255,0.1)]" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <Icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive ? "text-[var(--color-cyber-blue)]" : "")} />
              {!collapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
              )}
              {isActive && !collapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-cyber-blue)] rounded-r-md shadow-[0_0_8px_var(--color-cyber-blue)]"></div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 text-slate-300 rounded-full p-1 hover:text-white hover:border-[var(--color-cyber-blue)] transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-center">
        {!collapsed ? 'v2.4.1 (SOC Build)' : 'v2.4'}
      </div>
    </aside>
  );
}
