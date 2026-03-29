export default function ContactSection() {
  return (
    <div className="w-full bg-[#040404] pt-[160px] pb-40 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-green-dark)] opacity-[0.03] blur-[150px] pointer-events-none" />

      <h2 className="font-display text-[48px] md:text-[64px] text-white m-0 mb-6 text-center tracking-tight">
        Ready to <span className="foil-text italic">own</span> your AI?
      </h2>
      
      <p className="font-body text-[18px] text-white/40 m-0 mb-20 text-center max-w-lg font-light">
        Sovereign AI is built on relationships, not just data. Talk to the founders directly.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 mb-20 max-w-5xl w-full px-4 justify-center">
        {/* Card 1 */}
        <div className="bg-[#080808] border border-white/5 rounded-3xl p-10 flex-1 group hover:border-[var(--color-green-light)]/20 transition-colors duration-500">
          <h3 className="font-body font-bold text-[24px] text-white m-0 mb-1">
            Nipurn Agarwal
          </h3>
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[var(--color-green-light)] font-bold m-0 mb-8">
            CEO &amp; Co-founder
          </p>
          
          <div className="flex flex-col gap-3">
            <a href="mailto:nipurn.agarwal@100xprompt.com" className="font-body text-[15px] text-white/50 hover:text-white transition-colors no-underline flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              nipurn.agarwal@100xprompt.com
            </a>
            <a href="tel:+917014644947" className="font-body text-[15px] text-white/50 hover:text-white transition-colors no-underline flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              +91 70146 44947
            </a>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-[#080808] border border-white/5 rounded-3xl p-10 flex-1 group hover:border-[var(--color-green-light)]/20 transition-colors duration-500">
          <h3 className="font-body font-bold text-[24px] text-white m-0 mb-1">
            Sudhanshu Sharma
          </h3>
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[var(--color-green-light)] font-bold m-0 mb-8">
            COO &amp; Co-founder
          </p>
          
          <div className="flex flex-col gap-3">
            <a href="mailto:sudhanshu.sharma@100xprompt.com" className="font-body text-[15px] text-white/50 hover:text-white transition-colors no-underline flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              sudhanshu.sharma@100xprompt.com
            </a>
            <a href="tel:+917795532623" className="font-body text-[15px] text-white/50 hover:text-white transition-colors no-underline flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              +91 77955 32623
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="mailto:nipurn.agarwal@100xprompt.com"
        className="group relative bg-white text-black font-body font-bold text-[16px] px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 no-underline overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          Initialize Conversation <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
        </span>
        <div className="absolute inset-0 bg-[var(--color-green-light)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </a>
    </div>
  );
}