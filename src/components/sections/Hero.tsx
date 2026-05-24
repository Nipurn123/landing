import { m, MotionValue } from 'framer-motion';
import LazyVideo from '../ui/LazyVideo';

interface HeroProps {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  onLoginClick?: () => void;
  onDocsClick?: () => void;
}

export default function Hero({ heroY, heroOpacity, onLoginClick, onDocsClick }: HeroProps) {
  return (
    <main className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full flex-grow flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <m.div
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[45%]"
      >
        <div className="text-[10px] md:text-[11px] font-semibold text-[hsl(var(--color-text-muted))] tracking-[0.25em] mb-10 flex items-center gap-2 uppercase">
          FOR ENTERPRISE | GOVERNMENT | DEVELOPERS
        </div>
        
        <h1 className="text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-8 font-normal" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          The full-stack <br/>
          <span className="text-[hsl(var(--color-primary))]">sovereign AI platform</span>
        </h1>
        <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] text-[hsl(var(--color-text-secondary))] mb-12 max-w-xl font-body">
          Your CLI. Your models. Your infrastructure. <br/>
          <span className="text-[hsl(var(--color-primary))] font-medium">Nothing leaves the building.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button 
            onClick={onLoginClick}
            className="flex items-center justify-center gap-3 bg-[hsl(var(--color-text-primary))] text-[hsl(var(--color-background))] px-8 py-4 rounded hover:bg-[hsl(220_20%_20%)] shadow-lg shadow-[hsl(var(--color-text-primary)/0.2)] hover:-translate-y-0.5 transition-all font-body text-[13px] font-bold uppercase tracking-widest group w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))] focus-visible:ring-offset-2">
            Start Building 
            <span className="bg-white/20 text-white px-2 py-0.5 rounded font-mono text-[10px] transition-colors ml-1">P</span>
          </button>
          <button 
            onClick={onDocsClick}
            className="flex items-center justify-center gap-2 bg-transparent text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text-primary))] px-8 py-4 rounded hover:bg-[hsl(var(--color-surface-hover))] transition-all font-body text-[13px] font-bold uppercase tracking-widest w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-border))]">
            Read Docs
            <svg className="w-4 h-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </m.div>

      {/* Right side: Hero Video with high-performance animation */}
      <m.div
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-[55%] flex items-center justify-center lg:justify-end"
      >
        <div className="relative w-full group">
          <div className="absolute inset-0 bg-[#4aab6d] opacity-5 blur-[80px] rounded-full -z-10 animate-pulse" />
          <LazyVideo 
            src="/assets/hero-video.mp4" 
            priority={true}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto rounded-3xl shadow-2xl shadow-green-900/10 transition-transform duration-700 hover:scale-[1.02]"
          />
          {/* Glossy overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#4aab6d]/5 to-transparent pointer-events-none" />
        </div>
      </m.div>
    </main>
  );
}
