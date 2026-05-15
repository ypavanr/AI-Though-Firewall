import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export function GlassCard({ children, className, glow = false, delay = 0, onClick }) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={cn(
        "glass-panel rounded-xl overflow-hidden relative",
        glow && "neon-border shadow-[0_0_15px_rgba(0,240,255,0.15)]",
        onClick && "cursor-pointer hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Glossy top reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      {children}
    </Component>
  );
}
