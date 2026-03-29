import { m } from 'framer-motion';
import Logo from '../../icons/Logo';

const MeshGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.15] blur-[120px] rounded-full" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 opacity-[0.1] blur-[100px] rounded-full" />
    <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-teal-700 opacity-[0.08] blur-[80px] rounded-full" />
  </div>
);

export function CoverFront() {
  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
      {/* Background Image - The provided 3D cover */}
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet="/images/cover.webp" type="image/webp" />
        <img 
          src="/images/cover.jpg" 
          alt="100xprompt Cover" 
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </picture>
      
      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4aab6d]/40 to-transparent z-10" />
      
      {/* Scroll Indicator (Mini) */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#4aab6d]" />
      </m.div>
    </div>
  );
}

export function CoverBack() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center border-l border-white/5">
      <MeshGradient />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 rounded-2xl border-2 border-white/10 flex items-center justify-center bg-white/[0.02]"
        >
          <Logo 
            width={120} 
            height={120} 
            className="opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </m.div>
        
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-white/20 text-xs tracking-widest uppercase font-bold"
        >
          100XPrompt
        </m.div>
      </div>

      {/* Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
}
