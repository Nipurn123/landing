export default function PageClose() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 bg-[var(--color-page-back)] text-left relative overflow-hidden">
      <div className="w-full max-w-[280px]">
        <div className="font-mono text-[11px] mb-12 opacity-80 leading-relaxed text-[#111111]">
          <span className="text-gray-400">// Initialize_Contact()</span><br/>
          <span className="text-[var(--color-green-dark)] font-bold">const</span> founder = <span className="text-[#ff5a1f]">"Nipurn Agarwal"</span>;<br/>
          <span className="text-[var(--color-green-dark)] font-bold">const</span> email = <span className="text-[#ff5a1f]">"nipurn.agarwal@100xprompt.com"</span>;<br/>
          <span className="text-[var(--color-green-dark)] font-bold">const</span> phone = <span className="text-[#ff5a1f]">"+91 70146 44947"</span>;<br/><br/>
          <span className="text-gray-400">// await contact();</span>
        </div>

        <h2 className="font-display text-[24px] leading-[1.3] text-[#111111] m-0 mb-8 font-bold">
          Your data is the product.<br/>
          <span className="text-[var(--color-green-dark)] italic">We just wake it up.</span>
        </h2>
        
        <div className="w-12 h-[2px] bg-[var(--color-green-dark)] mb-12" />
        
        <p className="font-body text-[10px] text-gray-500 m-0 uppercase tracking-widest font-bold">
          100XPrompt &mdash; Enterprise AI Studio
        </p>
      </div>
      
      <span className="absolute bottom-8 left-8 text-[11px] opacity-40">6</span>
    </div>
  );
}
