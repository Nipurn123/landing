export default function Logo({ className = "", width = 200, height = 60 }: { className?: string, width?: number | string, height?: number | string }) {
  return (
    <img 
      src="/assets/100X_Prompt.svg" 
      alt="100xPrompt Logo"
      width={width}
      height={height}
      className={`${className} object-contain select-none pointer-events-none`}
      style={{ 
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.02))'
      }}
      loading="eager"
      decoding="async"
    />
  );
}
