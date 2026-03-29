import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import BaseTerminal from './BaseTerminal';
import { Database, Loader2, AlertCircle } from 'lucide-react';

const PROMPT = "Find where the race condition occurs in the payment webhook handler.";

export default function DeepScanTerminal() {
  const [phase, setPhase] = useState<'typing' | 'scanning' | 'found'>('typing');
  const [typedPrompt, setTypedPrompt] = useState("");

  useEffect(() => {
    if (phase === 'typing') {
      if (typedPrompt.length < PROMPT.length) {
        const timeout = setTimeout(() => {
          setTypedPrompt(PROMPT.slice(0, typedPrompt.length + 1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase('scanning'), 800);
      }
    } else if (phase === 'scanning') {
      setTimeout(() => setPhase('found'), 2500);
    } else if (phase === 'found') {
      setTimeout(() => {
        setPhase('typing');
        setTypedPrompt("");
      }, 8000);
    }
  }, [phase, typedPrompt]);

  return (
    <BaseTerminal 
      title="100x-context — deep-scan"
      icon={Database}
      gradient="from-blue-500/10 via-transparent to-indigo-500/10"
    >
      <div className="space-y-4 font-mono text-[13px] leading-relaxed">
        {/* User Prompt */}
        <div className="flex gap-3">
          <span className="text-blue-400 shrink-0 font-bold">❯</span>
          <div className="text-white/90">
            {typedPrompt}
            {phase === 'typing' && (
              <m.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-4 bg-blue-500 ml-1 align-middle"
              />
            )}
          </div>
        </div>

        {/* Continuous Workflow */}
        <div className="space-y-4 pl-6 border-l border-white/5 ml-1">
          {phase !== 'typing' && (
            <m.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-white/40">
                {phase === 'scanning' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500/50" />
                ) : (
                  <span className="text-blue-500/50">✔</span>
                )}
                <span>Scanning "webhook", "payment", "race condition"...</span>
              </div>

              <div className="flex flex-wrap gap-2 opacity-40 text-[10px]">
                {['src/api/webhooks.ts', 'src/db/transactions.ts', 'src/services/stripe.ts'].map((file, i) => (
                  <m.span 
                    key={file}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="border border-white/20 px-1.5 py-0.5 rounded"
                  >
                    {file}
                  </m.span>
                ))}
              </div>
            </m.div>
          )}

          {phase === 'found' && (
            <m.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/[0.03] border border-white/5 rounded-lg space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Root Cause Identified</span>
              </div>
              <div className="text-white/70 text-[12px] leading-relaxed">
                Database update in <span className="text-blue-300">transactions.ts:142</span> is not wrapped in a transaction, leading to inconsistent state during concurrent retries.
              </div>
              <div className="pt-2 flex gap-3">
                <button className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded font-bold hover:bg-emerald-500/20 transition-colors">Apply Transaction Fix</button>
                <button className="text-[10px] bg-white/5 text-white/40 border border-white/10 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Explain Issue</button>
              </div>
            </m.div>
          )}
        </div>
      </div>
    </BaseTerminal>
  );
}
