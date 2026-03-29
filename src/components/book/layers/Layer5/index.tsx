import { m } from 'framer-motion';
import { Server, Cloud, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function Layer5Left() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-12 relative overflow-hidden flex flex-col justify-center items-center font-body">
      <div className="absolute w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
      
      <m.div
        className="flex flex-col items-center relative z-10 w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={itemVariants} className="w-full text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[var(--color-green-light)] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            Layer 05 // Infrastructure
          </div>
          <div className="font-display text-4xl mt-1 uppercase text-white tracking-tighter">
            SOVEREIGN <span className="foil-text italic">DEPLOYMENT</span>
          </div>
        </m.div>
        
        <div className="flex justify-center items-center gap-8 w-full px-4">
          <m.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex flex-col items-center gap-4 relative group cursor-pointer"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-green-dark)] border border-[var(--color-green-light)]/30 text-[9px] font-bold tracking-widest uppercase text-[var(--color-green-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Recommended
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[var(--color-green-dark)]/20 to-transparent border-2 border-[var(--color-green-light)]/40 shadow-[0_0_40px_rgba(74,171,109,0.2)] group-hover:border-[var(--color-green-light)]/60 group-hover:shadow-[0_0_60px_rgba(74,171,109,0.3)] transition-all duration-300">
              <Server className="w-12 h-12 text-[var(--color-green-light)]" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold text-white/70 tracking-widest uppercase">Private GPUs</span>
          </m.div>
          
          <div className="flex flex-col items-center gap-2">
            <m.div 
              className="w-[60px] h-[2px] bg-gradient-to-r from-[var(--color-green-light)]/20 via-[var(--color-green-light)]/50 to-[var(--color-green-light)]/20 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <m.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </m.div>
            <ArrowRight className="w-4 h-4 text-[var(--color-green-light)]/40" />
          </div>
          
          <m.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex flex-col items-center gap-4 relative group cursor-pointer"
          >
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group-hover:border-white/20 group-hover:bg-white/[0.07] transition-all duration-300">
              <Cloud className="w-12 h-12 text-white/50 group-hover:text-white/70 transition-colors" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold text-white/50 tracking-widest uppercase group-hover:text-white/70 transition-colors">Secure Cloud</span>
          </m.div>
        </div>

        <m.div 
          variants={itemVariants}
          className="mt-12 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--color-green-dark)]/20 to-transparent border border-[var(--color-green-light)]/20 flex items-center gap-3"
        >
          <m.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ShieldCheck className="w-5 h-5 text-[var(--color-green-light)]" />
          </m.div>
          <span className="text-[11px] font-bold text-[var(--color-green-light)] uppercase tracking-[0.15em]">Zero-Trust architecture active</span>
        </m.div>
      </m.div>
    </div>
  );
}

export function Layer5Right() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-24 relative overflow-hidden flex flex-col justify-center font-body">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-green-light)] opacity-[0.02] blur-[150px] rounded-bl-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display font-bold text-[48px] tracking-tight leading-[1.05] text-white m-0 mb-8">
          On your infra<br/>
          <span className="text-[var(--color-green-light)]">or ours.</span>
        </h2>
      </m.div>
      
      <m.p
        className="font-body text-[18px] leading-[1.7] text-white/50 font-light tracking-wide m-0 max-w-md"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Run your proprietary models exactly where you need them. Whether it's securely deployed to your own <span className="text-white font-medium">private GPUs</span> or scaled horizontally on our enterprise-grade cloud, <span className="text-[var(--color-green-light)] font-medium">sovereignty is guaranteed</span>.
      </m.p>

      <m.div
        className="mt-10 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Your VPC</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Hybrid</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[var(--color-green-dark)]/20 border border-[var(--color-green-light)]/20">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-green-light)]">100X Cloud</span>
        </div>
      </m.div>
    </div>
  );
}
