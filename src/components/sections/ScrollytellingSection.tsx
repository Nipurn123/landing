import { useRef, useState, useEffect, useMemo } from "react";
import type { RefObject } from "react";

const GREEN = "#4aab6d";
const GREEN_RGB = "74,171,109";
const DARK = "#111827";

interface Layer {
  title: string;
  subtitle: string;
  description: string;
  cardGradient: [string, string];
}

const LAYERS: Layer[] = [
  {
    title: "100X Code",
    subtitle: "Layer 1 - Software",
    description: "Sovereign AI software & CLI. Accelerate training, fine-tuning and inference within your secure perimeter.",
    cardGradient: ["#FFFFFF", "#F0F2F5"],
  },
  {
    title: "The Brain",
    subtitle: "Layer 2 - LLM",
    description: "LLM orchestration. Self-hosted. Your models. Fine-tuned on your proprietary data, optimized for your domain.",
    cardGradient: ["#B8C8E0", "#9FB2D1"],
  },
  {
    title: "The Servers",
    subtitle: "Layer 3 - Infrastructure",
    description: "GPU deployment. Private infra. Your compute. End-to-end compute orchestration tailored for enterprise scale.",
    cardGradient: ["#D4A574", "#C08A58"],
  },
];

function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    let rafId: number;
    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const total = el.scrollHeight - window.innerHeight;
          setProgress(Math.max(0, Math.min(1, -rect.top / total)));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
  return progress;
}

function clamp(v: number, min = 0, max = 1): number { return Math.max(min, Math.min(max, v)); }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }

function useWindowSize() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return width;
}

function GlassStack({ progress, activeIndex }: { progress: number; activeIndex: number }) {
  const windowWidth = useWindowSize();
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isMobile = windowWidth < 768;
  
  const CONTAINER_SIZE = isMobile 
    ? Math.min(380, windowWidth * 0.9, windowHeight * 0.45)
    : Math.min(750, windowWidth * 0.85, windowHeight * 0.65);
  const CARD = isMobile 
    ? Math.min(220, CONTAINER_SIZE * 0.58) 
    : Math.min(340, CONTAINER_SIZE * 0.48);
  const GAP = isMobile ? 18 : Math.min(48, windowHeight * 0.055);
  const BORDER_R = isMobile ? 22 : Math.min(28, CARD * 0.08);
  const FONT_NUM = isMobile ? 26 : Math.min(88, CONTAINER_SIZE * 0.14);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative overflow-hidden"
        style={{
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
          borderRadius: BORDER_R,
          background: `linear-gradient(160deg, #A8C4B0 0%, #C8DDD0 100%)`,
          border: "1px solid rgba(180, 200, 190, 0.5)",
          boxShadow: `
            0 1px 0 0 rgba(255,255,255,0.7) inset,
            0 2px 4px rgba(0,0,0,0.02),
            0 8px 24px rgba(0,0,0,0.04),
            0 24px 48px rgba(0,0,0,0.06),
            0 0 0 1px rgba(168,196,176,0.3),
            0 0 60px rgba(74,171,109,0.05)
          `,
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }} />

        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
        }} />

        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
          <div className="relative" style={{ width: CARD, height: CARD, transform: isMobile ? "translateY(-4px)" : "translateY(-8px)" }}>
            {LAYERS.map((layer, i) => {
              const start = i / LAYERS.length;
              const p = clamp((progress - start + 0.1) / 0.14);
              const isActive = i === activeIndex;
              
              const settledY = i * GAP;
              const currentY = lerp(settledY + 400, settledY, p);

              return (
                <div
                  key={i}
                  className="absolute left-0 top-0"
                  style={{
                    width: CARD, height: CARD,
                    willChange: "transform, opacity",
                    opacity: clamp(p * 1.2),
                    transform: `translateY(${currentY}px) scale(${lerp(0.85, 1, clamp(p))})`,
                    zIndex: LAYERS.length - i,
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: CARD, height: CARD, borderRadius: isMobile ? 10 : 14,
                      background: isActive 
                        ? `linear-gradient(180deg, ${layer.cardGradient[0]} 0%, ${layer.cardGradient[1]} 100%)`
                        : `linear-gradient(180deg, ${layer.cardGradient[0]}E6 0%, ${layer.cardGradient[1]}E6 100%)`,
                      backdropFilter: "blur(20px) saturate(1.4)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                      border: `1.5px solid rgba(255, 255, 255, ${isActive ? 0.9 : 0.6})`,
                      boxShadow: isActive
                        ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 12px 32px rgba(0,0,0,0.08)"
                        : "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.04)",
                      transform: "rotateX(55deg) rotateZ(-45deg)",
                      transformStyle: "preserve-3d",
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-2 left-3 select-none" style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: isMobile ? 14 : FONT_NUM, lineHeight: 1, color: "rgba(74,171,109,0.25)",
        }}>
          {String(activeIndex + 1).padStart(2, "0")}
        </div>

        <div className="absolute top-2 left-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(15 85% 50%)" }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 7 : 9, fontWeight: 600,
            letterSpacing: "0.12em", color: "hsl(15 85% 50%)", textTransform: "uppercase",
          }}>Architecture</span>
        </div>
      </div>
    </div>
  );
}

function ProgressNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-1">
      {LAYERS.map((layer, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={i} className="relative flex items-center py-1.5">
            <div className="rounded-full transition-all duration-500" style={{
              width: isActive ? 3 : 2, height: isActive ? 26 : 12,
              background: isActive ? GREEN : "rgba(0,0,0,0.07)",
              boxShadow: isActive ? `0 0 8px rgba(${GREEN_RGB}, 0.2)` : "none",
            }} />
            <span className="absolute right-5 whitespace-nowrap pointer-events-none transition-all duration-300" style={{
              opacity: isActive ? 0.45 : 0,
              transform: isActive ? "translateX(0)" : "translateX(6px)",
              color: DARK, fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.04em", fontSize: 10, fontWeight: 500,
            }}>{layer.subtitle}</span>
          </div>
        );
      })}
    </div>
  );
}

function TextPanel({ layer, index, isActive, direction, onLoginClick, onContactClick }: { layer: Layer; index: number; isActive: boolean; direction: number; onLoginClick?: () => void; onContactClick?: () => void }) {
  const windowWidth = useWindowSize();
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isMobile = windowWidth < 768;
  
  const titleSize = isMobile 
    ? "clamp(22px, 5vw, 28px)" 
    : `clamp(48px, 5vw, ${Math.min(84, windowHeight * 0.1)}px)`;
  const descSize = isMobile 
    ? "clamp(13px, 2.8vw, 15px)" 
    : `clamp(18px, 1.5vw, ${Math.min(24, windowHeight * 0.03)}px)`;
  const isLast = index === LAYERS.length - 1;
  
  return (
    <div className="absolute inset-0 flex flex-col justify-center" style={{
      opacity: isActive ? 1 : 0,
      transform: isActive ? "translateY(0)" : `translateY(${direction > 0 ? 16 : -16}px)`,
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
      pointerEvents: isActive ? "auto" : "none",
    }}>
      <div className="inline-flex self-start items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6" style={{
        background: `rgba(${GREEN_RGB}, 0.06)`,
        border: `1px solid rgba(${GREEN_RGB}, 0.12)`,
      }}>
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full" style={{
          background: GREEN,
          boxShadow: `0 0 4px rgba(${GREEN_RGB}, 0.3)`,
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif", 
          fontSize: isMobile ? 9 : 14, 
          fontWeight: 600,
          letterSpacing: "0.1em", 
          color: GREEN, 
          textTransform: "uppercase",
        }}>
          {`Layer ${index + 1} / ${LAYERS.length}`}
        </span>
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", 
        fontSize: isMobile ? 10 : 16, 
        fontWeight: 500,
        letterSpacing: "0.08em", 
        color: "rgba(17,24,39,0.3)", 
        textTransform: "uppercase", 
        marginBottom: isMobile ? 4 : 12,
      }}>{layer.subtitle}</p>

      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: titleSize,
        fontWeight: 400,
        lineHeight: 1.05, 
        color: DARK, 
        marginBottom: isMobile ? 10 : 20, 
        letterSpacing: "-0.03em",
      }}>
        {layer.title.split(" ").map((word: string, wi: number) => (
          <span key={wi}>
            {wi === 0 ? <span style={{ color: GREEN }}>{word}</span> : word}
            {wi < layer.title.split(" ").length - 1 ? " " : ""}
          </span>
        ))}
      </h2>

      <div className="rounded-full mb-6 sm:mb-8" style={{
        width: isActive ? isMobile ? 28 : 88 : 0, 
        height: 2, 
        background: GREEN,
        transition: "width 0.6s cubic-bezier(.4,0,.2,1) 0.1s", 
        opacity: 0.5,
      }} />

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: descSize,
        fontWeight: 400,
        lineHeight: 1.6, 
        color: "rgba(17,24,39,0.75)", 
        maxWidth: isMobile ? "100%" : Math.min(800, windowWidth * 0.55),
      }}>{layer.description}</p>

      {isLast && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          <button 
            onClick={onLoginClick}
            style={{
              padding: isMobile ? "10px 20px" : "12px 28px", 
              borderRadius: isMobile ? 8 : 10, 
              background: DARK, 
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: isMobile ? 11 : 12, 
              fontWeight: 600,
              letterSpacing: "0.08em", 
              textTransform: "uppercase", 
              cursor: "pointer",
              border: "none", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 8,
              boxShadow: "0 4px 12px rgba(17,24,39,0.12)", 
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(17,24,39,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(17,24,39,0.12)"; }}
          >
            Get Started
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{
              background: GREEN, boxShadow: `0 0 6px ${GREEN}`, animation: "scrolly-pulse 2s ease-in-out infinite",
            }} />
          </button>
          <button 
            onClick={onContactClick}
            style={{
              padding: isMobile ? "10px 18px" : "12px 24px", 
              borderRadius: isMobile ? 8 : 10, 
              background: "transparent", 
              color: DARK,
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: isMobile ? 11 : 12, 
              fontWeight: 600,
              letterSpacing: "0.07em", 
              textTransform: "uppercase", 
              cursor: "pointer",
              border: "1px solid rgba(17,24,39,0.12)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 6,
              transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(17,24,39,0.25)"; e.currentTarget.style.background = "rgba(17,24,39,0.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(17,24,39,0.12)"; e.currentTarget.style.background = "transparent"; }}
          >
            Talk to Us
            <svg width={isMobile ? 11 : 13} height={isMobile ? 11 : 13} viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

interface ScrollytellingSectionProps {
  onLoginClick?: () => void;
  onContactClick?: () => void;
}

export default function ScrollytellingSection({ onLoginClick, onContactClick }: ScrollytellingSectionProps) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const [prevIndex, setPrevIndex] = useState(0);
  const windowWidth = useWindowSize();
  const isMobile = windowWidth < 768;

  const activeIndex = useMemo(
    () => Math.min(Math.floor(progress * LAYERS.length), LAYERS.length - 1),
    [progress]
  );
  const direction = activeIndex >= prevIndex ? 1 : -1;
  useEffect(() => { setPrevIndex(activeIndex); }, [activeIndex]);

  const sectionHeight = `${LAYERS.length * 100}vh`;
  const minHeight = `${LAYERS.length * 100}vh`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
        @keyframes scrolly-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes scrolly-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(0.6); }
        }
      `}</style>

      <section ref={containerRef} className="relative" style={{ height: sectionHeight, minHeight, background: "#fafbfc" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="absolute top-0 inset-x-0 z-20 flex justify-center pt-3 sm:pt-4 md:pt-5">
            <div className="text-center px-4">
      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#111827] font-semibold leading-tight tracking-tighter">
        The <span className="text-[#ea580c] font-bold">sovereign stack</span>
      </h3>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{
            opacity: 0.2,
            backgroundImage: `radial-gradient(circle, rgba(${GREEN_RGB},0.09) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }} />

          <div className="absolute top-0 inset-x-0 h-16 sm:h-20 md:h-24 pointer-events-none z-20" style={{ background: "linear-gradient(to bottom, #fafbfc, transparent)" }} />
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 md:h-24 pointer-events-none z-20" style={{ background: "linear-gradient(to top, #fafbfc, transparent)" }} />

          <div className="relative z-10 h-full w-full flex items-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-16 sm:pt-20 pb-8">
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              <div className="w-full lg:w-[48%] flex items-center justify-center flex-shrink-0">
                <GlassStack progress={progress} activeIndex={activeIndex} />
              </div>
              <div className="w-full lg:w-[52%] flex items-center justify-center lg:justify-start">
                <div className="relative w-full max-w-lg" style={{ minHeight: isMobile ? 240 : 280, paddingBottom: isMobile ? 48 : 0 }}>
                  {LAYERS.map((layer, i) => (
                    <TextPanel key={i} layer={layer} index={i} isActive={i === activeIndex} direction={direction} onLoginClick={onLoginClick} onContactClick={onContactClick} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ProgressNav activeIndex={activeIndex} />

          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            style={{ opacity: progress < 0.04 ? 1 : 0, transition: "opacity 0.5s" }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 500,
              letterSpacing: "0.2em", color: "rgba(17,24,39,0.2)", textTransform: "uppercase",
            }}>Scroll to explore</span>
            <div className="w-5 h-8 rounded-full flex items-start justify-center p-1.5" style={{ border: "1.5px solid rgba(17,24,39,0.1)" }}>
              <div className="w-1 h-2 rounded-full" style={{ background: "rgba(17,24,39,0.15)", animation: "scrolly-pulse 2s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
