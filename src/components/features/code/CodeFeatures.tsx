import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "It shipped a complete authentication system in 15 minutes. What would've taken me a full day was done before my coffee got cold.",
    author: "Sarah Chen",
    role: "Staff Engineer at Stripe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    stats: "47 PRs this month"
  },
  {
    id: 2,
    quote: "The memory across sessions is unreal. It remembered my code style from a project 3 weeks ago and applied it perfectly.",
    author: "Marcus Johnson",
    role: "Founding Engineer at Vercel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    stats: "128K context used"
  },
  {
    id: 3,
    quote: "Finally, an AI that actually understands my entire codebase. The parallel agents thing is straight up magic.",
    author: "Priya Sharma",
    role: "Tech Lead at Linear",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    stats: "312 files analyzed"
  },
  {
    id: 4,
    quote: "I was skeptical about the sandbox thing, but running untrusted code in isolation has saved us from so many potential disasters.",
    author: "David Park",
    role: "Security Lead at Anthropic",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: "Zero security incidents"
  },
  {
    id: 5,
    quote: "The git integration is seamless. Created a branch, wrote 12 files, opened a PR—all while I was in a meeting.",
    author: "Emma Rodriguez",
    role: "Senior Developer at GitHub",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    stats: "89 commits automated"
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-1 sm:px-0">
      <div 
        className="relative p-6 sm:p-8 md:p-12 rounded-3xl overflow-hidden text-left"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05) inset",
        }}
      >
        {/* Accent Bar */}
        <div 
          className="absolute top-0 left-0 w-1 sm:w-1.5 h-full rounded-l-3xl"
          style={{ background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)" }}
        />
        
        {/* Background Glow */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }}
        />

        <div className="relative z-10">
          {/* Author Section at Top (Similar to Infrastructure) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 flex-grow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-stone-100 shadow-sm shrink-0">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-base sm:text-lg text-stone-900 truncate">{testimonial.author}</h4>
                <p className="text-xs sm:text-sm text-stone-500 truncate">{testimonial.role}</p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <span className="inline-block text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full whitespace-nowrap">
                {testimonial.stats}
              </span>
            </div>
          </div>

          {/* Quote Icon and Stars */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-green-200" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          {/* Quote */}
          <blockquote 
            className="text-lg sm:text-xl md:text-2xl leading-relaxed text-stone-700"
            style={{ 
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

function DotIndicator({ activeIndex, total, onClick }: { activeIndex: number; total: number; onClick: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className="relative h-2 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: i === activeIndex ? 24 : 8,
            background: i === activeIndex ? "#22c55e" : "rgba(34,197,94,0.2)",
          }}
        />
      ))}
    </div>
  );
}

export default function CodeFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

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
      }, 6000);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="mb-32">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');
      `}</style>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-4">What builders are saying</h2>
        <p className="text-stone-500 max-w-xl mx-auto">Engineers shipping faster with 100x Code</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-green-200 shadow-sm flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-green-200 shadow-sm flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
        </button>

        {/* Carousel */}
        <div className="relative min-h-[280px] sm:min-h-[320px] px-8 sm:px-12">
          <AnimatePresence mode="wait">
            <m.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </m.div>
          </AnimatePresence>
        </div>

        <DotIndicator activeIndex={activeIndex} total={testimonials.length} onClick={handleClick} />
      </div>
    </div>
  );
}
