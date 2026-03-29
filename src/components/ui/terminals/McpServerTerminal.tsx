import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BaseTerminal from './BaseTerminal';
import { Box, Zap } from 'lucide-react';

const COMMAND = "Show me which MCP servers are available and connect to the ones I need for this project.";

export default function McpServerTerminal() {
  const [phase, setPhase] = useState<'typing' | 'listing' | 'connecting' | 'synced'>('typing');
  const [typedCommand, setTypedCommand] = useState("");

  useEffect(() => {
    if (phase === 'typing') {
      if (typedCommand.length < COMMAND.length) {
        const timeout = setTimeout(() => {
          setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase('listing'), 600);
        return () => clearTimeout(timeout);
      }
    } else if (phase === 'listing') {
      const timeout = setTimeout(() => setPhase('connecting'), 2000);
      return () => clearTimeout(timeout);
    } else if (phase === 'connecting') {
      const timeout = setTimeout(() => setPhase('synced'), 3000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhase('typing');
        setTypedCommand("");
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [phase, typedCommand]);

  return (
    <BaseTerminal 
      title="100x-mcp — natural-language"
      icon={Box}
      gradient="from-violet-500/10 via-transparent to-purple-500/10"
    >
      <div className="flex items-center gap-3 mb-4 min-h-[4em]">
        <span className="text-violet-400">❯</span>
        <span className="text-white/90">
          {typedCommand}
          {phase === 'typing' && (
            <m.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 bg-violet-500 ml-1 align-middle"
            />
          )}
        </span>
      </div>

      <div className="space-y-4 min-h-[220px]">
        <AnimatePresence mode="wait">
          {phase !== 'typing' && (
            <m.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {phase === 'listing' && (
                <div className="space-y-2">
                  <div className="text-white/60">• Found 3 compatible servers:</div>
                  <div className="pl-4 text-violet-400 text-[11px] font-mono">
                    - postgres-mcp (Database)<br />
                    - slack-mcp (Notifications)<br />
                    - github-mcp (Source Control)
                  </div>
                  <div className="text-white/40 italic mt-2 italic">"Connecting to all 3 now..."</div>
                </div>
              )}

              {(phase === 'connecting' || phase === 'synced') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className={`w-3.5 h-3.5 text-violet-400 ${phase === 'connecting' ? 'animate-pulse' : ''}`} />
                    <span className="text-white/60">
                      {phase === 'connecting' ? "Establishing handshake..." : "MCP Network Active"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: "postgres-mcp", status: "CONNECTED", color: "text-emerald-400" },
                      { name: "slack-mcp", status: "CONNECTED", color: "text-emerald-400" },
                      { name: "github-mcp", status: "AUTHORIZED", color: "text-blue-400" }
                    ].map((server) => (
                      <div key={server.name} className="flex justify-between items-center p-2 bg-white/[0.03] border border-white/5 rounded-md text-[11px]">
                        <span className="font-bold text-white/80">{server.name}</span>
                        <span className={`font-mono text-[9px] ${phase === 'connecting' ? 'text-white/20' : server.color}`}>
                          {phase === 'connecting' ? "WAITING" : server.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </BaseTerminal>
  );
}


