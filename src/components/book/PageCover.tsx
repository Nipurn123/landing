import Logo from '../icons/Logo';

export default function PageCover() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center relative">
      <Logo width={200} height={200} className="mb-8" />
      
      <h1 className="font-body font-semibold text-[28px] text-[#111111] m-0 mb-2">
        100XPrompt
      </h1>
      
      <div className="font-body font-bold text-[10px] tracking-[0.25em] uppercase text-[var(--color-green-dark)] mb-12">
        ENTERPRISE AI STUDIO
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center">
        <p className="font-display italic text-[18px] text-[var(--color-text)] mb-4 w-[80%] opacity-80 leading-relaxed">
          "Your data is the only commodity<br/>that will matter from here."
        </p>
        <span className="absolute bottom-0 right-8 text-[11px] opacity-40">1</span>
      </div>
    </div>
  );
}