import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BaseTerminal from './BaseTerminal';
import { Terminal, GitBranch, Brain, Cpu, Play, Circle } from 'lucide-react';

interface Session {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'waiting';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SESSIONS: Session[] = [
  { id: 'sandbox', name: 'Sandbox', status: 'running', icon: Terminal, color: 'emerald' },
  { id: 'git', name: 'Git Operations', status: 'running', icon: GitBranch, color: 'violet' },
  { id: 'memory', name: 'Memory Core', status: 'running', icon: Brain, color: 'amber' },
];

export default function MultiSessionTerminal() {
  const [activeSession, setActiveSession] = useState(0);
  const [sandboxPhase, setSandboxPhase] = useState(0);
  const [gitPhase, setGitPhase] = useState(0);
  const [memoryPhase, setMemoryPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSession((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSandboxPhase((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGitPhase((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryPhase((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const sandboxContent = [
    {
      command: 'npm run build',
      output: [
        '✓ Compiled successfully in 2.4s',
        '✓ 1,247 modules transformed',
        '✓ Build output: dist/',
        '→ Watching for changes...'
      ]
    },
    {
      command: 'npm run test',
      output: [
        'PASS src/utils/format.test.ts',
        'PASS src/hooks/useAuth.test.ts',
        'PASS src/components/Button.test.tsx',
        'Tests: 47 passed, 0 failed (3.2s)'
      ]
    },
    {
      command: 'npx tsc --noEmit',
      output: [
        '✓ No type errors found',
        'Checked 234 files in 1.8s',
        '→ Type check passed'
      ]
    },
    {
      command: 'npm run lint',
      output: [
        '✓ src/app/layout.tsx',
        '✓ src/components/Navbar.tsx',
        '✓ src/lib/utils.ts',
        'Lint: 0 errors, 0 warnings'
      ]
    },
    {
      command: 'node scripts/seed-db.js',
      output: [
        '→ Connecting to sandbox DB...',
        '✓ Seeded 150 products',
        '✓ Seeded 48 users',
        '✓ Sandbox database ready'
      ]
    }
  ];

  const gitContent = [
    {
      command: 'git checkout -b feature/auth-system',
      output: [
        'Switched to new branch feature/auth-system',
        '→ Branch created from main'
      ]
    },
    {
      command: 'git add src/auth/',
      output: [
        '✓ src/auth/login.ts (new)',
        '✓ src/auth/middleware.ts (new)',
        '✓ src/auth/session.ts (new)',
        '→ 3 files staged'
      ]
    },
    {
      command: 'git commit -m "Add OAuth authentication"',
      output: [
        '[feature/auth-system d4f2a8c]',
        'Add OAuth authentication',
        ' 3 files changed, 342 insertions(+)',
        '→ Commit created'
      ]
    },
    {
      command: 'gh pr create --title "Add OAuth" --body ""',
      output: [
        '✓ Created pull request #47',
        'https://github.com/repo/pull/47',
        '→ CI checks running...',
        '✓ All checks passed'
      ]
    }
  ];

  const memoryContent = [
    {
      title: 'Session 1 — Learning Preferences',
      input: 'Create a button component',
      action: 'User specified: "Use named exports, 2-space indent, Tailwind"',
      stored: [
        'exports: named',
        'indent: 2 spaces', 
        'styling: Tailwind CSS',
        'components: functional'
      ]
    },
    {
      title: 'Session 2 — Applying Memory',
      input: 'Create a Card component',
      action: 'Automatically applied stored preferences',
      code: `export function Card({ children }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      {children}
    </div>
  )
}`,
      note: '← Used named export + 2-space indent (not explicitly asked)'
    },
    {
      title: 'Session 3 — Cross-Project Memory',
      input: 'Set up new project',
      action: 'Recalled preferences from previous sessions',
      applied: [
        '✓ TypeScript strict mode',
        '✓ Named exports convention',
        '✓ 2-space indentation',
        '✓ Tailwind CSS setup'
      ]
    },
    {
      title: 'Memory Dashboard',
      total: 47,
      categories: [
        { name: 'Code Style', count: 12 },
        { name: 'Project Config', count: 8 },
        { name: 'User Preferences', count: 15 },
        { name: 'API Patterns', count: 12 }
      ]
    }
  ];

  return (
    <BaseTerminal
      title="100x-code — session orchestrator"
      icon={Cpu}
      gradient="from-stone-400/10 via-transparent to-stone-300/10"
      headerColor="bg-[#0f0f0f]"
    >
      <div className="flex flex-col h-[450px]">
        {/* Session Tabs */}
        <div className="flex border-b border-white/5 bg-[#0a0a0a]">
          {SESSIONS.map((session, i) => (
            <button
              key={session.id}
              onClick={() => setActiveSession(i)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-medium border-b-2 transition-all ${
                activeSession === i
                  ? `border-${session.color}-500 text-${session.color}-400 bg-white/[0.02]`
                  : 'border-transparent text-white/40 hover:text-white/60'
              }`}
            >
              <session.icon className="w-3.5 h-3.5" />
              <span>{session.name}</span>
              <Circle 
                className={`w-1.5 h-1.5 fill-${session.color}-500 text-${session.color}-500 ${
                  session.status === 'running' ? 'animate-pulse' : ''
                }`} 
              />
            </button>
          ))}
        </div>

        {/* Active Sessions Indicator */}
        <div className="px-4 py-2 bg-white/[0.01] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-white/30">Active Sessions:</span>
            {SESSIONS.map((s, i) => (
              <span 
                key={s.id}
                className={`flex items-center gap-1.5 ${activeSession === i ? 'text-white/60' : 'text-white/30'}`}
              >
                <Circle className={`w-1.5 h-1.5 fill-${s.color}-500 text-${s.color}-500`} />
                {s.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-[10px]">
            <Play className="w-3 h-3" />
            <span>3 parallel</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden p-4 font-mono text-[12px]">
          <AnimatePresence mode="wait">
            {/* Sandbox Session */}
            {activeSession === 0 && (
              <m.div
                key="sandbox"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <Terminal className="w-3 h-3" />
                  Sandbox Environment
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-emerald-400 font-bold shrink-0">❯</span>
                    <span className="text-white/70">{sandboxContent[sandboxPhase].command}</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    {sandboxContent[sandboxPhase].output.map((line, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`text-[11px] ${
                          line.startsWith('✓') ? 'text-emerald-400/70' :
                          line.startsWith('→') ? 'text-amber-400/70' :
                          line.startsWith('PASS') ? 'text-emerald-400/70' :
                          'text-white/40'
                        }`}
                      >
                        {line}
                      </m.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-[10px] text-white/40 mb-2">
                    <Cpu className="w-3 h-3" />
                    Sandbox Resources
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-emerald-400 font-bold">4GB</div>
                      <div className="text-[9px] text-white/30">Memory</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">2 vCPU</div>
                      <div className="text-[9px] text-white/30">Compute</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">Isolated</div>
                      <div className="text-[9px] text-white/30">Network</div>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {/* Git Session */}
            {activeSession === 1 && (
              <m.div
                key="git"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-violet-400 text-[10px] font-bold uppercase tracking-wider">
                  <GitBranch className="w-3 h-3" />
                  Git Operations
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-emerald-400 font-bold shrink-0">❯</span>
                    <span className="text-white/70">{gitContent[gitPhase].command}</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    {gitContent[gitPhase].output.map((line, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`text-[11px] ${
                          line.startsWith('✓') ? 'text-emerald-400/70' :
                          line.startsWith('→') ? 'text-amber-400/70' :
                          line.startsWith('[') ? 'text-violet-400/70' :
                          line.includes('pull') ? 'text-cyan-400/70' :
                          'text-white/40'
                        }`}
                      >
                        {line}
                      </m.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2 text-white/40">
                      <GitBranch className="w-3 h-3" />
                      <span>Current: feature/auth-system</span>
                    </div>
                    <div className="flex items-center gap-3 text-[9px]">
                      <span className="text-emerald-400/70">+342</span>
                      <span className="text-red-400/70">-12</span>
                    </div>
                  </div>
                </div>
              </m.div>
            )}

            {/* Memory Session */}
            {activeSession === 2 && (
              <m.div
                key="memory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <Brain className="w-3 h-3" />
                  {memoryContent[memoryPhase].title}
                </div>

                <div className="space-y-3">
                  {/* Session 1: Learning */}
                  {memoryPhase === 0 && (
                    <>
                      <div className="flex gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">❯</span>
                        <span className="text-white/70">{memoryContent[0].input}</span>
                      </div>
                      <div className="ml-6 text-[11px] text-amber-400/70 mb-3">
                        {memoryContent[0].action}
                      </div>
                      <div className="ml-6 space-y-1.5">
                        <div className="text-[10px] text-white/40 mb-2">Stored to memory:</div>
                        {memoryContent[0].stored?.map((item, i) => (
                          <m.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[11px] text-emerald-400/70 font-mono"
                          >
                            → {item}
                          </m.div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Session 2: Applying */}
                  {memoryPhase === 1 && (
                    <>
                      <div className="flex gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">❯</span>
                        <span className="text-white/70">{memoryContent[1].input}</span>
                      </div>
                      <div className="ml-6 text-[11px] text-amber-400/70 mb-3">
                        {memoryContent[1].action}
                      </div>
                      <div className="ml-6 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <pre className="text-[10px] text-white/50 font-mono leading-relaxed whitespace-pre">
                          {memoryContent[1].code}
                        </pre>
                      </div>
                      <div className="ml-6 text-[10px] text-cyan-400/70">
                        {memoryContent[1].note}
                      </div>
                    </>
                  )}

                  {/* Session 3: Cross-Project */}
                  {memoryPhase === 2 && (
                    <>
                      <div className="flex gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">❯</span>
                        <span className="text-white/70">{memoryContent[2].input}</span>
                      </div>
                      <div className="ml-6 text-[11px] text-amber-400/70 mb-3">
                        {memoryContent[2].action}
                      </div>
                      <div className="ml-6 space-y-1.5">
                        {memoryContent[2].applied?.map((item, i) => (
                          <m.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[11px] text-emerald-400/70"
                          >
                            {item}
                          </m.div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Session 4: Dashboard */}
                  {memoryPhase === 3 && (
                    <div className="space-y-4">
                      <div className="text-[11px] text-white/50 mb-2">
                        Total preferences learned: <span className="text-amber-400 font-bold">{memoryContent[3].total}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {memoryContent[3].categories?.map((cat, i) => (
                          <m.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                          >
                            <div className="text-amber-400 font-bold text-lg">{cat.count}</div>
                            <div className="text-[9px] text-white/40">{cat.name}</div>
                          </m.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2 text-white/40">
                      <Brain className="w-3 h-3" />
                      <span>Memory persists across all sessions</span>
                    </div>
                    <div className="text-amber-400/70 text-[9px]">128K context</div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BaseTerminal>
  );
}
