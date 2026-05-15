import { useState } from 'react';
import { Search, Filter, AlertOctagon, RefreshCw, ChevronDown, Activity, Globe, ShieldAlert } from 'lucide-react';
import { GlassCard } from '../shared/components/GlassCard';
import { ThreatBadge } from '../shared/components/ThreatBadge';

const mockThreats = [
  { id: 'TR-8992', type: 'State-Sponsored Propaganda', source: 'Botnet-Alpha (Geo: Unknown)', severity: 'critical', status: 'active', time: '12 mins ago', details: 'Coordinated deployment of fear-based narratives across 14 social networks.' },
  { id: 'TR-8991', type: 'Phishing Campaign', source: 'Compromised Mail Servers', severity: 'high', status: 'mitigated', time: '45 mins ago', details: 'Exploiting urgency heuristics regarding impending account suspension.' },
  { id: 'TR-8990', type: 'Deepfake Audio Spread', source: 'Encrypted Chat Groups', severity: 'critical', status: 'investigating', time: '1 hour ago', details: 'AI-generated audio of CEO requesting urgent wire transfers.' },
  { id: 'TR-8989', type: 'Rage-Bait Article Surge', source: 'Content Farm Network', severity: 'medium', status: 'active', time: '2 hours ago', details: 'High volume of articles designed to elicit outrage and bypass logical filtering.' },
  { id: 'TR-8988', type: 'Election Misinformation', source: 'Social Array C', severity: 'high', status: 'active', time: '4 hours ago', details: 'False claims regarding polling station closures spreading virally.' },
  { id: 'TR-8987', type: 'Brand Impersonation', source: 'Lookalike Domains', severity: 'low', status: 'mitigated', time: '5 hours ago', details: 'Standard credential harvesting via fake login portals.' },
];

export default function ThreatFeed() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Global Threat Intelligence</h1>
          <p className="text-slate-400 mt-1">Live feed of cognitive cyberattacks and manipulation campaigns</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search threat ID, source..." 
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-[var(--color-cyber-blue)] w-64"
            />
          </div>
          <button className="p-2 border border-slate-700 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-[var(--color-cyber-danger)]">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
            <AlertOctagon size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">24</div>
            <div className="text-sm text-slate-400">Critical Threats (24h)</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-[var(--color-cyber-blue)]">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            <Globe size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">1,402</div>
            <div className="text-sm text-slate-400">Active Campaigns</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4 border-l-4 border-l-[var(--color-cyber-success)]">
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <ShieldAlert size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">8,934</div>
            <div className="text-sm text-slate-400">Attacks Mitigated</div>
          </div>
        </GlassCard>
      </div>

      {/* Main Feed */}
      <GlassCard className="flex-1 flex flex-col min-h-[500px] overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex gap-4 text-sm font-medium">
            <button className={`pb-4 -mb-4 border-b-2 ${filter === 'all' ? 'border-[var(--color-cyber-blue)] text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`} onClick={() => setFilter('all')}>All Threats</button>
            <button className={`pb-4 -mb-4 border-b-2 ${filter === 'critical' ? 'border-[var(--color-cyber-blue)] text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`} onClick={() => setFilter('critical')}>Critical</button>
            <button className={`pb-4 -mb-4 border-b-2 ${filter === 'active' ? 'border-[var(--color-cyber-blue)] text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`} onClick={() => setFilter('active')}>Active</button>
          </div>
          <button className="flex items-center gap-2 text-sm text-[var(--color-cyber-blue)] hover:text-blue-400 transition-colors">
            <RefreshCw size={14} /> Auto-refresh: ON
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase text-slate-500 border-b border-slate-800">
                <th className="p-4 font-semibold">Threat ID</th>
                <th className="p-4 font-semibold">Classification</th>
                <th className="p-4 font-semibold">Severity</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Time Detected</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {mockThreats.map((threat) => (
                <tr key={threat.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 font-mono text-sm text-slate-300">{threat.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{threat.type}</div>
                    <div className="text-xs text-slate-500 mt-1">{threat.source}</div>
                  </td>
                  <td className="p-4">
                    <ThreatBadge level={threat.severity} />
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border
                      ${threat.status === 'active' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                      ${threat.status === 'mitigated' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${threat.status === 'investigating' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                    `}>
                      {threat.status === 'active' && <Activity size={12} className="animate-pulse" />}
                      {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-400">{threat.time}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronDown size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
