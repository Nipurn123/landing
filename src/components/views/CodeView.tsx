import { m } from 'framer-motion';
import { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import CliHero from '../ui/CliHero';
import { Check, Users, Cpu, Globe, Box } from 'lucide-react';

import MainCodeTerminal from '../ui/terminals/MainCodeTerminal';
import OrchestratorTerminal from '../ui/terminals/OrchestratorTerminal';
import MultiSessionTerminal from '../ui/terminals/MultiSessionTerminal';
import WebSearchTerminal from '../ui/terminals/WebSearchTerminal';
import McpServerTerminal from '../ui/terminals/McpServerTerminal';
import LivePreview from '../ui/terminals/LivePreview';

import CodeFeatures from '../features/code/CodeFeatures';
import CTASection from '../sections/CTASection';
import { Seo, codeAppSchema, NAVIGATION_BREADCRUMBS } from '../../seo';

const highlights = [
  "Zero data leakage",
  "128K context window",
  "20+ languages",
  "On-premise deployment"
];

export default function CodeView() {
  const [currentPhase, setCurrentPhase] = useState('idle');

  return (
    <MainLayout>
      <Seo pageKey="code" breadcrumbs={NAVIGATION_BREADCRUMBS.code} schema={codeAppSchema} />
      <main className="flex-grow bg-white">
        <CliHero />

        <div className="relative max-w-7xl mx-auto px-6 pb-40">
          
          {/* Main Terminal Section */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-32 sm:mb-40"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-4">Command Center</h2>
              <p className="text-stone-500 max-w-xl mx-auto px-4">Your autonomous co-pilot for high-performance development, living on your infrastructure.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="w-full">
                <MainCodeTerminal onPhaseChange={setCurrentPhase} />
              </div>
              <div className="w-full lg:sticky lg:top-24">
                <LivePreview phase={currentPhase} />
              </div>
            </div>
          </m.div>

          {/* Highlights */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-32"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {highlights.map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-stone-50 border border-stone-200/60 text-sm text-stone-600 font-medium font-body shadow-sm"
                >
                  <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                  {item}
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Core Capabilities Grid */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-4">Advanced Capabilities</h2>
              <p className="text-stone-500 max-w-2xl mx-auto">From parallel agent orchestration to global codebase awareness and external tool integration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Parallel Agents */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="px-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-3">
                    <Users className="w-3 h-3" />
                    Parallel
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Agent Orchestration</h3>
                  <p className="text-sm text-stone-500 mt-2">Specialized sub-agents executing complex tasks in parallel.</p>
                </div>
                <OrchestratorTerminal />
              </m.div>

              {/* Web Search */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="px-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-[10px] font-bold tracking-widest uppercase mb-3">
                    <Globe className="w-3 h-3" />
                    Live Web
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Research & Search</h3>
                  <p className="text-sm text-stone-500 mt-2">Real-time access to documentation and APIs across the web.</p>
                </div>
                <WebSearchTerminal />
              </m.div>

              {/* MCP Servers */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="px-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-[10px] font-bold tracking-widest uppercase mb-3">
                    <Box className="w-3 h-3" />
                    MCP Protocol
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Tool Integration</h3>
                  <p className="text-sm text-stone-500 mt-2">Connect to your Slack, GitHub, and Databases securely.</p>
                </div>
                <McpServerTerminal />
              </m.div>
            </div>
          </div>

          {/* Global Context Section - Full Width */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                <Cpu className="w-3 h-3" />
                Multi-Session
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-4">Parallel Execution</h2>
              <p className="text-stone-500 max-w-xl mx-auto">Run multiple sessions simultaneously with shared memory and isolated sandboxes.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <MultiSessionTerminal />
            </div>
          </m.div>

          {/* Features Grid */}
          <CodeFeatures />

          {/* CTA Section */}
          <CTASection />
        </div>
      </main>
    </MainLayout>
  );
}
