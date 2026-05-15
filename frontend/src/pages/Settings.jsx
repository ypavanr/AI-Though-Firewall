import { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, EyeOff, Key, Database } from 'lucide-react';
import { GlassCard } from '../shared/components/GlassCard';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('defense');

  const tabs = [
    { id: 'defense', label: 'Defense Engine', icon: Shield },
    { id: 'privacy', label: 'Data Privacy', icon: EyeOff },
    { id: 'alerts', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'storage', label: 'Log Storage', icon: Database },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-slate-400 mt-1">Configure Thought Firewall agent sensitivity and parameters</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <GlassCard className="md:w-64 p-4 h-fit">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                    ${isActive ? 'bg-slate-800 text-[var(--color-cyber-blue)] shadow-[0_0_10px_rgba(0,240,255,0.1)] border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                  `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </GlassCard>

        <div className="flex-1 space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Agentic Defense Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-white font-medium mb-2">
                  <span>Global Sensitivity Threshold</span>
                  <span className="text-[var(--color-cyber-blue)]">Aggressive (85%)</span>
                </label>
                <p className="text-sm text-slate-400 mb-4">Determines the threshold at which content is flagged or blocked.</p>
                <input type="range" className="w-full accent-[var(--color-cyber-blue)] cursor-pointer" defaultValue="85" />
              </div>

              <hr className="border-slate-800" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Auto-Mitigation</h3>
                  <p className="text-sm text-slate-400">Automatically block severe cognitive threats without user intervention.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyber-blue)]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Deep Explainability Generation</h3>
                  <p className="text-sm text-slate-400">Generate context cards explaining the exact manipulation tactic used.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyber-blue)]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Browser Shield Injection</h3>
                  <p className="text-sm text-slate-400">Enable overlay warnings directly on social media and news feeds.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyber-blue)]"></div>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-2 border border-slate-700 text-slate-300 rounded hover:bg-slate-800 transition-colors">Discard</button>
              <button className="px-6 py-2 bg-[var(--color-cyber-blue)] text-slate-950 font-bold rounded hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">Save Changes</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
