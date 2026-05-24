import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Quote as QuoteIcon, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
  /** Displayed as a pill badge (e.g. location or stat) */
  badge?: string;
}

export interface TestimonialsSectionProps {
  /** Array of testimonials to display. Falls back to built-in defaults. */
  testimonials?: Testimonial[];
  /** Section heading. */
  title?: string;
  /** Section sub-heading. */
  subtitle?: string;
  /** Small uppercase label above the title (shown only in 'full' variant). */
  sectionBadge?: string;
  /** Primary accent color (hex). Defaults to '#4aab6d'. */
  accentColor?: string;
  /** Auto-rotate interval in ms. Defaults to 5000. Set to 0 to disable. */
  interval?: number;
  /** Show left/right navigation arrows. */
  showArrows?: boolean;
  /** Show a quote icon above the blockquote. */
  showQuoteIcon?: boolean;
  /** Show 5-star rating above the blockquote. */
  showStars?: boolean;
  /**
   * 'full'    → standalone section with background pattern, badge, and padding.
   * 'compact' → inline carousel without outer section wrapper.
   */
  variant?: 'full' | 'compact';
  /** Additional className on the outer wrapper. */
  className?: string;
}

// ─── Default testimonials ───────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "We evaluated multiple AI infrastructure providers before choosing 100xprompt. The decision was straightforward - high-performance foundation models, complete data sovereignty, and zero compromise on security. For any business handling sensitive data, this isn't optional. It's the only way forward.",
    author: "Sagar Nagda",
    role: "Co Founder, Nimap Infotech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&q=80",
    badge: "Enterprise",
  }
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

/** Convert a hex colour to an "r,g,b" string for use in rgba(). */
function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

// ─── TestimonialCard ────────────────────────────────────────────────────────────

interface TestimonialCardProps {
  testimonial: Testimonial;
  accentColor: string;
  accentRgb: string;
  showQuoteIcon?: boolean;
  showStars?: boolean;
}

function TestimonialCard({ testimonial, accentColor, accentRgb, showQuoteIcon, showStars }: TestimonialCardProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-1 sm:px-0">
      <div 
        className="relative p-6 sm:p-8 md:p-12 rounded-3xl overflow-hidden text-left"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.8) inset",
        }}
      >
        {/* Accent bar */}
        <div 
          className="absolute top-0 left-0 w-1 sm:w-2 h-full rounded-l-3xl"
          style={{ background: accentColor }}
        />

        {/* Background glow */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
        />

        <div className="relative z-10">
          {/* Author + Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 flex-grow">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-white shadow-lg">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-base sm:text-lg truncate" style={{ color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>
                  {testimonial.author}
                </p>
                <p className="text-xs sm:text-sm truncate" style={{ color: "rgba(17,24,39,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            {testimonial.badge && (
              <div className="sm:ml-auto">
                <span 
                  className="inline-block text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{ background: `rgba(${accentRgb}, 0.1)`, color: accentColor, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {testimonial.badge}
                </span>
              </div>
            )}
          </div>

          {/* Optional quote icon + stars */}
          {(showQuoteIcon || showStars) && (
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              {showQuoteIcon ? <QuoteIcon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: `rgba(${accentRgb}, 0.3)` }} /> : <span />}
              {showStars && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quote */}
          <blockquote 
            className="text-lg sm:text-xl md:text-2xl leading-relaxed"
            style={{ 
              color: "rgba(17,24,39,0.8)", 
              fontFamily: "'Instrument Serif', Georgia, serif",
              lineHeight: 1.5,
            }}
          >
            "{testimonial.quote}"
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// ─── DotIndicator ───────────────────────────────────────────────────────────────

function DotIndicator({ activeIndex, total, accentColor, onClick }: { activeIndex: number; total: number; accentColor: string; onClick: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          aria-label={`View testimonial ${i + 1}`}
          className="relative rounded-full transition-all duration-300 cursor-pointer p-4 -m-2"
          style={{
            width: i === activeIndex ? 24 : 8,
            height: 8,
            background: i === activeIndex ? accentColor : "rgba(17,24,39,0.1)",
          }}
        />
      ))}
    </div>
  );
}

// ─── TestimonialsSection (main export) ──────────────────────────────────────────

export default function TestimonialsSection({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Trusted Globally",
  subtitle = "Real stories from real users building the sovereign AI future",
  sectionBadge = "Global Voices",
  accentColor = "#4aab6d",
  interval = 5000,
  showArrows = false,
  showQuoteIcon = false,
  showStars = false,
  variant = "full",
  className = "",
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const accentRgb = hexToRgb(accentColor);

  // Auto-rotate
  useEffect(() => {
    if (interval <= 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval, testimonials.length]);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      if (interval > 0) {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, interval);
      }
    }
  };

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    resetInterval();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetInterval();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    resetInterval();
  };

  // ── Inner carousel (shared between both variants) ──
  const carousel = (
    <div className="relative">
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors"
            style={{ border: `1px solid rgba(${accentRgb}, 0.25)` }}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors"
            style={{ border: `1px solid rgba(${accentRgb}, 0.25)` }}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
          </button>
        </>
      )}

      <div className={`relative min-h-[280px] ${showArrows ? 'px-8 sm:px-12' : ''}`}>
        <AnimatePresence mode="wait">
          <m.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <TestimonialCard 
              testimonial={testimonials[activeIndex]} 
              accentColor={accentColor}
              accentRgb={accentRgb}
              showQuoteIcon={showQuoteIcon}
              showStars={showStars}
            />
          </m.div>
        </AnimatePresence>
      </div>

      <DotIndicator 
        activeIndex={activeIndex} 
        total={testimonials.length} 
        accentColor={accentColor}
        onClick={handleDotClick} 
      />
    </div>
  );

  // ── Compact variant: just the carousel with a simple title ──
  if (variant === 'compact') {
    return (
      <div className={`text-center w-full overflow-hidden ${className}`}>
        {title && (
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: "#111827", fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-xl mx-auto" style={{ color: "rgba(17,24,39,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {carousel}
      </div>
    );
  }

  // ── Full variant: standalone section with background ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
      `}</style>

      <section 
        className={`relative w-full py-24 md:py-32 overflow-hidden ${className}`}
        style={{ background: "#fafbfc" }}
      >
        {/* Dot grid background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(${accentRgb},0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            {sectionBadge && (
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ 
                  background: `rgba(${accentRgb}, 0.08)`,
                  border: `1px solid rgba(${accentRgb}, 0.15)`,
                }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accentColor, boxShadow: `0 0 6px rgba(${accentRgb}, 0.4)` }}
                />
                <span 
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif", 
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: accentColor,
                    textTransform: "uppercase",
                  }}
                >
                  {sectionBadge}
                </span>
              </div>
            )}

            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4"
              style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif", 
                color: "#111827",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p 
                className="text-base md:text-lg max-w-xl mx-auto"
                style={{ 
                  fontFamily: "'DM Sans', sans-serif", 
                  color: "rgba(17,24,39,0.45)",
                  lineHeight: 1.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {carousel}
        </div>
      </section>
    </>
  );
}
