import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollFlip(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const isAnimating = useRef(false);
  const deltaAccumulator = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  const threshold = 50;

  const goNext = useCallback(() => {
    if (isAnimating.current || currentPage >= totalPages - 1) return;
    
    isAnimating.current = true;
    setCurrentPage(prev => {
      const next = prev + 1;
      if (next === totalPages - 1) setIsLastPage(true);
      return next;
    });
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 600); // match flip animation duration
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    // allow scrolling up when user scrolled down to contact section
    if (currentPage === totalPages - 1 && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isAnimating.current || currentPage <= 0) return;
    
    isAnimating.current = true;
    setCurrentPage(prev => {
      const next = prev - 1;
      setIsLastPage(false);
      return next;
    });
    
    setTimeout(() => {
      isAnimating.current = false;
    }, 600); // match flip animation duration
  }, [currentPage, totalPages]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLastPage && window.scrollY > 0) {
        return; // Allow natural scrolling if we are past the book
      }

      if (isLastPage && e.deltaY < 0 && window.scrollY === 0) {
        // we are at top of contact section, scrolling up to go back to previous page
        e.preventDefault();
        goPrev();
        return;
      }

      if (!isLastPage) {
        e.preventDefault(); // Hijack scroll
      } else {
        return; // Allow scroll
      }

      if (isAnimating.current) return;

      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      
      deltaAccumulator.current += e.deltaY;
      
      scrollTimeout.current = window.setTimeout(() => {
        if (deltaAccumulator.current > threshold) {
          goNext();
        } else if (deltaAccumulator.current < -threshold) {
          goPrev();
        }
        deltaAccumulator.current = 0;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLastPage, goNext, goPrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        if (!isLastPage) {
          e.preventDefault();
          goNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentPage > 0 && window.scrollY === 0) {
          e.preventDefault();
          goPrev();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLastPage, currentPage, goNext, goPrev]);

  // Touch handlers
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLastPage && window.scrollY > 0) return;

      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) goNext();
        else if (deltaX < -50) goPrev();
      } else {
        if (deltaY > 50 && !isLastPage) {
          e.preventDefault();
          goNext();
        } else if (deltaY < -50 && window.scrollY === 0) {
          goPrev();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLastPage, goNext, goPrev]);

  useEffect(() => {
    if (isLastPage) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
      window.scrollTo(0, 0);
    }
  }, [isLastPage]);

  return { currentPage, totalPages, goNext, goPrev, isLastPage };
}