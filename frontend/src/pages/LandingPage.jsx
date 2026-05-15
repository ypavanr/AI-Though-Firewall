import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, BrainCircuit, Activity, Lock, Eye, Network } from 'lucide-react';
import { GlassCard } from '../shared/components/GlassCard';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden relative selection:bg-[var(--color-cyber-blue)] selection:text-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-cyber-blue)] blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-cyber-purple)] blur-[150px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[50%] w-[20%] h-[20%] bg-[var(--color-cyber-cyan)] blur-[100px] rounded-full animate-pulse"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-[var(--color-cyber-blue)]" size={28} />
          <span className="font-bold text-xl tracking-wider text-white">THOUGHT<span className="text-[var(--color-cyber-blue)]">FW</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
          <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 rounded-full border border-[var(--color-cyber-blue)] text-[var(--color-cyber-blue)] hover:bg-[var(--color-cyber-blue)] hover:text-slate-950 transition-all font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          Launch SOC
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 max-w-5xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-cyber-purple)]/50 bg-[var(--color-cyber-purple)]/10 text-[var(--color-cyber-purple)] text-xs font-semibold mb-8 uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-cyber-purple)] animate-pulse"></span>
          Agentic AI Defense Active
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight"
        >
          Protect Your Mind From <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyber-blue)] to-[var(--color-cyber-purple)]">Cognitive Cyberattacks</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
        >
          An AI-powered thought firewall that detects misinformation, propaganda, fear-based manipulation, and sophisticated social engineering in real-time.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 rounded-lg bg-[var(--color-cyber-blue)] text-slate-950 font-bold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Activity size={20} />
            Enter Operations Center
          </button>
          <button 
            onClick={() => navigate('/analysis')}
            className="px-8 py-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert size={20} />
            Try Live Scanner
          </button>
        </motion.div>
      </main>

      {/* Feature Cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard delay={0.4} className="p-8 group hover:border-[var(--color-cyber-blue)]/50">
            <BrainCircuit className="text-[var(--color-cyber-blue)] mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Multi-Agent Orchestration</h3>
            <p className="text-slate-400">7 specialized AI agents collaborate to dissect emotional triggers, bias, and propaganda techniques instantaneously.</p>
          </GlassCard>
          
          <GlassCard delay={0.5} className="p-8 group hover:border-[var(--color-cyber-purple)]/50">
            <Lock className="text-[var(--color-cyber-purple)] mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Cognitive Firewall</h3>
            <p className="text-slate-400">Filters incoming content to strip away manipulation, presenting objective facts and neutralizing psychological pressure.</p>
          </GlassCard>
          
          <GlassCard delay={0.6} className="p-8 group hover:border-[var(--color-cyber-cyan)]/50">
            <Eye className="text-[var(--color-cyber-cyan)] mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Deep Explainability</h3>
            <p className="text-slate-400">Doesn't just block content. Highlights manipulative sentences and explains the exact psychological tactic being used.</p>
          </GlassCard>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950 py-8 mt-20 text-center text-slate-500 text-sm">
        <p>THOUGHT FIREWALL © {new Date().getFullYear()} — Advanced Cognitive Security Systems</p>
      </footer>
    </div>
  );
}
