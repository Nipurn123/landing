import { m } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo, flashModelSchema, NAVIGATION_BREADCRUMBS } from '../../seo';

const processSteps = [
  {
    title: "Purged",
    subtitle: "Clean Foundation",
    description: "Removed all harmful, biased, and non-Indian compliance data from base model. DPDP-ready from day one.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Fine-Tuned",
    subtitle: "Your Domain",
    description: "Trained on your proprietary enterprise data. Legal. Finance. Medical. Yours. Sovereign intelligence.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "FP8 Quantized",
    subtitle: "Efficient Power",
    description: "Full precision performance at half the VRAM. Runs on your infrastructure today. No cloud dependency.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const specs = [
  { label: "Base Model", value: "Qwen3.5 27B" },
  { label: "Quantization", value: "FP8 Flash Attention 3" },
  { label: "Context Window", value: "128K tokens" },
  { label: "Active Parameters", value: "27B" },
  { label: "Deployment", value: "SGLang / vLLM" },
  { label: "Compliance", value: "DPDP Act 2023" },
  { label: "Latency", value: "<500ms first token @ A100" },
];

export default function ProductFlashView() {
  return (
    <MainLayout>
      <Seo pageKey="flash" breadcrumbs={NAVIGATION_BREADCRUMBS.flash} schema={flashModelSchema} />
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full flex-grow flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div 
          className="absolute inset-0 bg-[#4aab6d] opacity-5 blur-[80px] rounded-full -z-10"
          style={{ top: '0', left: '20%', right: '20%' }}
        />

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[45%]"
        >
          <div className="text-[10px] md:text-[11px] font-semibold text-[hsl(var(--color-text-muted))] tracking-[0.25em] mb-10 flex items-center gap-2 uppercase">
            LIGHTWEIGHT LLM
          </div>
          
          <h1 
            className="text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-8 font-normal" 
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            100X Prompt Flash <br/>
            <span className="text-[hsl(var(--color-primary))]">Fast. Efficient. Sovereign.</span>
          </h1>
          
          <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] text-[hsl(var(--color-text-secondary))] mb-12 max-w-xl font-body">
            Built on Qwen3.5 27B — optimized for <span className="text-[hsl(var(--color-primary))] font-medium">speed and efficiency</span>. Perfect for high-throughput workloads.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="flex items-center justify-center gap-3 bg-[hsl(var(--color-text-primary))] text-[hsl(var(--color-background))] px-8 py-4 rounded hover:bg-[hsl(220_20%_20%)] shadow-lg shadow-[hsl(var(--color-text-primary)/0.2)] hover:-translate-y-0.5 transition-all font-body text-[13px] font-bold uppercase tracking-widest w-full sm:w-auto">
              Request Access
            </button>
            <button 
              disabled
              className="flex items-center justify-center gap-2 bg-transparent text-[hsl(var(--color-text-muted))] px-8 py-4 rounded transition-all font-body text-[13px] font-bold uppercase tracking-widest w-full sm:w-auto cursor-not-allowed opacity-60">
              Benchmarks — Revealing Soon
            </button>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[55%] flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full">
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-[hsl(var(--color-border))] shadow-xl">
              <h3 
                className="text-2xl font-semibold mb-8 text-[hsl(var(--color-text-primary))]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Technical Specifications
              </h3>
              <div className="space-y-4">
                {specs.map((spec) => (
                  <div 
                    key={spec.label}
                    className="flex justify-between py-3 border-b border-[hsl(var(--color-border))] last:border-0"
                  >
                    <span className="text-[hsl(var(--color-text-secondary))] font-body">{spec.label}</span>
                    <span className="font-medium text-[hsl(var(--color-text-primary))] font-body">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </main>

      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-16 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-6 font-normal"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              How We Build <span className="text-[hsl(var(--color-primary))]">Sovereign Models</span>
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4] text-[hsl(var(--color-text-secondary))] max-w-2xl mx-auto font-body">
              Every model is purged, fine-tuned, and optimized for your infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <m.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-[hsl(var(--color-border))] bg-white"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'hsl(var(--color-primary) / 0.1)', color: 'hsl(var(--color-primary))' }}
                >
                  {step.icon}
                </div>
                <h3 
                  className="text-xl font-semibold text-[hsl(var(--color-text-primary))] mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[hsl(var(--color-text-muted))] mb-4 font-body">
                  {step.subtitle}
                </p>
                <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed font-body">
                  {step.description}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>
      </section>

      <CTASection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
      `}</style>
    </MainLayout>
  );
}
