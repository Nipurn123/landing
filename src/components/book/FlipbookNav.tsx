import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipbookNavProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function FlipbookNav({ currentPage, totalPages, onPrev, onNext, canPrev, canNext }: FlipbookNavProps) {
  const progress = (currentPage / (totalPages - 1)) * 100;

  return (
    <>
      {/* Progress Bar */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5"
      >
        <m.div
          className="h-full bg-gradient-to-r from-[var(--color-green-dark)] to-[var(--color-green-light)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </m.div>

      {/* Navigation Buttons */}
      <AnimatePresence>
        {canPrev && (
          <m.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={onPrev}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </m.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canNext && (
          <m.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onNext}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </m.button>
        )}
      </AnimatePresence>

      {/* Page Indicator - Moved to top to avoid overlap with PerspectiveToggle */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
      >
        <div className="flex items-center gap-1.5">
          {[...Array(totalPages)].map((_, i) => {
            const isActive = i === currentPage;
            const isPast = i < currentPage;
            return (
              <m.div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-6 h-2 bg-[var(--color-green-light)]' 
                    : isPast 
                      ? 'w-2 h-2 bg-[var(--color-green-light)]/50'
                      : 'w-2 h-2 bg-white/20'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            );
          })}
        </div>
        <div className="ml-3 text-[11px] font-bold text-white/40 tracking-wide">
          {currentPage + 1} / {totalPages}
        </div>
      </m.div>

      {/* Keyboard Hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 text-[10px] text-white/30 tracking-wide"
      >
        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono">←</div>
        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono">→</div>
        <span className="ml-1">to navigate</span>
      </m.div>
    </>
  );
}
