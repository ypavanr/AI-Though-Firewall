import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-200 selection:bg-[var(--color-cyber-blue)] selection:text-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-cyber-blue)]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-cyber-purple)]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <TopNav />
        <main className="flex-1 overflow-auto z-10 relative">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
