import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { ShieldAlert, AlertTriangle, Activity, Network, Users } from 'lucide-react';
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

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SOC Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time cognitive threat monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-cyber-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-cyber-success)]"></span>
          </span>
          <span className="text-sm font-mono text-[var(--color-cyber-success)] uppercase tracking-wider">Live Sync</span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 flex items-center justify-between" glow={globalRiskScore.value > 70}>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Global Risk Level</p>
            <div className="text-3xl font-bold text-white">
              <AnimatedCounter value={globalRiskScore.value} /> / 100
            </div>
          </div>
          <Activity className="text-[var(--color-cyber-blue)] opacity-50" size={32} />
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Active Threats</p>
            <div className="text-3xl font-bold text-[var(--color-cyber-danger)]">
              <AnimatedCounter value={activeThreatsCount.value} />
            </div>
          </div>
          <AlertTriangle className="text-[var(--color-cyber-danger)] opacity-50" size={32} />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Items Scanned</p>
            <div className="text-3xl font-bold text-white">
              <AnimatedCounter value={scannedItemsCount.value} />
            </div>
          </div>
          <ShieldAlert className="text-[var(--color-cyber-success)] opacity-50" size={32} />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Agents Active</p>
            <div className="text-3xl font-bold text-[var(--color-cyber-purple)]">
              <AnimatedCounter value={agentsActive.value} />
            </div>
          </div>
          <Network className="text-[var(--color-cyber-purple)] opacity-50" size={32} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <GlassCard className="p-6 lg:col-span-1 h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">Global Manipulation Radar</h2>
          <div className="flex-1 -mx-4">
            <RadarChart data={[60, 45, 80, 50, 30, 20]} />
          </div>
        </GlassCard>

        {/* Live Threat Feed */}
        <GlassCard className="p-6 lg:col-span-2 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Live Threat Feed</h2>
            <button className="text-sm text-[var(--color-cyber-blue)] hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {mockThreats.map((threat) => (
              <div key={threat.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{threat.type}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Users size={12} /> Source: {threat.source}
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <ThreatBadge level={threat.severity} />
                  <span className="text-xs text-slate-500 font-mono">{threat.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
