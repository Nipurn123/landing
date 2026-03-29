import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const GREEN = "#4aab6d";
const GREEN_RGB = "74,171,109";
const DARK = "#111827";

const testimonials = [
  {
    id: 1,
    quote: "The conversational AI understood my mother tongue perfectly. For the first time, technology feels like it was built for us, not adapted for us.",
    author: "Priya Sharma",
    role: "Village Entrepreneur",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    quote: "We process 10 million queries daily in 22 languages. The infrastructure just works. Zero downtime, complete sovereignty.",
    author: "Dr. Anand Kumar",
    role: "CTO, State Government",
    location: "Karnataka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    quote: "My grandmother can now access government services in Bhojpuri. This is what Digital India should feel like.",
    author: "Rahul Verma",
    role: "Social Worker",
    location: "Bihar",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    quote: "The data sovereignty guarantee gave us confidence. We finally have AI that respects our boundaries.",
    author: "Meera Patel",
    role: "Banking CISO",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    quote: "Training custom models on our regional datasets was seamless. The token factory is revolutionary.",
    author: "Arjun Reddy",
    role: "ML Engineer",
    location: "Telangana",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full max-w-3xl mx-auto px-1 sm:px-0"
    >
      <div 
        className="relative p-6 sm:p-8 md:p-12 rounded-3xl overflow-hidden text-left"
        style={{
          background: isActive 
            ? "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: isActive 
            ? "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.8) inset"
            : "0 10px 30px -10px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.5) inset",
        }}
      >
        {isActive && (
          <>
            <div 
              className="absolute top-0 left-0 w-1 sm:w-2 h-full rounded-l-3xl"
              style={{ background: GREEN }}
            />
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${GREEN} 0%, transparent 70%)` }}
            />
          </>
        )}

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-white shadow-lg">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-base sm:text-lg truncate" style={{ color: DARK, fontFamily: "'DM Sans', sans-serif" }}>
                  {testimonial.author}
                </h4>
                <p className="text-xs sm:text-sm truncate" style={{ color: "rgba(17,24,39,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <span className="inline-block text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap" style={{ background: `rgba(${GREEN_RGB}, 0.1)`, color: GREEN, fontFamily: "'DM Sans', sans-serif" }}>
                {testimonial.location}
              </span>
            </div>
          </div>

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
    </m.div>
  );
}

function DotIndicator({ activeIndex, onClick }: { activeIndex: number; onClick: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className="relative h-2 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: i === activeIndex ? 24 : 8,
            background: i === activeIndex ? GREEN : "rgba(17,24,39,0.1)",
          }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (i: number) => {
    setActiveIndex(i);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
      `}</style>

      <section 
        className="relative w-full py-24 md:py-32 overflow-hidden"
        style={{ background: "#fafbfc" }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(${GREEN_RGB},0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ 
                background: `rgba(${GREEN_RGB}, 0.08)`,
                border: `1px solid rgba(${GREEN_RGB}, 0.15)`,
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GREEN, boxShadow: `0 0 6px rgba(${GREEN_RGB}, 0.4)` }}
              />
              <span 
                style={{ 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: GREEN,
                  textTransform: "uppercase",
                }}
              >
                Voices of India
              </span>
            </div>

            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4"
              style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif", 
                color: DARK,
                letterSpacing: "-0.02em",
              }}
            >
              Trusted Across <span style={{ color: GREEN }}>Bharat</span>
            </h2>

            <p 
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ 
                fontFamily: "'DM Sans', sans-serif", 
                color: "rgba(17,24,39,0.45)",
                lineHeight: 1.7,
              }}
            >
              Real stories from real users building India's AI future
            </p>
          </div>

          <div className="relative min-h-[280px]">
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
                  isActive={true}
                />
              </m.div>
            </AnimatePresence>
          </div>

          <DotIndicator activeIndex={activeIndex} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
