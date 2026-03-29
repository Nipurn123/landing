import { Suspense, lazy } from 'react';
import { m } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import ContactSection from '../sections/ContactSection';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

const FlipbookWithScroll = lazy(() => import('../Flipbook'));

function FlipbookLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--color-green-light)]/20 border-t-[var(--color-green-light)] rounded-full animate-spin" />
        <span className="text-[var(--color-green-light)]/60 text-[10px] font-mono uppercase tracking-widest">Initialising 100X Engine...</span>
      </div>
    </div>
  );
}

export default function MillennialView() {
  const { goHome } = useNavigation();

  return (
    <>
      <Seo pageKey="millennial" breadcrumbs={NAVIGATION_BREADCRUMBS.millennial} />
      <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
    >
      <m.button
        onClick={goHome}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md group"
      >
        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        <span className="font-body text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors font-bold">
          Home
        </span>
      </m.button>

      <section className="h-[100vh] w-full flex flex-col items-center justify-center relative z-10 overflow-hidden bg-[#0a0a0a]">
        
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-green-dark)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-green-light)] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
        
        <Suspense fallback={<FlipbookLoading />}>
          <FlipbookWithScroll />
        </Suspense>
        
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-bounce pointer-events-none">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] mb-2 text-[var(--color-green-dark)]">Scroll to turn</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-green-dark)" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      <section className="relative z-0 border-t border-[var(--color-green-dark)]/10 shadow-[0_-20px_50px_rgba(26,107,58,0.05)]">
        <ContactSection />
      </section>
    </m.div>
    </>
  );
}
