import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Terminal } from 'lucide-react';

interface BaseTerminalProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  headerColor?: string;
}

export default function BaseTerminal({ 
  title, 
  icon: Icon = Terminal, 
  children, 
  gradient = "from-emerald-500/10 via-transparent to-blue-500/10",
  className = "",
  headerColor = "bg-[#141414]"
}: BaseTerminalProps) {
  return (
    <div className={`relative group w-full ${className}`}>
      {/* Background Glow */}
      <div className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000`} />
      
      <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0a0a0a] shadow-2xl">
        {/* Title Bar */}
        <div className={`flex items-center justify-between px-4 py-2 ${headerColor} border-b border-white/5`}>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
            <Icon className="w-2.5 h-2.5" />
            {title}
          </div>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 font-mono text-[12px] leading-relaxed text-[#d1d1d1]">
          {children}
        </div>
      </div>
    </div>
  );
}
