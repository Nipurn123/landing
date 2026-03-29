import { m } from 'framer-motion';
import { CheckCircle2, Box, Cpu, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const models = [
  { name: 'GLM-5', icon: Box, selected: true, subtitle: 'General' },
  { name: 'Qwen3', icon: Cpu, selected: false, subtitle: 'Multilingual' },
  { name: 'DeepSeek', icon: null, selected: false, subtitle: 'Code', letter: 'D' },
  { name: 'LLaMA 4', icon: Box, selected: false, subtitle: 'Reasoning' },
  { name: 'Mistral', icon: Box, selected: false, subtitle: 'Efficient' },
];

export function Layer2Left() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white p-12 relative overflow-hidden flex flex-col justify-center items-center font-body">
      <div className="absolute w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.08] blur-[100px] rounded-full point-events-none" />
      
      <m.div
        className="flex flex-col items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div className="mb-10 flex flex-col items-center" variants={cardVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[var(--color-green-light)] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            Layer 02 // Selection
          </div>
          <div className="font-display text-xl font-bold uppercase text-white tracking-widest">
            MODEL <span className="text-[var(--color-green-light)]">SELECTION</span>
          </div>
        </m.div>
        
        <div className="flex justify-center gap-3">
          {models.map((model) => (
            <m.div
              key={model.name}
              variants={cardVariants}
              className={`
                relative p-3 h-[100px] rounded-xl flex flex-col items-center justify-center w-[88px] cursor-pointer
                transition-all duration-300 group
                ${model.selected 
                  ? 'border-2 border-[var(--color-green-light)] bg-gradient-to-b from-[var(--color-green-dark)]/20 to-transparent shadow-[0_0_40px_rgba(74,171,109,0.3)]' 
                  : 'border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-lg'
                }
              `}
              whileHover={!model.selected ? { y: -4, scale: 1.02 } : {}}
            >
              {model.selected && (
                <m.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 15 }}
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--color-green-light)] flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                </m.div>
              )}
              
              {model.icon ? (
                <model.icon 
                  className={`w-8 h-8 mb-2 transition-colors duration-300 ${
                    model.selected ? 'text-[var(--color-green-light)]' : 'text-white/40 group-hover:text-white/60'
                  }`} 
                  strokeWidth={1.5} 
                />
              ) : (
                <div className={`w-8 h-8 mb-2 flex items-center justify-center font-bold border rounded-lg transition-all duration-300 ${
                  model.selected 
                    ? 'text-[var(--color-green-light)] border-[var(--color-green-light)]/40 bg-[var(--color-green-dark)]/20' 
                    : 'text-white/40 border-white/20 group-hover:text-white/60 group-hover:border-white/30'
                }`}>
                  {model.letter}
                </div>
              )}
              
              <span className={`text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                model.selected ? 'text-white' : 'text-white/50 group-hover:text-white/70'
              }`}>
                {model.name}
              </span>
              
              <span className={`text-[9px] tracking-wide mt-0.5 transition-colors duration-300 ${
                model.selected ? 'text-[var(--color-green-light)]/70' : 'text-white/30 group-hover:text-white/40'
              }`}>
                {model.subtitle}
              </span>
            </m.div>
          ))}
        </div>
        
        <m.div
          className="mt-8 flex items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase"
          variants={cardVariants}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] animate-pulse" />
          Auto-selected based on your use case
        </m.div>
      </m.div>
    </div>
  );
}

export function Layer2Right() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white p-16 relative overflow-hidden flex flex-col justify-center font-body">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-green-light)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-display font-bold text-[36px] tracking-tight leading-[1.1] text-white m-0 mb-6">
          We pick the best<br/>
          <span className="text-[var(--color-green-light)]">open-source</span> model.
        </h2>
      </m.div>
      
      <m.p
        className="font-body text-[18px] leading-[1.7] text-white/50 font-light tracking-wide m-0 max-w-md"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Whether it's <span className="text-white font-medium">GLM-5</span> for general versatility or specialized architectures like <span className="text-white font-medium">DeepSeek Coder</span>, we automatically match the optimal foundation model to your specific use case. No vendor lock-in, just pure performance.
      </m.p>

      <m.div
        className="mt-10 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">No Vendor Lock-in</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">Open Weights</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[var(--color-green-dark)]/20 border border-[var(--color-green-light)]/20">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-green-light)]">Auto-Match</span>
        </div>
      </m.div>
    </div>
  );
}
