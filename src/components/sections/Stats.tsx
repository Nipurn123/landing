import { m } from 'framer-motion';

export default function Stats() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group cursor-default"
        >
          <div className="w-8 h-1 bg-[hsl(var(--color-border))] mb-8 group-hover:bg-[hsl(var(--color-primary))] transition-colors duration-300"></div>
          <div className="font-display text-5xl md:text-6xl text-[hsl(var(--color-text-primary))] mb-4 font-semibold tracking-tight group-hover:-translate-y-1 transition-transform duration-300">1B+</div>
          <div className="font-body text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.2em] mb-4">Daily Transactions</div>
          <p className="font-body text-[hsl(var(--color-text-muted))] leading-relaxed text-[15px]">
            Running flawlessly in production for enterprise payment systems, validating extreme scale.
          </p>
        </m.div>

        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group cursor-default"
        >
          <div className="w-8 h-1 bg-[hsl(var(--color-border))] mb-8 group-hover:bg-[hsl(var(--color-primary))] transition-colors duration-300"></div>
          <div className="font-display text-5xl md:text-6xl text-[hsl(var(--color-text-primary))] mb-4 font-semibold tracking-tight group-hover:-translate-y-1 transition-transform duration-300">0%</div>
          <div className="font-body text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.2em] mb-4">Data Leakage</div>
          <p className="font-body text-[hsl(var(--color-text-muted))] leading-relaxed text-[15px]">
            Complete sovereignty. The 100X Engine trains directly inside your secure perimeter.
          </p>
        </m.div>

        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group cursor-default"
        >
          <div className="w-8 h-1 bg-[hsl(var(--color-border))] mb-8 group-hover:bg-[hsl(var(--color-primary))] transition-colors duration-300"></div>
          <div className="font-display text-5xl md:text-6xl text-[hsl(var(--color-text-primary))] mb-4 font-semibold tracking-tight group-hover:-translate-y-1 transition-transform duration-300">2.4L</div>
          <div className="font-body text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.2em] mb-4">Grant Capital</div>
          <p className="font-body text-[hsl(var(--color-text-muted))] leading-relaxed text-[15px]">
            Backed and validated for initial deployment scaling and proprietary infrastructure.
          </p>
        </m.div>
      </div>
    </section>
  );
}
