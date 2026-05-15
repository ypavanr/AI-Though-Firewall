import { Bell, User, Zap, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TopNav() {
  const [pulse, setPulse] = useState(false);

  // Mock global risk pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-10 relative">
      {/* Global Status Banner */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1 text-sm font-mono">
          <ShieldCheck className="text-[var(--color-cyber-success)]" size={16} />
          <span className="text-slate-300">System Status:</span>
          <span className="text-[var(--color-cyber-success)] font-semibold tracking-wider">SECURE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1 text-sm font-mono relative overflow-hidden group">
          <div className={`absolute inset-0 bg-red-500/10 transition-opacity duration-1000 ${pulse ? 'opacity-100' : 'opacity-0'}`}></div>
          <Zap className="text-[var(--color-cyber-warning)]" size={16} />
          <span className="text-slate-300">Live Scans:</span>
          <span className="text-white font-bold">14,239</span>
          <span className="text-slate-500 text-xs">/hr</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-cyber-danger)] rounded-full animate-pulse shadow-[0_0_8px_var(--color-cyber-danger)]"></span>
        </button>
        <div className="h-8 w-px bg-slate-700"></div>
        <button className="flex items-center gap-2 p-1 pr-3 bg-slate-800 rounded-full border border-slate-700 hover:border-slate-500 transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <User size={16} className="text-slate-300" />
          </div>
          <span className="text-sm font-medium text-slate-200">Analyst</span>
        </button>
      </div>
    </header>
  );
}
