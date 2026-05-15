import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export function GlassCard({ children, className, glow = false, delay = 0, onClick }) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay 
      }}
      whileHover={{ 
        y: -5,
        scale: 1.01,
        boxShadow: "0 20px 40px -10px rgba(0, 229, 255, 0.15)"
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "glass-panel rounded-2xl overflow-hidden relative border border-white/5",
        glow && "neon-border shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-[#10101a]/70",
        onClick && "cursor-pointer transition-colors duration-300",
        className
      )}
    >
      {/* Glossy top reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      {/* Corner glow if glowing */}
      {glow && (
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-cyber-blue)] rounded-full blur-[40px] opacity-30 pointer-events-none" />
      )}
      {children}
    </Component>
  );
}
