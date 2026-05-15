import { Download, FileText, BarChart2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../shared/components/GlassCard';

export default function Reports() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Compliance & Reports</h1>
          <p className="text-slate-400 mt-1">Generate and export cognitive threat analysis reports</p>
        </div>
        <button className="px-6 py-2 bg-[var(--color-cyber-blue)] text-slate-950 font-bold rounded-lg flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
          <Download size={18} />
          Export All (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6 flex flex-col items-center text-center group cursor-pointer hover:border-[var(--color-cyber-blue)]/50">
          <div className="w-16 h-16 rounded-full bg-[var(--color-cyber-blue)]/10 flex items-center justify-center text-[var(--color-cyber-blue)] mb-4 group-hover:scale-110 transition-transform">
            <FileText size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Executive Summary</h3>
          <p className="text-sm text-slate-400">High-level overview of cognitive threats and mitigation metrics for leadership.</p>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center text-center group cursor-pointer hover:border-[var(--color-cyber-purple)]/50">
          <div className="w-16 h-16 rounded-full bg-[var(--color-cyber-purple)]/10 flex items-center justify-center text-[var(--color-cyber-purple)] mb-4 group-hover:scale-110 transition-transform">
            <BarChart2 size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Detailed Analysis</h3>
          <p className="text-sm text-slate-400">In-depth breakdown of manipulation techniques, agent consensus, and raw data.</p>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center text-center group cursor-pointer hover:border-[var(--color-cyber-success)]/50">
          <div className="w-16 h-16 rounded-full bg-[var(--color-cyber-success)]/10 flex items-center justify-center text-[var(--color-cyber-success)] mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-bold text-white mb-2">Compliance Audit</h3>
          <p className="text-sm text-slate-400">Data handling, privacy metrics, and system integrity verification report.</p>
        </GlassCard>
      </div>

      {/* Mock PDF Preview */}
      <GlassCard className="flex-1 p-0 flex flex-col overflow-hidden relative">
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <span className="text-sm font-mono text-slate-400">Preview: Q2_Cognitive_Threat_Report.pdf</span>
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-slate-700"></button>
            <button className="w-3 h-3 rounded-full bg-slate-700"></button>
            <button className="w-3 h-3 rounded-full bg-slate-700"></button>
          </div>
        </div>
        <div className="flex-1 bg-slate-300 p-8 overflow-y-auto">
          {/* A fake paper document inside the UI */}
          <div className="max-w-3xl mx-auto bg-white min-h-[800px] shadow-2xl text-slate-900 p-12 relative">
            <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tight">Threat Report</h1>
                <p className="text-slate-500 font-mono mt-2">ID: TR-Q2-2026 | Thought Firewall SOC</p>
              </div>
              <ShieldAlert className="text-slate-900" size={48} />
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold uppercase border-b border-slate-300 mb-4 pb-2">1. Executive Summary</h2>
                <p className="text-slate-700 leading-relaxed">
                  During Q2 2026, the Agentic AI Defense System processed over 14.2 million content fragments. 
                  We detected a 34% increase in coordinated fear-based manipulation campaigns targeting financial 
                  sectors, alongside a steady stream of sophisticated phishing attempts utilizing advanced urgency heuristics.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase border-b border-slate-300 mb-4 pb-2">2. Manipulation Tactics Heatmap</h2>
                <div className="h-48 bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-400">
                  [ ECharts Heatmap Placeholder ]
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold uppercase border-b border-slate-300 mb-4 pb-2">3. Mitigation Efficacy</h2>
                <ul className="list-disc pl-5 text-slate-700 space-y-2">
                  <li><strong>99.4%</strong> True Positive Rate for Propaganda detection.</li>
                  <li><strong>12ms</strong> Average Agent Consensus Latency.</li>
                  <li><strong>0</strong> Critical psychological breaches in secured enterprise networks.</li>
                </ul>
              </section>
            </div>
            
            <div className="absolute bottom-12 left-12 right-12 text-center border-t border-slate-300 pt-4 text-xs text-slate-500 uppercase font-mono">
              Confidential - Do Not Distribute
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
