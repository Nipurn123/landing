import { m } from 'framer-motion';
import { Database, FileText, Lock, Globe } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const coreVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.6 }
  }
};

const DataParticle = ({ delay, pathId }: { delay: number; pathId: string }) => (
  <m.circle
    r="4"
    fill="var(--color-green-light)"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      offsetDistance: [0, 0.5, 0.5, 1]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{ offsetPath: `url(#${pathId})` }}
    filter="drop-shadow(0 0 6px var(--color-green-light))"
  />
);

export function Layer1Left() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#050505] overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
      
      <m.div
        className="relative z-10 w-full max-w-lg flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div className="mb-12 flex flex-col items-center" variants={itemVariants}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[var(--color-green-light)] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 shadow-2xl backdrop-blur-md">
            Layer 01 // Ingestion
          </div>
          <h3 className="font-display text-white text-4xl md:text-5xl tracking-tight leading-none text-center">
            THE DATA <span className="foil-text italic">HARVEST</span>
          </h3>
        </m.div>

        <div className="relative w-full h-[350px] flex flex-col items-center">
          <m.div
            className="flex justify-between w-[85%] z-20 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[Globe, FileText, Database].map((Icon, i) => (
              <m.div
                key={i}
                variants={nodeVariants}
                className="bg-[#080808] p-4 rounded-2xl border border-white/5 shadow-2xl transition-all hover:scale-110 hover:border-[var(--color-green-light)]/30 hover:shadow-[0_0_30px_rgba(74,171,109,0.2)] duration-500 cursor-pointer"
              >
                <Icon className={`w-10 h-10 ${i === 1 ? 'text-[var(--color-green-light)]' : 'text-white/40'}`} />
              </m.div>
            ))}
          </m.div>

          <div className="absolute top-[80px] left-0 w-full h-[120px] z-10">
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <path id="pathLeft" d="M 15% 0 Q 15% 80 50% 80" fill="none" />
                <path id="pathCenter" d="M 50% 0 L 50% 80" fill="none" />
                <path id="pathRight" d="M 85% 0 Q 85% 80 50% 80" fill="none" />
                <path id="pathDown" d="M 50% 80 L 50% 120" fill="none" />
              </defs>
              
              <path d="M 15% 0 Q 15% 80 50% 80" fill="none" stroke="var(--color-green-dark)" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M 50% 0 L 50% 80" fill="none" stroke="var(--color-green-light)" strokeWidth="2" strokeOpacity="0.5" className="path-flow" />
              <path d="M 85% 0 Q 85% 80 50% 80" fill="none" stroke="var(--color-green-dark)" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M 50% 80 L 50% 120" fill="none" stroke="var(--color-green-light)" strokeWidth="2" strokeOpacity="0.5" className="path-flow" />
              
              <DataParticle delay={0} pathId="pathLeft" />
              <DataParticle delay={0.7} pathId="pathLeft" />
              <DataParticle delay={0.3} pathId="pathCenter" />
              <DataParticle delay={1} pathId="pathCenter" />
              <DataParticle delay={0.5} pathId="pathRight" />
              <DataParticle delay={1.2} pathId="pathRight" />
              <DataParticle delay={0.2} pathId="pathDown" />
              <DataParticle delay={0.9} pathId="pathDown" />
            </svg>
          </div>

          <m.div
            className="absolute top-[200px] left-[50%] -translate-x-[50%] z-30"
            variants={coreVariants}
          >
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] border-2 border-[var(--color-green-light)]/40 flex items-center justify-center shadow-[0_0_50px_rgba(74,171,109,0.25)] group hover:border-[var(--color-green-light)] transition-all duration-500 cursor-pointer hover:shadow-[0_0_70px_rgba(74,171,109,0.4)]">
              <m.div
                className="absolute inset-[-4px] rounded-3xl border border-[var(--color-green-light)]/30"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <m.div
                className="absolute inset-[-8px] rounded-3xl border border-[var(--color-green-light)]/15"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.15, 0.3, 0.15]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              <Lock className="w-10 h-10 text-[var(--color-green-light)] relative z-10" />
            </div>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}

export function Layer1Right() {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-20 relative overflow-hidden flex flex-col justify-center font-body">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-green-light)] opacity-[0.03] blur-[120px] rounded-bl-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display font-bold text-[48px] tracking-tight leading-[1.05] text-white m-0 mb-8">
          We don't move your data. <br/>
          <span className="text-white/30 italic">We surround it.</span>
        </h2>
      </m.div>
      
      <m.p
        className="font-body text-[20px] leading-[1.7] text-white/50 font-light tracking-wide m-0 max-w-md"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Traditional AI forces you to upload your crown jewels to a public cloud. The 100X Engine operates in reverse. We deploy our ingestion nodes directly into your sovereign environment, ensuring <span className="text-[var(--color-green-light)] font-medium">zero data egress</span>.
      </m.p>

      <m.div
        className="mt-10 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-green-dark)]/20 border border-[var(--color-green-light)]/20">
          <div className="w-2 h-2 rounded-full bg-[var(--color-green-light)] animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-green-light)]">Zero Egress</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Sovereign First</span>
        </div>
      </m.div>
    </div>
  );
}
