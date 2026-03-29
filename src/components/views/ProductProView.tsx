import { m } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo, proModelSchema, NAVIGATION_BREADCRUMBS } from '../../seo';

export default function ProductProView() {
  const { goHome } = useNavigation();

  return (
    <MainLayout>
      <Seo pageKey="pro" breadcrumbs={NAVIGATION_BREADCRUMBS.pro} schema={proModelSchema} />
      <main className="pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(150_80%_40%/0.1)] border border-[hsl(150_80%_40%/0.2)] text-[hsl(150_80%_40%)] text-xs font-semibold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-[hsl(150_80%_40%)]"></span>
            FLAGSHIP LLM
          </div>
          
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-[hsl(var(--color-text-primary))] mb-6 font-semibold">
            100X Prompt Pro
          </h1>
          <p className="font-display text-[clamp(1.25rem,3vw,2.25rem)] leading-[1.2] text-[hsl(var(--color-text-secondary))] mb-12 max-w-3xl">
            Extreme precision. Deep reasoning. <span className="text-[#4aab6d] font-medium text-italic">The gold standard for enterprise intelligence.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--color-border))] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#4aab6d]/10 text-[#4aab6d]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </span>
                Sovereign Precision
              </h3>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                Trained on proprietary enterprise datasets with 0% data leakage. Designed for extreme accuracy in legal, financial, and medical logic.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--color-border))] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#4aab6d]/10 text-[#4aab6d]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
                Deep Context
              </h3>
              <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed">
                200K+ token context window allowing for full codebase analysis and deep document understanding inside your secure perimeter.
              </p>
            </div>
          </div>

          <button 
            onClick={goHome}
            className="mt-16 flex items-center gap-2 text-sm font-bold text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text-primary))] transition-colors"
          >
            ← Back to Home
          </button>
        </m.div>
      </main>

      <CTASection />
    </MainLayout>
  );
}
