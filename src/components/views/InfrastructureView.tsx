import { m } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import TestimonialsSection from '../sections/TestimonialsSection';
import type { Testimonial } from '../sections/TestimonialsSection';
import OptimizedImage from '../ui/OptimizedImage';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

const infraTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We evaluated multiple AI infrastructure providers before choosing 100xprompt. The decision was straightforward - high-performance foundation models, complete data sovereignty, and zero compromise on security. For any business handling sensitive data, this isn't optional. It's the only way forward.",
    author: "Sagar Nagda",
    role: "Co Founder, Nimap Infotech",
    badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&q=80",
  }
];

const deploymentOptions = [
  {
    image: "/assets/infrastrcture/1.jpg",
    title: "On-Premise",
    description: "Deploy in your own data center. Full control over hardware, networking, and security policies.",
    accent: "Hardware Sovereignty",
    features: ["Bare-metal support", "Custom hardware configs", "Full network isolation"]
  },
  {
    image: "/assets/infrastrcture/2.jpg",
    title: "Air-Gapped",
    description: "Completely isolated from the internet. Ideal for defense and highly regulated industries.",
    accent: "Total Isolation",
    features: ["Zero external connectivity", "Offline model updates", "Secure media transfer"]
  },
  {
    image: "/assets/infrastrcture/3.jpg",
    title: "Sovereign Cloud",
    description: "Deploy on sovereign cloud providers in your region. Data residency guaranteed. Fully compliant with local data protection laws.",
    accent: "Region Native",
    features: ["Data residency enforcement", "Sovereign cloud providers", "Regulatory compliance"]
  }
];

export default function InfrastructureView() {
  return (
    <MainLayout>
      <Seo pageKey="infrastructure" breadcrumbs={NAVIGATION_BREADCRUMBS.infrastructure} />
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
            DEPLOYMENT STACK
          </div>
          
          <h1 
            className="text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-8 font-normal" 
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Hardware & Orchestration <br/>
            <span className="text-[hsl(var(--color-primary))]">The Infrastructure Layer</span>
          </h1>
          
          <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.35] text-[hsl(var(--color-text-secondary))] mb-12 max-w-xl font-body">
            Own the entire AI stack. Deploy on hardware purpose-built for high-performance <span className="text-[hsl(var(--color-primary))] font-medium">sovereign workloads</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="flex items-center justify-center gap-3 bg-[hsl(var(--color-text-primary))] text-[hsl(var(--color-background))] px-8 py-4 rounded hover:bg-[hsl(220_20%_20%)] shadow-lg shadow-[hsl(var(--color-text-primary)/0.2)] hover:-translate-y-0.5 transition-all font-body text-[13px] font-bold uppercase tracking-widest w-full sm:w-auto">
              Request Access
            </button>
            <button 
              onClick={() => window.location.href = '/docs'}
              className="flex items-center justify-center gap-2 bg-transparent text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text-primary))] px-8 py-4 rounded hover:bg-[hsl(var(--color-surface-hover))] transition-all font-body text-[13px] font-bold uppercase tracking-widest w-full sm:w-auto">
              Read Specs
              <svg className="w-4 h-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
            <OptimizedImage
              src="/assets/infrastrcture/infra.jpg"
              alt="Sovereign AI Infrastructure Diagram"
              className="w-full h-auto shadow-2xl shadow-green-900/10 transition-transform duration-700 hover:scale-[1.02]"
              containerClassName="overflow-hidden rounded-3xl"
              priority
            />
          </div>
        </m.div>
      </main>

      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-16 md:pb-24">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-6 font-normal"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Deployment <span className="text-[hsl(var(--color-primary))]">Models</span>
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.4] text-[hsl(var(--color-text-secondary))] max-w-2xl mx-auto font-body">
              Scale your AI infrastructure across any environment, from local data centers to sovereign-certified clouds.
            </p>
          </div>

          <div className="space-y-32">
            {deploymentOptions.map((option, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <OptimizedImage
                    src={option.image}
                    alt={option.title}
                    className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]"
                    containerClassName="overflow-hidden rounded-3xl"
                  />
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6"
                    style={{ 
                      background: 'hsl(var(--color-primary) / 0.1)', 
                      color: 'hsl(var(--color-primary))' 
                    }}
                  >
                    {option.accent}
                  </div>
                  <h3 
                    className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[hsl(var(--color-text-primary))] mb-6 font-normal"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    {option.title}
                  </h3>
                  <p className="text-[hsl(var(--color-text-secondary))] font-body text-lg leading-relaxed mb-8">
                    {option.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {option.features.map((feature, fi) => (
                      <span 
                        key={fi}
                        className="px-4 py-2 rounded-full text-sm font-body text-[hsl(var(--color-text-secondary))] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <TestimonialsSection 
            testimonials={infraTestimonials}
            title="What builders are saying"
            subtitle="Engineers deploying sovereign infrastructure at scale"
            variant="compact"
          />
        </m.div>

        <CTASection />
      </section>
    </MainLayout>
  );
}
