import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const words = [
  "developers", "coders", "builders", "engineers", 
  "creators", "makers", "programmers", "shippers"
];

const statusMessages = [
  "Analyzing codebase",
  "Optimizing infrastructure",
  "Thinking through logic",
  "Compiling sovereign stack",
  "Debugging architecture",
  "Deploying agents"
];

export default function CliHero() {
  const [isCopied, setIsCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const typewriterRef = useRef<number | null>(null);
  const lastTypeTime = useRef(0);
  const currentCharIndex = useRef(words[0].length);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let startTime: number | null = null;
    
    const type = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
        lastTypeTime.current = timestamp;
      }
      const currentWord = words[wordIndex];
      const delta = timestamp - lastTypeTime.current;

      if (!isDeleting) {
        if (currentCharIndex.current < currentWord.length) {
          if (delta >= 100) {
            currentCharIndex.current++;
            setDisplayText(currentWord.substring(0, currentCharIndex.current));
            lastTypeTime.current = timestamp;
          }
        } else if (delta >= 2500) {
          setIsDeleting(true);
          lastTypeTime.current = timestamp;
        }
      } else {
        if (currentCharIndex.current > 0) {
          if (delta >= 50) {
            currentCharIndex.current--;
            setDisplayText(currentWord.substring(0, currentCharIndex.current));
            lastTypeTime.current = timestamp;
          }
        } else if (delta >= 600) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          lastTypeTime.current = timestamp;
        }
      }
      typewriterRef.current = requestAnimationFrame(type);
    };

    typewriterRef.current = requestAnimationFrame(type);
    return () => {
      if (typewriterRef.current) cancelAnimationFrame(typewriterRef.current);
    };
  }, [wordIndex, isDeleting]);

  const copyCommand = () => {
    const cmd = "npm install -g @nipurn/xprompt-new@latest";
    navigator.clipboard.writeText(cmd);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center text-center px-6 pt-32 pb-24 overflow-hidden bg-white">
      
      {/* Badge */}
      <m.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-100 bg-stone-50 mb-12 shadow-sm min-w-[200px] justify-center"
      >
        <span className="text-emerald-500 text-[10px] animate-pulse shrink-0">◐</span>
        <div className="relative h-4 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <m.span 
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-stone-500 text-[11px] font-mono tracking-wider font-medium uppercase whitespace-nowrap"
            >
              {statusMessages[statusIndex]}
            </m.span>
          </AnimatePresence>
        </div>
      </m.div>

      {/* Main Headline */}
      <m.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 w-full"
      >
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-stone-900 flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-5 gap-y-2">
          <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Built for</span>
          <span className="text-emerald-500 font-light translate-y-0 md:translate-y-1">{">"}</span>
          <span className="text-emerald-500 flex items-center min-w-[3ch]">
            {displayText}
            <m.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block w-[2px] md:w-[4px] h-[0.7em] bg-emerald-500 ml-1 sm:ml-2 rounded-full"
            />
          </span>
        </h1>
      </m.div>

      {/* Subtitle */}
      <m.p 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-stone-500 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 sm:mb-14 font-body"
      >
        The <span className="text-stone-900 font-semibold">autonomous coding partner</span> that lives on your infrastructure. 
        Zero-ops, air-gapped, <span className="text-emerald-600 font-bold">100X faster.</span>
      </m.p>

      {/* CTA Bar */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-3xl px-2"
      >
        <div className="relative flex flex-col sm:flex-row items-center bg-stone-50/50 border border-stone-200/40 rounded-2xl sm:rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] gap-3 sm:gap-0">
          {/* Action Button */}
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1a1917] text-white rounded-xl sm:rounded-full font-semibold text-[15px] hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 shrink-0">
            Get 100X Code
          </button>

          {/* Command Area */}
          <div className="flex-1 flex items-center justify-between px-4 sm:px-8 w-full overflow-hidden">
            <code className="text-[13px] sm:text-[15px] font-mono flex items-center gap-2 sm:gap-3 tracking-tight overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className="text-emerald-600">npm</span>
              <span className="text-emerald-600">install</span>
              <span className="text-emerald-600 shrink-0">-g</span>
              <span className="text-stone-700/80 truncate">@nipurn/xprompt-new@latest</span>
            </code>
            
            <button 
              onClick={copyCommand}
              className="text-stone-300 hover:text-stone-600 transition-colors ml-2 sm:ml-4 shrink-0"
              aria-label="Copy install command"
            >
              {isCopied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-stone-400 font-body">
          Or read the{' '}
          <a 
            href="/docs" 
            className="text-stone-500 underline underline-offset-4 hover:text-emerald-500 transition-colors"
          >
            documentation
          </a>
        </p>
      </m.div>
    </div>
  );
}

