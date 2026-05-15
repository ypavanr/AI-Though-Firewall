import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { ShieldAlert, AlertTriangle, Activity, Network, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../shared/components/GlassCard';
import { RiskMeter } from '../shared/components/RiskMeter';
import { RadarChart } from '../shared/components/RadarChart';
import { AnimatedCounter } from '../shared/components/AnimatedCounter';
import { ThreatBadge } from '../shared/components/ThreatBadge';
import { globalRiskScore, activeThreatsCount, scannedItemsCount, agentsActive } from '../state/appState';
import { startGlobalStream } from '../services/MockStreamService';

let streamStarted = false;

export default function Dashboard() {
  useSignals();

  useEffect(() => {
    if (!streamStarted) {
      startGlobalStream();
      streamStarted = true;
    }
  }, []);

  const mockThreats = [
    { id: 1, type: "Coordinated Propaganda", source: "Botnet-Alpha", severity: "critical", time: "2m ago" },
    { id: 2, type: "Phishing Wave", source: "Unknown Entity", severity: "high", time: "15m ago" },
    { id: 3, type: "Election Misinformation", source: "Social Array C", severity: "high", time: "42m ago" },
    { id: 4, type: "Rage Bait Campaign", source: "Ad Network X", severity: "medium", time: "1h ago" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">SOC Dashboard</h1>
          <p className="text-[#00e5ff] mt-2 tracking-wide text-sm font-medium">REAL-TIME COGNITIVE THREAT MONITORING</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0a0a0f] border border-white/5 px-4 py-2 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffa2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ffa2]"></span>
          </span>
          <span className="text-sm font-bold font-mono text-[#00ffa2] uppercase tracking-widest">Live Sync</span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard delay={0.1} className="p-6 flex items-center justify-between" glow={globalRiskScore.value > 70}>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Global Risk Level</p>
            <div className="text-4xl font-bold text-white tracking-tighter">
              <AnimatedCounter value={globalRiskScore.value} /> <span className="text-xl text-slate-600">/ 100</span>
            </div>
          </div>
          <Activity className="text-[#00e5ff] opacity-50" size={32} />
        </GlassCard>
        
        <GlassCard delay={0.2} className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Active Threats</p>
            <div className="text-4xl font-bold text-[#ff003c] tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,60,0.5)]">
              <AnimatedCounter value={activeThreatsCount.value} />
            </div>
          </div>
          <AlertTriangle className="text-[#ff003c] opacity-50" size={32} />
        </GlassCard>

        <GlassCard delay={0.3} className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Items Scanned</p>
            <div className="text-4xl font-bold text-white tracking-tighter">
              <AnimatedCounter value={scannedItemsCount.value} />
            </div>
          </div>
          <ShieldAlert className="text-[#00ffa2] opacity-50" size={32} />
        </GlassCard>

        <GlassCard delay={0.4} className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Agents Active</p>
            <div className="text-4xl font-bold text-[#b000ff] tracking-tighter drop-shadow-[0_0_10px_rgba(176,0,255,0.5)]">
              <AnimatedCounter value={agentsActive.value} />
            </div>
          </div>
          <Network className="text-[#b000ff] opacity-50" size={32} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <GlassCard delay={0.5} className="p-6 lg:col-span-1 h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3">Global Manipulation Radar</h2>
          <div className="flex-1 -mx-4">
            <RadarChart data={[60, 45, 80, 50, 30, 20]} />
          </div>
        </GlassCard>

        {/* Live Threat Feed */}
        <GlassCard delay={0.6} className="p-6 lg:col-span-2 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-white">Live Threat Feed</h2>
            <button className="text-xs font-bold tracking-widest uppercase text-[#00e5ff] hover:text-white transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {mockThreats.map((threat, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                key={threat.id} 
                className="p-4 rounded-xl bg-[#0f0f15]/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#151520] hover:border-[#00e5ff]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shadow-inner ${threat.severity === 'critical' ? 'bg-[#ff003c]/10 text-[#ff003c]' : 'bg-[#ff8c00]/10 text-[#ff8c00]'}`}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#00e5ff] transition-colors">{threat.type}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-mono">
                      <Users size={12} className="text-slate-500" /> Source: {threat.source}
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                  <ThreatBadge level={threat.severity} />
                  <span className="text-xs text-[#00e5ff] font-mono opacity-60">{threat.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
