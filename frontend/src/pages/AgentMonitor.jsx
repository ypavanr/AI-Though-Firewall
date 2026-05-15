import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, Network, Shield, AlertTriangle, MessageSquare, Scale, Cpu, X } from 'lucide-react';
import { GlassCard } from '../shared/components/GlassCard';

const agents = [
  { id: 'source', x: 50, y: 50, icon: Search, label: 'Content Ingestion', color: 'text-slate-400', bg: 'bg-slate-800' },
  { id: 'emotion', x: 25, y: 25, icon: MessageSquare, label: 'Emotion Agent', color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { id: 'fact', x: 25, y: 75, icon: Shield, label: 'FactCheck Agent', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'bias', x: 50, y: 20, icon: Scale, label: 'Bias Agent', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { id: 'social', x: 50, y: 80, icon: AlertTriangle, label: 'SocialEng Agent', color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'context', x: 75, y: 25, icon: Network, label: 'Context Agent', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'consensus', x: 75, y: 75, icon: Brain, label: 'Consensus Agent', color: 'text-[var(--color-cyber-blue)]', bg: 'bg-[var(--color-cyber-blue)]/20' },
  { id: 'output', x: 90, y: 50, icon: Cpu, label: 'Decision Matrix', color: 'text-[var(--color-cyber-success)]', bg: 'bg-[var(--color-cyber-success)]/20' },
];

const edges = [
  { from: 'source', to: 'emotion' },
  { from: 'source', to: 'fact' },
  { from: 'emotion', to: 'bias' },
  { from: 'fact', to: 'social' },
  { from: 'bias', to: 'context' },
  { from: 'social', to: 'context' },
  { from: 'emotion', to: 'consensus' },
  { from: 'fact', to: 'consensus' },
  { from: 'bias', to: 'consensus' },
  { from: 'social', to: 'consensus' },
  { from: 'context', to: 'consensus' },
  { from: 'consensus', to: 'output' },
];

export default function AgentMonitor() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activeEdges, setActiveEdges] = useState([]);

  // Simulate traffic
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick 2-4 random edges to be active
      const shuffled = [...edges].sort(() => 0.5 - Math.random());
      setActiveEdges(shuffled.slice(0, Math.floor(Math.random() * 3) + 2).map(e => `${e.from}-${e.to}`));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Agent Orchestration</h1>
          <p className="text-slate-400 mt-1">Live view of multi-agent reasoning and consensus</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-[var(--color-cyber-success)] animate-pulse"></div>
          <span className="text-xs font-mono text-slate-300">Swarm Active</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Network Graph Panel */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden bg-slate-950/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]"></div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, i) => {
              const from = agents.find(a => a.id === edge.from);
              const to = agents.find(a => a.id === edge.to);
              const isActive = activeEdges.includes(`${edge.from}-${edge.to}`);
              
              return (
                <g key={i}>
                  {/* Base line */}
                  <line 
                    x1={`${from.x}%`} y1={`${from.y}%`} 
                    x2={`${to.x}%`} y2={`${to.y}%`} 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="2"
                  />
                  {/* Active flow animation */}
                  {isActive && (
                    <>
                      <line 
                        x1={`${from.x}%`} y1={`${from.y}%`} 
                        x2={`${to.x}%`} y2={`${to.y}%`} 
                        stroke="var(--color-cyber-blue)" 
                        strokeWidth="2"
                        className="opacity-50"
                      />
                      <circle r="3" fill="var(--color-cyber-blue)" className="shadow-[0_0_8px_var(--color-cyber-blue)]">
                        <animateMotion 
                          dur="1.5s" 
                          repeatCount="1"
                          path={`M ${from.x * 8} ${from.y * 6} L ${to.x * 8} ${to.y * 6}`} 
                          // The path coords above are tricky in pure SVG percentages, 
                          // A simpler approach for the dot is using CSS keyframes, but SVG animate is fine if we use actual pixel values. 
                          // To keep it responsive, we just animate opacity of the line instead of a moving dot, or use a dashed line.
                        />
                      </circle>
                    </>
                  )}
                  {isActive && (
                    <motion.line 
                      x1={`${from.x}%`} y1={`${from.y}%`} 
                      x2={`${to.x}%`} y2={`${to.y}%`} 
                      stroke="var(--color-cyber-cyan)" 
                      strokeWidth="2"
                      strokeDasharray="10 10"
                      initial={{ strokeDashoffset: 20 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = selectedAgent?.id === agent.id;
            return (
              <motion.button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer z-10 
                  ${agent.bg} ${agent.color} 
                  ${isSelected ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20' : 'border-transparent hover:border-slate-500 hover:scale-105'}`}
                style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={24} />
                <span className="absolute top-full mt-2 w-32 -ml-9 text-xs font-medium text-slate-300 pointer-events-none drop-shadow-md">
                  {agent.label}
                </span>
                
                {/* Ping effect */}
                {Math.random() > 0.7 && (
                  <span className={`absolute inset-0 rounded-full border border-current animate-ping opacity-20`}></span>
                )}
              </motion.button>
            );
          })}
        </GlassCard>

        {/* Agent Details Panel */}
        <GlassCard className="lg:col-span-1 p-0 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedAgent ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedAgent.bg} ${selectedAgent.color}`}>
                      <selectedAgent.icon size={20} />
                    </div>
                    <h2 className="font-bold text-white">{selectedAgent.label}</h2>
                  </div>
                  <button onClick={() => setSelectedAgent(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">Current Status</h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-cyber-success)] bg-[var(--color-cyber-success)]/10 px-3 py-2 rounded border border-[var(--color-cyber-success)]/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyber-success)] animate-pulse"></div>
                      Processing Content Stream
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900 border border-slate-800 rounded p-3">
                        <div className="text-xs text-slate-400 mb-1">Latency</div>
                        <div className="font-mono text-white text-sm">42ms</div>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded p-3">
                        <div className="text-xs text-slate-400 mb-1">Confidence</div>
                        <div className="font-mono text-white text-sm">94.2%</div>
                      </div>
                      <div className="col-span-2 bg-slate-900 border border-slate-800 rounded p-3">
                        <div className="text-xs text-slate-400 mb-1">Items Processed</div>
                        <div className="font-mono text-white text-sm">1,204,492</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">Live Activity Log</h3>
                    <div className="bg-[#0a0a0a] rounded border border-slate-800 p-3 font-mono text-[10px] text-slate-400 space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
                      <p><span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> Analyzing segment 0x4F2A...</p>
                      <p><span className="text-[var(--color-cyber-blue)]">[{new Date().toLocaleTimeString()}]</span> Pattern match: 88% confidence</p>
                      <p><span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> Sending vectors to Consensus Agent</p>
                      <p><span className="text-[var(--color-cyber-success)]">[{new Date().toLocaleTimeString()}]</span> Handshake verified.</p>
                      <p className="animate-pulse flex items-center gap-2 mt-2">
                        <span className="w-1.5 h-3 bg-slate-500 inline-block"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center"
              >
                <Network size={48} className="mb-4 opacity-20" />
                <p>Select an agent from the orchestration graph to view detailed metrics and live logs.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
}
