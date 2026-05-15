import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TerminalLogs({ logs = [], isAnalyzing = false }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden flex flex-col h-full shadow-inner relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-cyber-blue)] to-transparent opacity-20"></div>
      
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        </div>
        <span className="text-slate-500 ml-2">system_logs_tty1</span>
        {isAnalyzing && (
          <span className="ml-auto text-[var(--color-cyber-blue)] animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-cyber-blue)]"></span>
            ACTIVE
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1.5">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span className={`
                ${log.type === 'error' ? 'text-[var(--color-cyber-danger)]' : ''}
                ${log.type === 'warning' ? 'text-[var(--color-cyber-warning)]' : ''}
                ${log.type === 'success' ? 'text-[var(--color-cyber-success)]' : ''}
                ${!log.type ? 'text-slate-300' : ''}
              `}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-[var(--color-cyber-blue)] flex gap-2"
          >
            <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
            <span className="w-2.5 h-4 bg-[var(--color-cyber-blue)] inline-block animate-pulse"></span>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
