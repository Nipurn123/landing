import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Logo from './icons/Logo';
import { Database, CloudCog, ShieldCheck, Activity, Cpu, Server, Network } from 'lucide-react';
import { Layer1Left, Layer1Right } from './book/layers/Layer1';
import { CinematicOverlay } from './book/layers/Layer1/CinematicOverlay';
import { Layer2Left, Layer2Right } from './book/layers/Layer2';
import { Layer3Left, Layer3Right } from './book/layers/Layer3';
import { Layer4Left, Layer4Right } from './book/layers/Layer4';
import { Layer5Left, Layer5Right } from './book/layers/Layer5';
import { CoverFront } from './book/layers/Cover';
import { FlipbookNav } from './book/FlipbookNav';

// Common Page Props
interface PageProps {
  number?: number;
  children: React.ReactNode;
  className?: string;
  isCover?: boolean;
}

// Single Page Component
const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div 
      className={`page flex flex-col ${props.className || ''} ${props.isCover ? 'page-cover' : 'text-white bg-[#0a0a0a]'}`} 
      ref={ref}
    >
      <div className="flex-grow flex flex-col h-full w-full relative box-border z-10">
        {props.children}
      </div>
      
      {!props.isCover && props.number !== undefined && (
        <div className="absolute bottom-6 left-0 right-0 text-center font-display text-xs text-slate-400 opacity-60 pointer-events-none">
          {props.number}
        </div>
      )}
    </div>
  );
});
Page.displayName = 'Page';

export default function FlipbookWithScroll() {
  const bookRef = useRef<HTMLFlipBookRef>(null);
  const scrollTimeout = useRef<number | null>(null);
  const deltaAccumulator = useRef(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showCinematic1, setShowCinematic1] = useState(false);

  // Constants
  const TOTAL_PAGES = 16;
  const THRESHOLD = 60;

  const handlePrev = useCallback(() => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipNext();
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCinematic1) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCinematic1, handlePrev, handleNext]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent normal scroll everywhere EXCEPT if they scrolled past the end
      if (currentPage >= TOTAL_PAGES - 1 && e.deltaY > 0) {
        return; // Allow scroll down to contact section
      }

      if (currentPage >= TOTAL_PAGES - 1 && e.deltaY < 0 && window.scrollY === 0) {
        // Scrolled back up to top, flip back
        e.preventDefault();
        if (bookRef.current && bookRef.current.pageFlip()) {
          bookRef.current.pageFlip().flipPrev();
        }
        return;
      }

      if (currentPage < TOTAL_PAGES - 1) {
        e.preventDefault(); // Hijack scroll
      }

      if (showCinematic1) return; // Block scroll while cinematic is playing

      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      deltaAccumulator.current += e.deltaY;
      
      scrollTimeout.current = window.setTimeout(() => {
        if (deltaAccumulator.current > THRESHOLD && bookRef.current) {
           bookRef.current.pageFlip().flipNext();
        } else if (deltaAccumulator.current < -THRESHOLD && bookRef.current) {
           bookRef.current.pageFlip().flipPrev();
        }
        deltaAccumulator.current = 0;
      }, 60);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage, showCinematic1]);

  // Handle Flip Event to sync state
  const onPage = (e: { data: number }) => {
    setCurrentPage(e.data); // e.data is the current page index
    
    // Trigger cinematic for Layer 1
    if ((e.data === 1 || e.data === 2) && !showCinematic1) {
      setShowCinematic1(true);
    }
    
    if (e.data >= TOTAL_PAGES - 1) {
      document.body.style.overflowY = 'auto'; // allow scrolling to contact section
    } else {
      document.body.style.overflowY = 'hidden';
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
    {showCinematic1 && <CinematicOverlay onComplete={() => setShowCinematic1(false)} />}
    
    <FlipbookNav
      currentPage={currentPage}
      totalPages={TOTAL_PAGES}
      onPrev={handlePrev}
      onNext={handleNext}
      canPrev={currentPage > 0}
      canNext={currentPage < TOTAL_PAGES - 1}
    />
    
    <div className="w-full h-screen flex items-center justify-center relative z-10 py-10 bg-transparent">
      <HTMLFlipBook 
        width={1280} 
        height={720} 
        size="stretch"
        minWidth={315}
        maxWidth={1920}
        minHeight={420}
        maxHeight={1080}
        maxShadowOpacity={0.6}
        showCover={true}
        mobileScrollSupport={true}
        className={`flipbook-container z-10 w-full max-w-[90vw] md:max-w-[80vw] transition-transform duration-700 ease-in-out ${
          currentPage === 0 ? '-translate-x-[25%]' : 
          currentPage >= TOTAL_PAGES - 1 ? 'translate-x-[25%]' : 'translate-x-0'
        }`}
        onFlip={onPage}
        ref={bookRef}
        usePortrait={false}
      >
        {/* PAGE 0: Front Cover */}
        <Page isCover className="overflow-hidden border-none shadow-none">
          <CoverFront />
        </Page>

        {/* PAGE 1: Layer 1 Left */}
        <Page number={1} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer1Left />
        </Page>

        {/* PAGE 2: Layer 1 Right */}
        <Page number={2} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer1Right />
        </Page>

        {/* PAGE 3: Layer 2 Left */}
        <Page number={3} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer2Left />
        </Page>

        {/* PAGE 4: Layer 2 Right */}
        <Page number={4} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer2Right />
        </Page>

        {/* PAGE 5: Layer 3 Left */}
        <Page number={5} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer3Left />
        </Page>

        {/* PAGE 6: Layer 3 Right */}
        <Page number={6} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer3Right />
        </Page>

        {/* PAGE 7: Layer 4 Left */}
        <Page number={7} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer4Left />
        </Page>

        {/* PAGE 8: Layer 4 Right */}
        <Page number={8} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer4Right />
        </Page>

        {/* PAGE 9: Layer 5 Left */}
        <Page number={9} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer5Left />
        </Page>

        {/* PAGE 10: Layer 5 Right */}
        <Page number={10} className="p-0 overflow-hidden bg-[#0a0a0a]">
          <Layer5Right />
        </Page>

        {/* PAGE 11: The Solution - Left */}
        <Page number={11} className="p-12 pl-14 pt-16 bg-[#f8f8f6] text-gray-900">
          <h2 className="font-display text-[24px] leading-[1.2] text-gray-900 mb-8 z-10 relative">
            We build the AI that<br/>only <span className="text-[var(--color-green-dark)]">you</span> can have.
          </h2>
          
          {/* Advanced Infographic: The 100XPrompt Pipeline */}
          <div className="flex-1 w-full relative flex flex-col items-center justify-between py-4">
             {/* Central Animated Line */}
             <div className="absolute top-[30px] bottom-[80px] left-[50%] -translate-x-[50%] w-[2px] bg-gray-200 z-0 overflow-hidden">
                <div className="w-full h-full bg-[var(--color-green-light)] animate-[slideDown_2s_linear_infinite]" style={{ transformOrigin: 'top' }} />
             </div>

             {/* Node 1 */}
             <div className="relative z-10 bg-white border border-[var(--color-green-dark)] shadow-[0_4px_15px_rgba(26,107,58,0.1)] rounded-xl p-3 w-[220px] flex items-center gap-4 group hover:scale-105 transition-transform">
                <div className="bg-[#f0f9f4] p-2 rounded-lg">
                  <Database className="w-6 h-6 text-[var(--color-green-dark)]" />
                </div>
                <div>
                  <div className="font-body font-bold text-[14px] text-gray-900">Your Data</div>
                  <div className="font-body text-[10px] text-gray-500 uppercase tracking-wide">Secure perimeter</div>
                </div>
             </div>

             {/* Node 2 */}
             <div className="relative z-10 bg-white border border-[var(--color-green-dark)] shadow-[0_4px_15px_rgba(26,107,58,0.1)] rounded-xl p-3 w-[220px] flex items-center gap-4 group hover:scale-105 transition-transform">
                <div className="bg-[#f0f9f4] p-2 rounded-lg">
                  <Cpu className="w-6 h-6 text-[var(--color-green-dark)]" />
                </div>
                <div>
                  <div className="font-body font-bold text-[14px] text-gray-900">100X Engine</div>
                  <div className="font-body text-[10px] text-gray-500 uppercase tracking-wide">Auto-training</div>
                </div>
             </div>

             {/* Node 3: The Model */}
             <div className="relative z-10 bg-[#0a0a0a] border border-[var(--color-green-light)] shadow-[0_0_20px_rgba(74,171,109,0.3)] rounded-xl p-4 w-[240px] flex items-center gap-4 glow-node">
                <div className="bg-[var(--color-green-dark)] p-2 rounded-lg relative">
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse rounded-lg" />
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-body font-bold text-[15px] text-white">Your Foundation Model</div>
                  <div className="font-body text-[10px] text-[var(--color-green-light)] uppercase tracking-wide">Proprietary weights</div>
                </div>
             </div>

             {/* Split Paths */}
             <svg className="absolute bottom-[45px] w-full h-[40px] z-0" preserveAspectRatio="none">
                <path d="M 240 0 L 240 20 L 140 20 L 140 40" fill="none" stroke="var(--color-green-dark)" strokeWidth="2" strokeDasharray="4" className="path-flow" />
                <path d="M 240 0 L 240 20 L 340 20 L 340 40" fill="none" stroke="var(--color-green-dark)" strokeWidth="2" strokeDasharray="4" className="path-flow" />
             </svg>

             {/* Deployment Options */}
             <div className="flex w-full justify-between px-8 relative z-10">
                <div className="bg-white border border-gray-300 rounded-lg p-3 w-[120px] flex flex-col items-center text-center shadow-sm">
                  <Server className="w-5 h-5 text-gray-600 mb-1" />
                  <div className="font-body font-bold text-[11px] text-gray-900">Your Infra</div>
                </div>
                
                <div className="bg-white border border-gray-300 rounded-lg p-3 w-[120px] flex flex-col items-center text-center shadow-sm">
                  <CloudCog className="w-5 h-5 text-gray-600 mb-1" />
                  <div className="font-body font-bold text-[11px] text-gray-900">100X Cloud</div>
                </div>
             </div>
          </div>
        </Page>

        {/* PAGE 12: The Solution - Right (Stats) */}
        <Page number={12} className="pt-16 pb-0 px-0 flex flex-col bg-[#f8f8f6] text-gray-900">
          <div className="px-14 flex flex-col flex-grow relative z-10">
            <div className="inline-flex items-center gap-2 font-body font-bold text-[10px] tracking-[0.25em] uppercase text-[var(--color-green-dark)] mt-2 mb-8 bg-[#f0f9f4] px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green-light)] animate-ping" />
              ALREADY LIVE
            </div>
            
            <h2 className="font-display text-[34px] leading-[1.1] text-gray-900 m-0 mb-10">
              NPCI runs on it.<br/>A billion transactions.<br/>Every day.
            </h2>
            
            {/* Advanced Stats Infographic */}
            <div className="flex flex-col gap-6 w-full mt-auto mb-16">
              
              {/* Stat 1 */}
              <div className="relative bg-white p-5 rounded-xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-pulse opacity-50 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="font-body font-bold text-[28px] text-[var(--color-green-dark)] leading-none">1B+</div>
                    <div className="font-body text-[12px] font-semibold text-gray-500 uppercase tracking-wide mt-2">Daily Transactions</div>
                  </div>
                  <Network className="w-10 h-10 text-[var(--color-green-light)] opacity-20" strokeWidth={1} />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="relative bg-white p-5 rounded-xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-pulse opacity-50 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="font-body font-bold text-[24px] text-[var(--color-green-dark)] leading-none">INR 2.4L</div>
                    <div className="font-body text-[12px] font-semibold text-gray-500 uppercase tracking-wide mt-2">Grant Approved</div>
                  </div>
                  <ShieldCheck className="w-10 h-10 text-[var(--color-green-light)] opacity-20" strokeWidth={1} />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="relative bg-[#0a0a0a] p-5 rounded-xl shadow-[0_8px_30px_rgba(26,107,58,0.2)] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-green-dark)] to-transparent opacity-10" />
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="font-body font-bold text-[20px] text-white leading-none flex items-center gap-2">
                      Sovereign from Day One
                    </div>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-[var(--color-green-light)]" />
                </div>
              </div>

            </div>
          </div>
          
          {/* Bottom Strip */}
          <div className="w-full bg-[var(--color-green-dark)] py-6 px-8 text-center mt-auto shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMWU3ZDQzIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWE2YjNhIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20" />
            <span className="font-body font-bold text-[13px] text-white relative z-10 tracking-wide">
              India's payments backbone chose sovereignty over convenience.
            </span>
          </div>
        </Page>

        {/* PAGE 13: The Close */}
        <Page number={13} className="p-12 pl-14 pt-16 flex flex-col items-center justify-center text-center bg-[#111]">
          <Logo width={180} height={180} className="mb-12 opacity-50" />
          
          <h2 className="font-display text-[32px] leading-[1.3] text-white m-0 mb-10 drop-shadow-lg">
            Your data is the product.<br/>
            <span className="text-[var(--color-green-light)]">We just wake it up.</span>
          </h2>
          
          <div className="w-[100px] h-[2px] bg-[var(--color-green-dark)] mb-12 shadow-[0_0_10px_rgba(74,171,109,0.8)]" />
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl w-full backdrop-blur-sm">
            <p className="font-body font-bold text-[13px] text-gray-300 m-0 mb-2 hover:text-white transition-colors cursor-pointer">
              nipurn.agarwal@100xprompt.com
            </p>
            <p className="font-body font-bold text-[13px] text-gray-300 m-0 mb-4 hover:text-white transition-colors cursor-pointer">
              +91 70146 44947
            </p>
            <p className="font-body text-[11px] text-[var(--color-green-light)] m-0 uppercase tracking-widest font-bold">
              100xprompt.com
            </p>
          </div>
          
          <span className="absolute bottom-8 left-8 text-[11px] text-gray-600">13</span>
        </Page>

        {/* PAGE 14: Inside Back Cover */}
        <Page className="bg-[#111]">
          <div className="w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </Page>

        {/* PAGE 15: Back Cover */}
        <Page isCover className="bg-[#0a0a0a] flex items-center justify-center border-l border-white/5">
          <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center">
             <Logo width={80} height={80} className="opacity-20 grayscale" />
          </div>
        </Page>
      </HTMLFlipBook>

      {/* Global Animation Keyframes injected */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
    </>
  );
}