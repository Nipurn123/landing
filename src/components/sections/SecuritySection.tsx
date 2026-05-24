import { m } from 'framer-motion';

const DARK = "#111827";

export default function SecuritySection() {
  const badges = [
    { src: "/assets/prod-samvaad/products/sam-sec-03.svg", alt: "Security badge 1", width: 80, height: 80 },
    { src: "/assets/prod-samvaad/products/sam-sec-02.svg", alt: "Security badge 2", width: 80, height: 80 },
    { src: "/assets/prod-samvaad/products/sam-sec-01.svg", alt: "Security badge 3", width: 80, height: 80 },
  ];

  return (
    <section className="flex flex-col items-center gap-12 md:gap-16 py-20 px-6">
      <div className="flex flex-col items-center text-center gap-6 w-full">
        <div className="flex flex-col items-center gap-4 w-full text-center">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full px-3 md:px-0 text-3xl md:text-[36px] leading-[135%] whitespace-pre-line font-normal"
            style={{ 
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: DARK 
            }}
          >
            Enterprise-grade security. 
            <br />
            Built in from day one.
          </m.h2>
        </div>
      </div>

      <div className="flex md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 mx-auto w-full">
        {badges.map((badge, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex justify-center items-center"
          >
            <div 
              className="flex justify-center items-center rounded-4xl md:rounded-full w-[140px] md:w-[200px] h-[140px] md:h-[200px] hover:scale-105 transition-transform duration-300 cursor-pointer" 
              style={{ 
                background: "#F0F3FA", 
                boxShadow: "inset 0 0 50px rgba(165, 187, 252, 0.4)" 
              }}
            >
              <img 
                src={badge.src} 
                alt={badge.alt} 
                width={badge.width}
                height={badge.height}
                loading="lazy"
                decoding="async"
                className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
