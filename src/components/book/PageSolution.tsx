

export function PageSolutionLeft() {
  return (
    <div className="flex flex-col h-full p-12 bg-[var(--color-page-back)] relative">
      <h2 className="font-display text-[26px] leading-[1.2] text-[#111111] m-0 mb-8 text-center font-bold">
        We build the AI that<br/>only you can have.
      </h2>
      
      <div className="space-y-6">
        <div className="border-l-2 border-[var(--color-green-dark)] pl-6">
          <h4 className="font-body font-bold text-[12px] uppercase tracking-widest text-[var(--color-green-dark)] mb-2">Core Philosophy</h4>
          <p className="font-body text-[14px] leading-relaxed text-gray-700 italic">
            "Most enterprises rent intelligence. They send proprietary data to a third-party model, giving away their competitive edge. We fundamentally reject this architecture."
          </p>
        </div>

        <div className="bg-[#111111]/5 p-6 rounded-2xl border border-black/5">
          <p className="font-display text-[18px] leading-tight text-[#111111] font-medium">
            Your data is the product.<br/>
            <span className="text-[var(--color-green-dark)] italic">We just wake it up.</span>
          </p>
        </div>
      </div>

      <span className="absolute bottom-8 left-8 text-[11px] opacity-40">4</span>
    </div>
  );
}

export function PageSolutionRight() {
  return (
    <div className="flex flex-col h-full p-12 bg-[var(--color-page)] relative pb-0 px-0">
      <div className="px-12 flex flex-col flex-grow">
        <div className="font-body font-bold text-[10px] tracking-[0.25em] uppercase text-[var(--color-green-dark)] mt-2 mb-8">
          ALREADY LIVE
        </div>
        
        <h2 className="font-display text-[32px] leading-[1.1] text-[#111111] m-0 mb-12">
          NPCI runs on it.<br/>1,000,000,000+<br/>Every day.
        </h2>
        
        <div className="flex justify-between w-full mt-auto mb-16 gap-4">
          <div className="flex flex-col flex-1">
            <span className="font-body font-bold text-[16px] text-[var(--color-green-dark)] whitespace-nowrap">INR 2,40,000</span>
            <span className="font-body text-[10px] text-gray-500 mt-1 whitespace-nowrap">Grant Approved</span>
          </div>
          
          <div className="flex flex-col flex-1">
            <span className="font-body font-bold text-[16px] text-[var(--color-green-dark)] whitespace-nowrap">1B+</span>
            <span className="font-body text-[10px] text-gray-500 mt-1 whitespace-nowrap">Daily Transactions</span>
          </div>
          
          <div className="flex flex-col flex-1">
            <span className="font-body font-bold text-[16px] text-[var(--color-green-dark)] whitespace-nowrap">Day One</span>
            <span className="font-body text-[10px] text-gray-500 mt-1 whitespace-nowrap">Sovereign from day one</span>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-[#1a6b3a] py-6 px-4 text-center mt-auto">
        <span className="font-body font-bold text-[12px] text-white">
          India's payments backbone chose sovereignty over convenience.
        </span>
      </div>

      <span className="absolute bottom-8 right-8 text-[11px] opacity-40 text-white z-10">5</span>
    </div>
  );
}