import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BaseTerminal from './BaseTerminal';
import { Globe, Search } from 'lucide-react';

const COMMAND = "Can you search the web for the latest Llama 3.2 Vision API docs and let me know if I need to update my code?";

export default function WebSearchTerminal() {
  const [phase, setPhase] = useState<'typing' | 'searching' | 'found'>('typing');
  const [typedCommand, setTypedCommand] = useState("");

  useEffect(() => {
    if (phase === 'typing') {
      if (typedCommand.length < COMMAND.length) {
        const timeout = setTimeout(() => {
          setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase('searching'), 600);
        return () => clearTimeout(timeout);
      }
    } else if (phase === 'searching') {
      const timeout = setTimeout(() => setPhase('found'), 2500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhase('typing');
        setTypedCommand("");
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [phase, typedCommand]);

  return (
    <BaseTerminal 
      title="100x-search - web"
      icon={Globe}
      gradient="from-cyan-500/10 via-transparent to-blue-500/10"
    >
      <div className="flex items-center gap-3 mb-4 min-h-[3em]">
        <span className="text-cyan-400">❯</span>
        <span className="text-white/90">
          {typedCommand}
          {phase === 'typing' && (
            <m.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 bg-cyan-500 ml-1 align-middle"
            />
          )}
        </span>
      </div>

      <div className="space-y-3 min-h-[160px]">
        <AnimatePresence mode="wait">
          {(phase === 'searching' || phase === 'found') && (
            <m.div
              key="search-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <Search className={`w-3.5 h-3.5 text-white/30 ${phase === 'searching' ? 'animate-bounce' : ''}`} />
                <span className="text-white/60">
                  {phase === 'searching' ? "Searching web..." : "Research complete."}
                </span>
              </div>

              <div className="pl-6 space-y-2 border-l border-white/5">
                <m.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] text-white/40 italic"
                >
                  {phase === 'searching' ? "Scanning docs.llama.com/3.2..." : "docs.llama.com indexed."}
                </m.div>
                
                {phase === 'found' && (
                  <m.div 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] text-emerald-400 font-bold"
                  >
                    [FOUND] Llama-3.2-Vision Spec (11B/90B)
                  </m.div>
                )}
              </div>

              {phase === 'found' && (
                <m.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white/5 border border-white/5 rounded-lg text-[11px] text-white/70 leading-relaxed"
                >
                  I've retrieved the latest vision spec. Would you like to update <span className="text-cyan-300">image_processor.py</span> to support the new multi-modal tokens?
                </m.div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </BaseTerminal>
  );
}

