import { m } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

const LinkItem = ({ label, url, indented = false }: { label: string; url: string; indented?: boolean }) => (
  <div className={`${indented ? 'pl-4' : ''} group cursor-pointer py-0.5`}>
    <span className="text-white">[{label}]</span>
    <span className="text-[#555] font-normal">({url})</span>
  </div>
);

const MarkdownButton = ({ label, url }: { label: string; url: string }) => (
  <div className="group cursor-pointer py-1 w-fit">
    <span className="text-white font-bold">[{label}]</span>
    <span className="text-[#555] font-normal">({url})</span>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#888] text-sm leading-relaxed pl-2">- {children}</p>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#888] text-sm leading-relaxed">{children}</p>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#4aab6d] text-sm italic pl-4 border-l-2 border-[#4aab6d] my-2">{children}</p>
);

export default function AiView() {
  const { goHome } = useNavigation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('md-content')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Seo pageKey="machine" breadcrumbs={NAVIGATION_BREADCRUMBS.machine} />
      <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen bg-black text-[#888] font-mono selection:bg-[#333] selection:text-white overflow-x-hidden"
    >
      <div className="max-w-[1200px] mx-auto min-h-screen flex relative">
        
        <button 
          onClick={handleCopy}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[#555] hover:text-white transition-colors z-50 p-2"
          title="Copy All"
        >
          {copied ? <Check className="w-5 h-5 text-[#4aab6d]" /> : <Copy className="w-5 h-5" />}
        </button>

        <div id="md-content" className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20 space-y-8 sm:space-y-10 md:space-y-12">
          
          {/* HEADER */}
          <section className="space-y-6">
            <h1 
              onClick={goHome}
              className="text-sm sm:text-base tracking-widest uppercase mb-3 sm:mb-4 cursor-pointer hover:opacity-80 transition-opacity w-fit"
              style={{ color: '#ffffff' }}
            >
              100XPROMPT
            </h1>
            
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[#888] text-xs sm:text-sm">For Enterprise | Government | Developers</p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#ffffff' }}># The full-stack sovereign AI platform</h2>
              <Paragraph>Your CLI. Your models. Your infrastructure. <span className="text-[#4aab6d]">Nothing leaves the building.</span></Paragraph>
            </div>

            <div className="space-y-1 pt-2">
              <MarkdownButton label="START BUILDING" url="https://100xprompt.com/login" />
              <MarkdownButton label="READ DOCS" url="https://100xprompt.com/docs" />
            </div>
          </section>

          {/* MISSION */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># Built from a belief, not a business plan.</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#4aab6d' }}>## The Problem: A Question That Changed Everything</h3>
                <Paragraph>Why does the world's AI infrastructure run on third-party servers? Why do enterprises send their most sensitive data abroad just to get intelligent answers? We knew there had to be a better way.</Paragraph>
                <Quote>"Sovereignty isn't a feature. It's the only way we build."</Quote>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#4aab6d' }}>## The Vision: The Global Sovereign AI Backbone</h3>
                <Paragraph>We set out to build something unprecedented - an AI stack where sovereignty isn't a feature you pay extra for, but the very ground you stand on. Your data. Your models. Your infrastructure.</Paragraph>
                <Quote>"Your data belongs to you. We're just making that technically possible."</Quote>
              </div>
            </div>
          </section>

          {/* ARCHITECTURE */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># The Sovereign Stack</h2>
            <Paragraph>Three layers. Complete control. Zero leakage.</Paragraph>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Layer 1 - 100X Code (Software)</h3>
                <Paragraph>Agentic CLI. Terminal-native. Your developer. A powerful command-line interface that enables seamless AI interaction across your entire stack.</Paragraph>
                <MarkdownButton label="EXPLORE 100X CODE" url="https://100xprompt.com/code" />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Layer 2 - The Brain (LLM)</h3>
                <Paragraph>LLM orchestration. Self-hosted. Your models. Fine-tuned on your proprietary data, optimized for your domain, outperforming closed-source.</Paragraph>
                <MarkdownButton label="EXPLORE MODELS" url="https://100xprompt.com/model" />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Layer 3 - The Servers (Infrastructure)</h3>
                <Paragraph>GPU deployment. Private infra. Your compute. We setup the end-to-end compute orchestration tailored for your enterprise scale.</Paragraph>
                <MarkdownButton label="EXPLORE INFRASTRUCTURE" url="https://100xprompt.com/infrastructure" />
              </div>
            </div>
          </section>

          {/* MODELS */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># Sovereign Models</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## 100X Prompt Pro - Flagship LLM</h3>
                <Paragraph>Extreme precision. Deep reasoning. The gold standard for enterprise intelligence.</Paragraph>
                <div className="space-y-1 pl-2">
                  <ListItem>Base Model: GLM-5 (Zhipu AI)</ListItem>
                  <ListItem>Quantization: FP8 Flash Attention 3</ListItem>
                  <ListItem>Context Window: 128K tokens</ListItem>
                  <ListItem>Active Parameters: ~30B (MoE)</ListItem>
                  <ListItem>Deployment: SGLang / vLLM</ListItem>
                  <ListItem>Compliance: DPDP Act 2023</ListItem>
                  <ListItem>Latency: &lt;800ms first token @ H100</ListItem>
                </div>
                <MarkdownButton label="LEARN MORE" url="https://100xprompt.com/pro" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## 100X Prompt Flash - Lightweight LLM</h3>
                <Paragraph>Fast. Efficient. Sovereign. Optimized for speed and high-throughput workloads.</Paragraph>
                <div className="space-y-1 pl-2">
                  <ListItem>Base Model: Qwen3.5 27B</ListItem>
                  <ListItem>Quantization: FP8 Flash Attention 3</ListItem>
                  <ListItem>Context Window: 128K tokens</ListItem>
                  <ListItem>Active Parameters: 27B</ListItem>
                  <ListItem>Deployment: SGLang / vLLM</ListItem>
                  <ListItem>Compliance: DPDP Act 2023</ListItem>
                  <ListItem>Latency: &lt;500ms first token @ A100</ListItem>
                </div>
                <MarkdownButton label="LEARN MORE" url="https://100xprompt.com/flash" />
              </div>
            </div>
          </section>

          {/* HOW WE BUILD */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># How We Build Sovereign Models</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#4aab6d' }}>### 1. Purged - Clean Foundation</h3>
                <Paragraph>Removed all harmful, biased, and non-compliant data from base model. Privacy-regulation-ready from day one.</Paragraph>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#4aab6d' }}>### 2. Fine-Tuned - Your Domain</h3>
                <Paragraph>Trained on your proprietary enterprise data. Legal. Finance. Medical. Yours. Sovereign intelligence.</Paragraph>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#4aab6d' }}>### 3. FP8 Quantized - Efficient Power</h3>
                <Paragraph>Full precision performance at half the VRAM. Runs on your infrastructure today. No cloud dependency.</Paragraph>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># Invest in Sovereignty</h2>
            <Paragraph>No hidden fees. No data leakage. No vendor lock-in. Custom pricing tailored to your enterprise needs.</Paragraph>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Flash - Speed-first inference</h3>
                <Paragraph>High-speed inference for production workloads. Sub-100ms responses for real-time applications.</Paragraph>
                <div className="space-y-1 pl-2">
                  <ListItem>Optimized for low latency</ListItem>
                  <ListItem>High throughput API access</ListItem>
                  <ListItem>Production-ready infrastructure</ListItem>
                  <ListItem>Standard support</ListItem>
                  <ListItem>99.5% uptime SLA</ListItem>
                </div>
                <p className="text-[#aaa] text-sm font-semibold">Pricing: Custom</p>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Pro - Enterprise intelligence <span className="text-[#4aab6d]">(Most Popular)</span></h3>
                <Paragraph>Deep reasoning capabilities. Sovereign AI for legal, financial, and medical workloads.</Paragraph>
                <div className="space-y-1 pl-2">
                  <ListItem>Extended context window</ListItem>
                  <ListItem>Deep reasoning mode</ListItem>
                  <ListItem>Fine-tuning on your data</ListItem>
                  <ListItem>Priority support</ListItem>
                  <ListItem>99.9% uptime SLA</ListItem>
                  <ListItem>On-premise deployment option</ListItem>
                  <ListItem>DPDP compliance toolkit</ListItem>
                </div>
                <p className="text-[#aaa] text-sm font-semibold">Pricing: Custom</p>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#ffffff' }}>## Enterprise - Sovereign infrastructure</h3>
                <Paragraph>Air-gapped deployment. Your datacenter. Your rules. Complete sovereignty.</Paragraph>
                <div className="space-y-1 pl-2">
                  <ListItem>Unlimited scale</ListItem>
                  <ListItem>Air-gapped deployment</ListItem>
                  <ListItem>Custom model training</ListItem>
                  <ListItem>Dedicated infrastructure</ListItem>
                  <ListItem>24/7 dedicated support</ListItem>
                  <ListItem>Custom SLA</ListItem>
                  <ListItem>Security audit support</ListItem>
                  <ListItem>On-site training</ListItem>
                </div>
                <p className="text-[#aaa] text-sm font-semibold">Pricing: Custom</p>
              </div>
            </div>

             <MarkdownButton label="VIEW FULL PRICING" url="https://100xprompt.com/pricing" />
          </section>

          {/* TESTIMONIALS */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># Trusted Globally</h2>
            <Paragraph>Real stories from real users building the sovereign AI future</Paragraph>
            
            <div className="space-y-4">
              <div className="space-y-1 pl-4 border-l border-[#333]">
                <Paragraph>"The conversational AI understood our native language perfectly. For the first time, technology feels like it was built for us, not adapted for us."</Paragraph>
                <p className="text-[#666] text-xs">- Priya Sharma, Village Entrepreneur, Rajasthan</p>
              </div>

              <div className="space-y-1 pl-4 border-l border-[#333]">
                <Paragraph>"We process 10 million queries daily in 22 languages. The infrastructure just works. Zero downtime, complete sovereignty."</Paragraph>
                <p className="text-[#666] text-xs">- Dr. Anand Kumar, CTO, State Government, Karnataka</p>
              </div>

              <div className="space-y-1 pl-4 border-l border-[#333]">
                <Paragraph>"My grandmother can now access government services in her native language. This is what digital empowerment should feel like."</Paragraph>
                <p className="text-[#666] text-xs">- Rahul Verma, Social Worker, Bihar</p>
              </div>

              <div className="space-y-1 pl-4 border-l border-[#333]">
                <Paragraph>"The data sovereignty guarantee gave us confidence. We finally have AI that respects our boundaries."</Paragraph>
                <p className="text-[#666] text-xs">- Meera Patel, Banking CISO, Gujarat</p>
              </div>

              <div className="space-y-1 pl-4 border-l border-[#333]">
                <Paragraph>"Training custom models on our regional datasets was seamless. The token factory is revolutionary."</Paragraph>
                <p className="text-[#666] text-xs">- Arjun Reddy, ML Engineer, Telangana</p>
              </div>
            </div>
          </section>

          {/* SECURITY */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}># Enterprise-grade Security</h2>
            <Paragraph>Built in from day one.</Paragraph>
            
            <div className="space-y-1 pl-2">
              <ListItem>SOC-II Type 2 Certified</ListItem>
              <ListItem>ISO 27001 Compliant</ListItem>
              <ListItem>DPDP Act 2023 Ready</ListItem>
            </div>
          </section>

          {/* RESOURCES */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-white text-xs sm:text-sm tracking-widest uppercase">RESOURCES</h2>
            <div className="space-y-1">
              <LinkItem label="About" url="https://100xprompt.com/about" />
              <LinkItem label="Pricing" url="https://100xprompt.com/pricing" />
              <LinkItem label="Documentation" url="https://100xprompt.com/docs" />
              <LinkItem label="Blog" url="https://100xprompt.com/blog" />
            </div>
          </section>

          {/* LEGAL */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: '#ffffff' }}>LEGAL</h2>
            <div className="space-y-1">
              <LinkItem label="Privacy Policy" url="https://100xprompt.com/privacy" />
              <LinkItem label="Terms of Use" url="https://100xprompt.com/terms" />
              <LinkItem label="Contact Sales" url="https://100xprompt.com/contact" />
            </div>
          </section>

          {/* CTA */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-base sm:text-lg font-bold" style={{ color: '#ffffff' }}>Ready to own your AI infrastructure?</h2>
            <p className="text-[#666] text-sm leading-relaxed">Sovereign, secure, and scaled for the world.</p>
            
            <MarkdownButton label="START THE CONVERSATION" url="https://100xprompt.com/contact" />
          </section>

          {/* CONTACT */}
          <section className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#222]">
            <h2 className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: '#ffffff' }}>CONTACT</h2>
            <div className="space-y-1">
              <LinkItem label="CONTACT" url="https://100xprompt.com/contact" />
              <LinkItem label="LOG IN" url="https://100xprompt.com/login" />
            </div>
          </section>

        </div>
      </div>
    </m.div>
    </>
  );
}
