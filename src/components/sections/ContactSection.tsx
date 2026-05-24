export default function ContactSection() {
  return (
    <div className="w-full bg-[#040404] pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-6 md:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[var(--color-green-dark)] opacity-[0.03] blur-[150px] pointer-events-none" />

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white m-0 mb-4 sm:mb-6 text-center tracking-tight">
        Ready to <span className="foil-text italic">own</span> your AI?
      </h2>
      
      <p className="font-body text-sm sm:text-base md:text-lg text-white/40 m-0 mb-10 sm:mb-16 md:mb-20 text-center max-w-lg font-light px-4">
        Sovereign AI is built on relationships, not just data. Talk to the founders directly.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-10 sm:mb-16 md:mb-20 max-w-5xl w-full px-2 sm:px-4 justify-center">
        {/* Card 1 */}
        <div className="bg-[#080808] border border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex-1 group hover:border-[var(--color-green-light)]/20 transition-colors duration-500">
          <h3 className="font-body font-bold text-lg sm:text-xl md:text-2xl text-white m-0 mb-1">
            Nipurn Agarwal
          </h3>
          <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--color-green-light)] font-bold m-0 mb-6 sm:mb-8">
            CEO &amp; Co-founder
          </p>
          
          <div className="flex flex-col gap-2 sm:gap-3">
            <a href="mailto:nipurn.agarwal@100xprompt.com" className="font-body text-sm sm:text-base text-white/50 hover:text-white transition-colors no-underline flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              nipurn.agarwal@100xprompt.com
            </a>
            <a href="tel:+917014644947" className="font-body text-sm sm:text-base text-white/50 hover:text-white transition-colors no-underline flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              +91 70146 44947
            </a>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-[#080808] border border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex-1 group hover:border-[var(--color-green-light)]/20 transition-colors duration-500">
          <h3 className="font-body font-bold text-lg sm:text-xl md:text-2xl text-white m-0 mb-1">
            Sudhanshu Sharma
          </h3>
          <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--color-green-light)] font-bold m-0 mb-6 sm:mb-8">
            COO &amp; Co-founder
          </p>
          
          <div className="flex flex-col gap-2 sm:gap-3">
            <a href="mailto:sudhanshu.sharma@100xprompt.com" className="font-body text-sm sm:text-base text-white/50 hover:text-white transition-colors no-underline flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              sudhanshu.sharma@100xprompt.com
            </a>
            <a href="tel:+917795532623" className="font-body text-sm sm:text-base text-white/50 hover:text-white transition-colors no-underline flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-light)] opacity-40" />
              +91 77955 32623
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="mailto:nipurn.agarwal@100xprompt.com"
        className="group relative bg-white text-black font-body font-bold text-sm sm:text-base px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all hover:scale-105 active:scale-95 no-underline overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2 sm:gap-3">
          Initialize Conversation <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
        </span>
        <div className="absolute inset-0 bg-[var(--color-green-light)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </a>
    </div>
  );
}