import { m } from 'framer-motion';
import { Database, Box, Zap, Trash2, Scissors } from 'lucide-react';

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

const Particle = ({ delay, x }: { delay: number; x: number }) => (
  <m.div
    className="absolute w-1.5 h-1.5 rounded-full bg-red-500/60"
    style={{ left: `${x}%` }}
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: [-10, -40],
      opacity: [0, 1, 0],
      scale: [1, 0.5]
    }}
    transition={{
      duration: 1.2,
      delay,
      repeat: Infinity,
      ease: "easeOut" as const
    }}
  />
);

export function Layer3Left() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-12 relative overflow-hidden flex flex-col justify-center items-center font-body">
      <div className="absolute w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
      
      <m.div
        className="flex flex-col items-center relative z-10 w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={itemVariants} className="w-full text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[var(--color-green-light)] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
            <Scissors className="w-3 h-3" />
            Layer 03 // Optimization
          </div>
          <div className="font-display text-4xl mt-1 uppercase text-white tracking-tighter">
            FINE-TUNE <span className="foil-text italic">& PRUNE</span>
          </div>
        </m.div>
        
        <div className="flex items-center justify-center gap-6 relative w-full">
          <m.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:border-[var(--color-green-light)]/30 transition-colors duration-300">
              <Database className="w-8 h-8 text-[var(--color-green-light)]" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Your Data</span>
          </m.div>

          <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden max-w-[80px]">
            <m.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-green-light)] to-transparent opacity-50"
            />
          </div>

          <m.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="relative p-5 h-28 w-28 border-2 border-[var(--color-green-light)]/40 rounded-3xl bg-gradient-to-b from-[var(--color-green-dark)]/10 to-transparent shadow-[0_0_40px_rgba(74,171,109,0.2)] flex flex-col items-center justify-center cursor-pointer group hover:border-[var(--color-green-light)]/60 transition-all duration-300"
          >
            <Box className="w-9 h-9 text-[var(--color-green-light)] mb-1.5" strokeWidth={1.5} />
            <span className="text-[11px] font-bold text-white tracking-widest">GLM-5</span>
            
            <Particle delay={0} x={20} />
            <Particle delay={0.4} x={50} />
            <Particle delay={0.8} x={80} />
            
            <m.div 
              className="absolute -top-1 -right-1"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500/70" />
            </m.div>
          </m.div>

          <div className="flex-1 h-[2px] bg-white/5 relative overflow-hidden max-w-[80px]">
            <m.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-green-light)] to-transparent opacity-50"
            />
          </div>

          <m.div variants={itemVariants} className="flex flex-col gap-2">
            {[
              { icon: Zap, label: 'Speed +40%', color: 'text-yellow-500' },
              { icon: Box, label: 'Size -60%', color: 'text-[var(--color-green-light)]' }
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300">
                <stat.icon className={`w-3 h-3 ${stat.color}`} />
                <span className="text-[10px] font-bold text-white/70 tracking-tight uppercase">{stat.label}</span>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>
    </div>
  );
}

export function Layer3Right() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-24 relative overflow-hidden flex flex-col justify-center font-body">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-green-light)] opacity-[0.02] blur-[150px] rounded-bl-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display font-bold text-[48px] tracking-tight leading-[1.05] text-white m-0 mb-8">
          Fine-tune it on your data.<br/>
          <span className="text-white/30 italic">Remove what you don't need.</span>
        </h2>
      </m.div>
      
      <m.p
        className="font-body text-[18px] leading-[1.7] text-white/50 font-light tracking-wide m-0 max-w-md"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        We rigorously adapt the model to understand your unique business context, while simultaneously <span className="text-[var(--color-green-light)] font-medium">pruning away billions</span> of parameters of unneeded generalized knowledge to maximize speed and reduce cost.
      </m.p>

      <m.div
        className="mt-10 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <span className="text-[11px] font-bold tracking-widest uppercase text-yellow-500">+40% Faster</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[var(--color-green-dark)]/20 border border-[var(--color-green-light)]/20">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-green-light)]">-60% Smaller</span>
        </div>
      </m.div>
    </div>
  );
}
