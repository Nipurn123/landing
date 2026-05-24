import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const TypewriterText = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <span>{displayText}</span>;
};

export function Layer4Left() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-12 relative overflow-hidden flex flex-col justify-center items-center font-body">
      <div className="absolute w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
      
      <m.div
        className="flex flex-col items-center w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={itemVariants} className="w-full text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[var(--color-green-light)] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
            <Terminal className="w-3 h-3" />
            Layer 04 // Control
          </div>
          <div className="font-display text-4xl mt-1 uppercase text-white tracking-tighter">
            AGENTIC <span className="foil-text italic">CLI</span>
          </div>
        </m.div>
        
        <m.div 
          variants={itemVariants}
          className="bg-[#0c0c0c] border border-white/10 rounded-2xl w-full max-w-[420px] overflow-hidden shadow-2xl relative hover:border-white/20 transition-colors duration-300"
        >
          <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-4 py-3 flex gap-2 items-center border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/60 hover:bg-green-500 transition-colors" />
            <span className="ml-3 text-[10px] uppercase tracking-widest text-white/30 font-bold">100x-shell - zsh</span>
          </div>
          
          <div className="p-6 font-mono text-[13px] bg-[#080808] text-[var(--color-green-light)] leading-relaxed">
            <div className="flex gap-3 mb-3">
              <span className="text-[var(--color-green-light)]">→</span>
              <span className="text-white/90 font-medium">
                <TypewriterText text="100x auth login" delay={500} speed={60} />
              </span>
            </div>
            
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-white/40 mb-5 ml-6 text-[12px]"
            >
              ✓ Success. Logged in as sovereign-admin.
            </m.div>
            
            <div className="flex gap-3 mb-3">
              <span className="text-[var(--color-green-light)]">→</span>
              <span className="text-white/90 font-medium">
                <TypewriterText text="deploy -m refined-v1" delay={2500} speed={50} />
              </span>
            </div>
            
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="flex items-center gap-3 ml-6 mt-2"
            >
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <m.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 4.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[var(--color-green-dark)] to-[var(--color-green-light)]" 
                />
              </div>
            </m.div>
            
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="text-[11px] text-[var(--color-green-light)] mt-2 ml-6"
            >
              Pushing weights...
            </m.div>
            
            <m.div 
              className="w-2 h-4 bg-[var(--color-green-light)] mt-5 ml-6"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-green-light)]/40 to-transparent shadow-[0_0_20px_rgba(74,171,109,0.3)]" />
        </m.div>
      </m.div>
    </div>
  );
}

export function Layer4Right() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-24 relative overflow-hidden flex flex-col justify-center font-body">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-green-light)] opacity-[0.02] blur-[150px] rounded-bl-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display font-bold text-[48px] tracking-tight leading-[1.05] text-white m-0 mb-8">
          Deploy via our<br/>
          <span className="text-[var(--color-green-light)]">Agentic CLI.</span>
        </h2>
      </m.div>
      
      <m.p
        className="font-body text-[18px] leading-[1.7] text-white/50 font-light tracking-wide m-0 max-w-md"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Push seamlessly to production using our developer-friendly tools. Manage entire lifecycles, run evaluations, and deploy highly refined models with a <span className="text-white font-medium">single, intuitive command</span>.
      </m.p>

      <m.div
        className="mt-10 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Dev-First</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">CI/CD Ready</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[var(--color-green-dark)]/20 border border-[var(--color-green-light)]/20">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-green-light)]">One Command</span>
        </div>
      </m.div>
    </div>
  );
}
