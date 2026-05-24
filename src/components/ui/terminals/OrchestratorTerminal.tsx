import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BaseTerminal from './BaseTerminal';
import { Users } from 'lucide-react';

const COMMAND = "Hey, analyze the codebase using three specialized sub-agents to refactor auth, optimize DB, and run a security audit.";

export default function OrchestratorTerminal() {
  const [phase, setPhase] = useState<'typing' | 'executing' | 'complete'>('typing');
  const [typedCommand, setTypedCommand] = useState("");

  useEffect(() => {
    if (phase === 'typing') {
      if (typedCommand.length < COMMAND.length) {
        const timeout = setTimeout(() => {
          setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase('executing'), 600);
        return () => clearTimeout(timeout);
      }
    } else if (phase === 'executing') {
      const timeout = setTimeout(() => setPhase('complete'), 3000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhase('typing');
        setTypedCommand("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [phase, typedCommand]);

  return (
    <BaseTerminal 
      title="100x-parallel - orchestrator"
      icon={Users}
      gradient="from-emerald-500/10 via-transparent to-blue-500/10"
    >
      <div className="flex items-center gap-3 mb-6 min-h-[1.5em]">
        <span className="text-emerald-500/80">❯</span>
        <span className="text-white/90">
          {typedCommand}
          {phase === 'typing' && (
            <m.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 bg-emerald-500 ml-1 align-middle"
            />
          )}
        </span>
      </div>

      <div className="space-y-4 min-h-[220px]">
        <AnimatePresence mode="wait">
          {(phase === 'executing' || phase === 'complete') && (
            <m.div 
              key="execution-log"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Orchestrator */}
              <div className="flex items-center gap-3 text-emerald-400">
                <span className="text-emerald-500/30">◆</span>
                <span className="font-bold">Orchestrator:</span>
                <span className="text-white/60 italic">
                  {phase === 'executing' ? "Delegating tasks..." : "Tasks complete."}
                </span>
              </div>

              {/* Sub-agents */}
              <div className="pl-6 space-y-4 mt-4 border-l border-white/5">
                {/* Agent 1 */}
                <m.div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">↳ [UI-Agent]</span>
                    <span className="text-white/40">Refactoring Auth components...</span>
                    {phase === 'executing' ? (
                      <m.span 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-blue-400/60"
                      >●</m.span>
                    ) : (
                      <span className="text-emerald-500 text-[10px]">SUCCESS</span>
                    )}
                  </div>
                  <div className="pl-4 text-[10px] text-white/20">Using Tailwind & Framer Motion optimization...</div>
                </m.div>

                {/* Agent 2 */}
                <m.div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400">↳ [DB-Agent]</span>
                    <span className="text-white/40">Analyzing slow queries...</span>
                    {phase === 'executing' ? (
                      <m.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-2.5 h-2.5 border-t border-r border-purple-400/40 rounded-full"
                      />
                    ) : (
                      <span className="text-emerald-500 text-[10px]">SUCCESS</span>
                    )}
                  </div>
                  <div className="pl-4 text-[10px] text-white/20">Modified 3 indexes, reduced latency by 140ms</div>
                </m.div>

                {/* Agent 3 */}
                <m.div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-orange-400">↳ [Sec-Agent]</span>
                    <span className="text-white/40">Scanning OWASP Top 10...</span>
                    {phase === 'executing' ? (
                      <m.span 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-orange-400/60"
                      >●</m.span>
                    ) : (
                      <span className="text-emerald-500 text-[10px]">SUCCESS</span>
                    )}
                  </div>
                  <div className="pl-4 text-[10px] text-white/20">0 critical vulnerabilities found</div>
                </m.div>
              </div>

              {/* Summary */}
              {phase === 'complete' && (
                <m.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/30"
                >
                  Parallel execution complete. All tasks synced in 4.2s.
                  <br />
                  <span className="text-emerald-500/50">Total Tokens Saved: 12.4k (Cache reuse hit)</span>
                </m.div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </BaseTerminal>
  );
}

