export function PageProblemLeft() {
  return (
    <div className="flex flex-col h-full p-12 bg-[var(--color-page-back)] relative">
      <h2 className="font-display text-[26px] leading-[1.2] text-[#111111] m-0 mb-auto mt-4 z-10">
        The moment you adopted AI &mdash;<br/>your data walked out the door.
      </h2>
      
      <div className="absolute bottom-16 left-0 right-0 h-[300px] flex justify-center items-end opacity-90 overflow-hidden z-0">
        <svg viewBox="0 0 160 140" width="120" height="140" className="opacity-80 translate-y-[20px]">
          {/* Fading line up */}
          <line x1="80" y1="120" x2="80" y2="0" stroke="#93c5fd" strokeWidth="1.5" className="opacity-70 animate-pulse" style={{ animationDuration: '3s' }} />
          {/* Building silhouette */}
          <path d="M40,140 L40,110 L60,110 L60,95 L100,95 L100,115 L120,115 L120,140 Z" fill="#111111" />
        </svg>
      </div>

      <span className="absolute bottom-8 left-8 text-[11px] opacity-40">2</span>
    </div>
  );
}

export function PageProblemRight() {
  return (
    <div className="flex flex-col h-full p-12 bg-[var(--color-page)] justify-center relative">
      <div className="flex flex-col gap-10 mt-[-20px]">
        <h3 className="font-body font-bold text-[18px] text-[#111111] m-0 leading-snug">
          Your context.<br/>Their training data.
        </h3>
        
        <h3 className="font-body font-bold text-[18px] text-[#111111] m-0 leading-snug">
          Their model.<br/>Your competitor's edge.
        </h3>
        
        <h3 className="font-body font-bold text-[22px] text-[var(--color-green-dark)] m-0">
          They will own it.
        </h3>
      </div>
      
      <div className="absolute bottom-8 left-12 right-12 flex justify-between items-end">
        <span className="font-display italic text-[14px] opacity-40">Unless you do.</span>
        <span className="text-[11px] opacity-40">3</span>
      </div>
    </div>
  );
}