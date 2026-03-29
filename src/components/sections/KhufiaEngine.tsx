import { m } from 'framer-motion';

const GREEN = "#4aab6d";
const GREEN_RGB = "74,171,109";
const DARK = "#111827";

const JOURNEY = [
  {
    year: "The Problem",
    title: "A Question That Changed Everything",
    description: "Why does India's AI infrastructure run on foreign clouds? Why do our enterprises send their most sensitive data abroad just to get intelligent answers? We knew there had to be a better way.",
    highlight: "Sovereignty isn't a feature. It's the only way we build.",
  },
  {
    year: "The Vision",
    title: "Bharat's Sovereign AI Backbone",
    description: "We set out to build something unprecedented — an AI stack where sovereignty isn't a feature you pay extra for, but the very ground you stand on. Your data. Your models. Your infrastructure.",
    highlight: "India's data belongs to India. We're just making that technically possible.",
  },
];

export default function SovereignCore() {
  return (
    <section className="w-full relative overflow-hidden bg-[#fafbfc]">
      {/* Subtle texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${GREEN_RGB}, 0.8) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-12 md:pb-16">
        {/* Header */}
        <div className="text-center mb-20">
          <m.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              background: `rgba(${GREEN_RGB}, 0.08)`,
              border: `1px solid rgba(${GREEN_RGB}, 0.15)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ 
                background: GREEN,
                boxShadow: `0 0 6px rgba(${GREEN_RGB}, 0.5)`,
              }} 
            />
            <span 
              className="text-[10px] font-semibold tracking-[0.15em] uppercase"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                color: GREEN,
              }}
            >
              Our Story
            </span>
          </m.div>

          <m.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6"
            style={{ 
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: DARK,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built from a belief, not a
            <br />
            <span style={{ color: GREEN }}>business plan.</span>
          </m.h2>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: `linear-gradient(180deg, transparent, rgba(${GREEN_RGB}, 0.3) 10%, rgba(${GREEN_RGB}, 0.3) 90%, transparent)` }}
          />

          {JOURNEY.map((item, i) => (
            <m.div
              key={i}
              className="relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Timeline node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10" style={{ 
                background: GREEN,
                boxShadow: `0 0 0 4px rgba(${GREEN_RGB}, 0.1), 0 0 20px rgba(${GREEN_RGB}, 0.3)`,
              }}>
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: GREEN, opacity: 0.3 }} />
              </div>

              {/* Content - alternating sides on desktop */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    background: `linear-gradient(135deg, rgba(${GREEN_RGB}, 0.12) 0%, rgba(${GREEN_RGB}, 0.06) 100%)`,
                    color: GREEN,
                    border: `1px solid rgba(${GREEN_RGB}, 0.2)`,
                  }}
                >
                  {item.year}
                </div>

                <h3 
                  className="text-2xl md:text-3xl font-medium mb-4"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    color: DARK,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>

                <p 
                  className="text-sm md:text-base leading-relaxed mb-4"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(17,24,39,0.85)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </p>

                <div 
                  className="p-4 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(${GREEN_RGB}, 0.06) 0%, rgba(${GREEN_RGB}, 0.02) 100%)`,
                    borderLeft: `3px solid ${GREEN}`,
                  }}
                >
                  <p 
                    className="text-base md:text-lg font-medium italic"
                    style={{ 
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      color: GREEN,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.highlight}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
      `}</style>
    </section>
  );
}
