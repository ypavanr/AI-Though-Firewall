import { useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { UploadCloud, Search, ShieldAlert, Cpu, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../shared/components/GlassCard';
import { TerminalLogs } from '../shared/components/TerminalLogs';
import { ThreatBadge } from '../shared/components/ThreatBadge';
import { RadarChart } from '../shared/components/RadarChart';
import { RiskMeter } from '../shared/components/RiskMeter';
import { currentAnalysisState, currentAnalysisProgress, analysisLogs, analysisResults } from '../state/appState';
import { simulateAnalysis } from '../services/MockStreamService';

export default function LiveAnalysis() {
  useSignals();
  const [inputText, setInputText] = useState('');

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    simulateAnalysis(inputText);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Live Content Analysis</h1>
        <p className="text-slate-400 mt-1">Paste text or upload documents to detect cognitive manipulation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <GlassCard className="p-6 flex flex-col h-[500px]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="text-[var(--color-cyber-blue)]" size={20} />
            Input Source
          </h2>
          <div className="flex-1 flex flex-col gap-4">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious text here... (e.g. 'URGENT: Your account will be deleted in 24 hours if you do not click this link!')"
              className="flex-1 w-full bg-slate-950/50 border border-slate-700 rounded-lg p-4 text-slate-300 focus:outline-none focus:border-[var(--color-cyber-blue)] focus:ring-1 focus:ring-[var(--color-cyber-blue)] resize-none transition-all"
              disabled={currentAnalysisState.value === 'scanning'}
            />
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-slate-500 hover:bg-slate-800/30 transition-all cursor-pointer">
              <UploadCloud size={24} className="mb-2" />
              <span className="text-sm">Or drag and drop PDF, Image, or File</span>
            </div>
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={currentAnalysisState.value === 'scanning' || !inputText.trim()}
            className="mt-4 w-full py-3 rounded-lg bg-[var(--color-cyber-blue)] text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {currentAnalysisState.value === 'scanning' ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search size={20} />
                Analyze Content
              </>
            )}
          </button>
        </GlassCard>

        {/* Pipeline & Logs Panel */}
        <GlassCard className="p-6 h-[500px] flex flex-col" glow={currentAnalysisState.value === 'scanning'}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-[var(--color-cyber-purple)]" size={20} />
              Agentic Pipeline
            </div>
            {currentAnalysisState.value === 'scanning' && (
              <span className="text-xs font-mono text-[var(--color-cyber-blue)] animate-pulse">ACTIVE</span>
            )}
          </h2>
          
          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-cyber-blue)] to-[var(--color-cyber-purple)] transition-all duration-300 ease-out"
              style={{ width: `${currentAnalysisProgress.value}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]"></div>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <TerminalLogs 
              logs={analysisLogs.value} 
              isAnalyzing={currentAnalysisState.value === 'scanning'} 
            />
          </div>
        </GlassCard>
      </div>

      {/* Results Panel */}
      <AnimatePresence>
        {currentAnalysisState.value === 'complete' && analysisResults.value && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Overview */}
            <GlassCard className="p-6 border-[var(--color-cyber-danger)]/30">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2">Threat Assessment</h3>
              <div className="flex flex-col items-center justify-center py-4">
                <RiskMeter score={analysisResults.value.overallScore} className="scale-125 mb-4" />
                <ThreatBadge level={analysisResults.value.severity} className="mt-4 px-4 py-1.5 text-sm" />
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-slate-400">Detected Techniques:</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.value.detectedTechniques.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono">{tech}</span>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Radar */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">Manipulation Radar</h3>
              <div className="h-[300px] -mx-4 mt-4">
                <RadarChart data={analysisResults.value.radarData} />
              </div>
            </GlassCard>

            {/* Explainability */}
            <GlassCard className="p-6 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Explainability</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                {analysisResults.value.highlights.map((hl, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={14} className={hl.type === 'fear' ? 'text-red-400' : 'text-orange-400'} />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{hl.type} tactic</span>
                    </div>
                    <p className="text-slate-300 italic mb-3 border-l-2 border-slate-600 pl-3">"{hl.text}"</p>
                    <p className="text-sm text-[var(--color-cyber-blue)] flex items-start gap-2 bg-slate-900/80 p-3 rounded">
                      <ChevronRight size={16} className="shrink-0 mt-0.5" />
                      {hl.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
