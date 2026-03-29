export default function Logo({ className = "", width, height }: { className?: string, width?: number | string, height?: number | string }) {
  return (
    <img 
      src="/assets/100X_Prompt.svg" 
      alt="100xPrompt Logo"
      className={`${className} object-contain select-none pointer-events-none`}
      style={{ 
        width: width || 'auto', 
        height: height || 'auto',
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.02))'
      }}
    />
  );
}
