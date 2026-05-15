import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export function ThreatBadge({ level, label, className }) {
  const configs = {
    critical: {
      color: "bg-red-500/10 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      icon: ShieldAlert
    },
    high: {
      color: "bg-orange-500/10 text-orange-400 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
      icon: AlertTriangle
    },
    medium: {
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/50",
      icon: Info
    },
    low: {
      color: "bg-green-500/10 text-green-400 border-green-500/50",
      icon: CheckCircle2
    }
  };

  const config = configs[level] || configs.low;
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold tracking-wide uppercase", config.color, className)}>
      <Icon size={14} />
      <span>{label || level}</span>
    </div>
  );
}
