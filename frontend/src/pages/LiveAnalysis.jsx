import { useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { UploadCloud, Search, ShieldAlert, Cpu, ChevronRight, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../shared/components/GlassCard';
import { TerminalLogs } from '../shared/components/TerminalLogs';
import { ThreatBadge } from '../shared/components/ThreatBadge';
import { RadarChart } from '../shared/components/RadarChart';
import { RiskMeter } from '../shared/components/RiskMeter';
import { ScanningCore3D } from '../shared/components/ScanningCore3D';
import { FactCheckHologram } from '../shared/components/FactCheckHologram';
import { EmotionFace3D } from '../shared/components/EmotionFace3D';
import { currentAnalysisState, currentAnalysisProgress, analysisLogs, analysisResults, factCheckResults } from '../state/appState';
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
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Live Content Analysis</h1>
        <p className="text-[#00e5ff] mt-2 tracking-wide text-sm font-medium">NEURAL THREAT DETECTION ENGINE v2.0</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <GlassCard className="p-6 flex flex-col h-[550px]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2 bg-[#00e5ff]/10 rounded-lg">
              <Cpu className="text-[#00e5ff]" size={20} />
            </div>
            Data Intake Node
          </h2>
          <div className="flex-1 flex flex-col gap-4">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious text payload here... (e.g. 'URGENT: Your account will be deleted in 24 hours if you do not click this link!')"
              className="flex-1 w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl p-5 text-slate-200 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] focus:shadow-[0_0_20px_rgba(0,229,255,0.1)] resize-none transition-all placeholder:text-slate-600 font-mono text-sm leading-relaxed"
              disabled={currentAnalysisState.value === 'scanning'}
            />
            <div className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-[#00e5ff]/50 hover:bg-[#00e5ff]/5 transition-all cursor-pointer">
              <UploadCloud size={24} className="mb-2" />
              <span className="text-sm font-medium tracking-wide">Secure File Upload</span>
            </div>
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={currentAnalysisState.value === 'scanning' || !inputText.trim()}
            className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#06b6d4] text-[#05050A] font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {currentAnalysisState.value === 'scanning' ? (
              <>
                <div className="w-5 h-5 border-2 border-[#05050A] border-t-transparent rounded-full animate-spin"></div>
                Analyzing Payload...
              </>
            ) : (
              <>
                <Search size={20} />
                Initialize Scan
              </>
            )}
          </button>
        </GlassCard>

        {/* Pipeline & Logs Panel */}
        <GlassCard className="p-6 h-[550px] flex flex-col" glow={currentAnalysisState.value === 'scanning'}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#b000ff]/10 rounded-lg">
                <ShieldAlert className="text-[#b000ff]" size={20} />
              </div>
              Agentic Pipeline
            </div>
            {currentAnalysisState.value === 'scanning' && (
              <span className="text-xs font-bold font-mono text-[#00e5ff] animate-pulse-glow tracking-widest border border-[#00e5ff]/30 px-3 py-1 rounded-full bg-[#00e5ff]/10">ACTIVE</span>
            )}
          </h2>
          
          {/* 3D Core Visualization */}
          <div className="h-48 mb-6">
            <ScanningCore3D isScanning={currentAnalysisState.value === 'scanning'} />
          </div>

          <div className="flex-1 min-h-0 border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0f]">
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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4"
          >
            {/* Overview */}
            <GlassCard className="p-6 border-[#ff003c]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff003c]/5 to-transparent pointer-events-none" />
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
                <AlertTriangle className="text-[#ff003c]" size={18} />
                Threat Assessment
              </h3>
              <div className="flex flex-col items-center justify-center py-4">
                <RiskMeter score={analysisResults.value.overallScore} className="scale-125 mb-6" />
                <ThreatBadge level={analysisResults.value.severity} className="mt-4 px-6 py-2 text-sm font-bold tracking-widest shadow-[0_0_20px_rgba(255,0,60,0.2)]" />
              </div>
              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Detected Vectors</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.value.detectedTechniques.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#ff003c]/10 border border-[#ff003c]/30 rounded-md text-[#ff003c] text-xs font-mono font-bold tracking-wide">{tech}</span>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Fact Check Consensus */}
            <GlassCard className="p-6 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
                <CheckCircle className="text-[#00e5ff]" size={18} />
                Fact Check Consensus
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <FactCheckHologram 
                    ratingText={
                      factCheckResults.value && factCheckResults.value.length > 0 
                        ? factCheckResults.value[0].claimReview[0].textualRating 
                        : "Unknown"
                    } 
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                  {factCheckResults.value && factCheckResults.value.length > 0 ? (
                    factCheckResults.value.slice(0, 2).map((claim, idx) => (
                      <div key={idx} className="bg-[#0f0f15]/80 p-3 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-400 mb-1">Claim by {claim.claimant || 'Unknown'}</p>
                        <p className="text-sm text-slate-200 mb-2 font-medium">"{claim.text}"</p>
                        <div className="inline-block px-2 py-1 bg-white/5 rounded text-xs font-bold tracking-widest uppercase text-[#00e5ff]">
                          Rating: {claim.claimReview[0].textualRating}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <p className="text-sm">No verified claims found for this payload.</p>
                      <p className="text-xs mt-2 opacity-50">API returned 0 results.</p>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Cognitive Emotion Profiler (NEW) */}
            <GlassCard className="p-6 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
                <Activity className="text-[#b000ff]" size={18} />
                Cognitive Emotion Profiler
              </h3>
              <EmotionFace3D 
                isAnalyzing={currentAnalysisState.value === 'scanning'} 
                detectedEmotions={analysisResults.value.detectedTechniques} 
              />
            </GlassCard>

            {/* Radar */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-3">Manipulation Radar</h3>
              <div className="h-[300px] -mx-4 mt-4">
                <RadarChart data={analysisResults.value.radarData} />
              </div>
            </GlassCard>

            {/* Explainability - Full Width */}
            <GlassCard className="p-6 flex flex-col lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3">Explainability</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide max-h-[300px]">
                {analysisResults.value.highlights.map((hl, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-5 rounded-xl bg-[#0f0f15]/80 border border-white/5 hover:border-[#00e5ff]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${hl.type === 'fear' ? 'bg-[#ff003c] shadow-[0_0_10px_#ff003c]' : 'bg-[#ff8c00] shadow-[0_0_10px_#ff8c00]'}`} />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{hl.type} tactic</span>
                    </div>
                    <p className="text-slate-300 font-mono text-sm mb-4 border-l-2 border-[#00e5ff]/50 pl-4 py-1 bg-gradient-to-r from-[#00e5ff]/5 to-transparent">"{hl.text}"</p>
                    <p className="text-sm text-[#00e5ff] flex items-start gap-2 bg-[#0a0a0f] p-3 rounded-lg border border-[#00e5ff]/10 font-medium">
                      <ChevronRight size={16} className="shrink-0 mt-0.5" />
                      {hl.explanation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
