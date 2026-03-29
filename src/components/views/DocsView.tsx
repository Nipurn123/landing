import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import MainLayout from '../layout/MainLayout';
import CTASection from '../sections/CTASection';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type TabId = 'api' | 'cli' | 'infra' | 'agents';

const tabs: { id: TabId; label: string; shortLabel?: string }[] = [
  { id: 'api', label: 'API' },
  { id: 'cli', label: 'CLI' },
  { id: 'infra', label: 'Infrastructure', shortLabel: 'Infra' },
  { id: 'agents', label: 'Agents' }
];

const codeExamples: Record<TabId, { code: string; language: string }> = {
  api: {
    language: 'python',
    code: `import hundredxprompt as hxp

client = hxp.Client(api_key="...", model="pro")

response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Explain DPDP compliance"}],
    temperature=0.7
)`
  },
  cli: {
    language: 'bash',
    code: `$ npm install -g @100xprompt/cli
$ 100xprompt auth login
$ 100xprompt deploy --model pro --region asia-south1
✓ Deployment complete!`
  },
  infra: {
    language: 'yaml',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: 100xprompt-api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: gcr.io/100xprompt/api:latest`
  },
  agents: {
    language: 'python',
    code: `from hundredxprompt.agents import Agent, Tool

agent = Agent(
    name="Compliance Monitor",
    tools=[search_db, send_alert],
    model="pro"
)

result = await agent.run("Check violations")`
  }
};

export default function DocsView() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('api');

  const handleNotify = async () => {
    if (!email) return;
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/docs-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setNotified(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Failed to join waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Seo pageKey="docs" breadcrumbs={NAVIGATION_BREADCRUMBS.docs} />
      
      <main className="flex-grow pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[45%]"
            >
              <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[hsl(var(--color-text-muted))] tracking-[0.2em] sm:tracking-[0.25em] mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse bg-[hsl(var(--color-primary))]" />
                Documentation
              </div>
              
              <h1 className="text-[clamp(2rem,6vw,4.8rem)] leading-[1.08] tracking-[-0.025em] sm:tracking-[-0.03em] text-[hsl(var(--color-text-primary))] mb-6 sm:mb-8 font-normal" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Coming <span className="text-[hsl(var(--color-primary))]">Soon</span>
              </h1>
              
              <p className="text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.4] sm:leading-[1.35] text-[hsl(var(--color-text-secondary))] mb-8 sm:mb-10 md:mb-12 max-w-xl font-body">
                Everything you need to integrate, deploy, and scale sovereign AI infrastructure.
                <span className="text-[hsl(var(--color-primary))] font-medium"> Your models. Your rules.</span>
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8 sm:mb-10">
                {[
                  { label: 'API Reference', desc: 'REST & GraphQL' },
                  { label: 'CLI Tools', desc: 'One-command deploy' },
                  { label: 'Infrastructure', desc: 'Kubernetes' },
                  { label: 'Agent Framework', desc: 'Autonomous AI' }
                ].map((item, i) => (
                  <m.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary)/0.3)] transition-all duration-300"
                  >
                    <p className="text-xs sm:text-sm font-medium text-[hsl(var(--color-text-primary))] font-body">{item.label}</p>
                    <p className="text-[10px] sm:text-xs text-[hsl(var(--color-text-muted))] mt-0.5">{item.desc}</p>
                  </m.div>
                ))}
              </div>
              
              {notified ? (
                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[hsl(var(--color-primary)/0.1)] border border-[hsl(var(--color-primary)/0.2)]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-[hsl(var(--color-primary))] flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="sm:w-4 sm:h-4">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-[hsl(var(--color-text-primary))] font-body">You're on the list!</p>
                    <p className="text-[10px] sm:text-xs text-[hsl(var(--color-text-muted))]">We'll notify you when docs launch.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] text-[hsl(var(--color-text-primary))] placeholder:text-[hsl(var(--color-text-muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] focus:border-transparent transition-all font-body text-sm"
                  />
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNotify}
                    disabled={loading}
                    className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-[hsl(var(--color-background))] bg-[hsl(var(--color-text-primary))] hover:bg-[hsl(220_20%_20%)] transition-all font-body text-[12px] sm:text-[13px] uppercase tracking-wider sm:tracking-widest disabled:opacity-50 whitespace-nowrap"
                  >
                    {loading ? 'Joining...' : 'Notify Me'}
                  </m.button>
                </div>
              )}
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-[55%] flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[600px]">
                <div className="absolute inset-0 bg-[hsl(var(--color-primary))] opacity-5 blur-[60px] sm:blur-[80px] rounded-full -z-10" />
                
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[hsl(var(--color-border))] bg-[hsl(220_20%_7%)]"
                >
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[hsl(220_20%_10%)] border-b border-[hsl(var(--color-border)/0.5)]">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                    </div>
                    
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-[hsl(220_20%_15%)] rounded-md sm:rounded-lg p-0.5 sm:p-1 overflow-x-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-[11px] font-mono font-medium transition-all whitespace-nowrap ${
                            activeTab === tab.id
                              ? 'bg-[hsl(var(--color-primary)/0.2)] text-[hsl(var(--color-primary))]'
                              : 'text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))]'
                          }`}
                        >
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.shortLabel || tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative min-h-[180px] sm:min-h-[220px]">
                    <AnimatePresence mode="wait">
                      <m.pre
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="p-3 sm:p-5 text-[11px] sm:text-[13px] text-[hsl(var(--color-text-secondary))] font-mono leading-[1.5] sm:leading-[1.6] overflow-x-auto"
                      >
                        <code>{codeExamples[activeTab].code}</code>
                      </m.pre>
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[hsl(220_20%_9%)] border-t border-[hsl(var(--color-border)/0.5)]">
                    <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-[hsl(var(--color-text-muted))] font-mono">
                      <span>{codeExamples[activeTab].language}</span>
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[hsl(var(--color-primary))]" />
                        Ready
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-[hsl(var(--color-text-muted))] font-mono">v1.0.0</span>
                  </div>
                </m.div>
                
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[hsl(var(--color-primary)/0.05)] to-transparent pointer-events-none" />
              </div>
            </m.div>
          </div>
        </div>
      </main>

      <CTASection />
    </MainLayout>
  );
}
