import { m } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import BaseTerminal from './BaseTerminal';
import { Terminal, CheckCircle2, FileCode, Braces, FileEdit, Eye, FolderOpen } from 'lucide-react';

const PROMPT = "Initialize a premium Next.js beauty e-commerce landing page for 'Aura Skin' with Tailwind CSS, Framer Motion, and editorial design system.";

const PHASE_ORDER = ['idle', 'typing', 'init', 'glob', 'install', 'read', 'tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'] as const;
type Phase = typeof PHASE_ORDER[number];

const PHASE_DELAY_MAP: Record<string, number> = {
  typing: 800,
  init: 3000,
  glob: 2500,
  install: 3000,
  read: 3500,
  tailwind: 5000,
  edit: 4000,
  layout: 4500,
  navbar: 5500,
  hero: 6000,
  products: 5500,
  features: 5000,
  footer: 4000,
  complete: 25000,
};

const VISIBLE_PHASES: Record<string, Phase[]> = {
  init: ['init', 'glob', 'install', 'read', 'tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  glob: ['glob', 'install', 'read', 'tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  install: ['install', 'read', 'tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  read: ['read', 'tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  tailwind: ['tailwind', 'edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  edit: ['edit', 'layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  layout: ['layout', 'navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  navbar: ['navbar', 'hero', 'products', 'features', 'footer', 'complete'],
  hero: ['hero', 'products', 'features', 'footer', 'complete'],
  products: ['products', 'features', 'footer', 'complete'],
  features: ['features', 'footer', 'complete'],
  footer: ['footer', 'complete'],
};

const isPhaseVisible = (currentPhase: Phase, targetPhase: Phase): boolean => {
  return VISIBLE_PHASES[targetPhase]?.includes(currentPhase) ?? false;
};

interface MainCodeTerminalProps {
  onPhaseChange?: (phase: string) => void;
}

export default function MainCodeTerminal({ onPhaseChange }: MainCodeTerminalProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedPrompt, setTypedPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const onPhaseChangeRef = useRef(onPhaseChange);

  useEffect(() => { onPhaseChangeRef.current = onPhaseChange; }, [onPhaseChange]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [phase, typedPrompt]);

  useEffect(() => { onPhaseChangeRef.current?.(phase); }, [phase]);

  useEffect(() => {
    if (phase === 'idle') {
      const t = setTimeout(() => setPhase('typing'), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'typing') {
      if (typedPrompt.length < PROMPT.length) {
        const t = setTimeout(() => setTypedPrompt(PROMPT.slice(0, typedPrompt.length + 1)), 35);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('init'), 800);
        return () => clearTimeout(t);
      }
    }
    const delay = PHASE_DELAY_MAP[phase];
    if (delay) {
      const t = setTimeout(() => {
        if (phase === 'complete') {
          setPhase('idle');
          setTypedPrompt("");
        } else {
          const nextIndex = PHASE_ORDER.indexOf(phase) + 1;
          if (nextIndex < PHASE_ORDER.length) setPhase(PHASE_ORDER[nextIndex]);
        }
      }, delay);
      return () => clearTimeout(t);
    }
  }, [phase, typedPrompt]);

  return (
    <BaseTerminal 
      title="100x-code — orchestrator"
      icon={Terminal}
      gradient="from-stone-400/10 via-transparent to-stone-300/10"
      headerColor="bg-[#0f0f0f]"
    >
      <div className="flex flex-col h-[550px]">
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4 space-y-6 font-mono text-[12px] leading-relaxed scroll-smooth"
        >
          {/* Input */}
          <div className="flex gap-3 min-h-[1.5em]">
            <span className="text-emerald-400 font-bold shrink-0">❯</span>
            <div className="text-white/90">
              {typedPrompt}
              {phase === 'typing' && (
                <m.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 h-4 bg-emerald-400 ml-1 align-middle"
                />
              )}
            </div>
          </div>

          {/* Execution Log */}
          {phase !== 'idle' && phase !== 'typing' && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Step 1: Init Project */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-violet-400 font-bold text-[11px]">↳ [Bash]</span>
                  <span className="text-white/50 text-[11px]">npx create-next-app@latest aura-skin --ts --tailwind --eslint --app --src-dir</span>
                </div>
                {isPhaseVisible(phase, 'init') && (
                  <div className="ml-6 space-y-1.5 text-white/30 text-[10px] font-normal">
                    <div className="text-emerald-400/60">✓ Created aura-skin/package.json</div>
                    <div className="text-emerald-400/60">✓ Created aura-skin/next.config.js</div>
                    <div className="text-emerald-400/60">✓ Created aura-skin/tsconfig.json</div>
                    <div className="text-emerald-400/60">✓ Created aura-skin/tailwind.config.ts</div>
                    <div className="text-emerald-400/60">✓ Created aura-skin/src/app/layout.tsx</div>
                    <div className="text-emerald-400/60">✓ Created aura-skin/src/app/page.tsx</div>
                  </div>
                )}
              </div>

              {/* Step 2: Glob - Find files */}
              {isPhaseVisible(phase, 'glob') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold text-[11px]">↳ [Glob]</span>
                    <span className="text-white/50 text-[11px]">src/**/*.{"{tsx,ts,css}"}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-white/30 text-[10px] font-normal">
                    <div className="text-cyan-400/60 flex items-center gap-2">
                      <FolderOpen className="w-3 h-3" />
                      <span>Found 6 files</span>
                    </div>
                    <div className="ml-5 space-y-0.5 text-white/25">
                      <div>src/app/layout.tsx</div>
                      <div>src/app/page.tsx</div>
                      <div>src/app/globals.css</div>
                      <div>tailwind.config.ts</div>
                      <div>next.config.js</div>
                      <div>tsconfig.json</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Install Dependencies */}
              {isPhaseVisible(phase, 'install') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-violet-400 font-bold text-[11px]">↳ [Bash]</span>
                    <span className="text-white/50 text-[11px]">npm install framer-motion lucide-react clsx tailwind-merge</span>
                  </div>
                  <div className="ml-6 space-y-1 text-white/30 text-[10px] font-normal">
                    <div className="text-emerald-400/60">✓ framer-motion@11.15.0</div>
                    <div className="text-emerald-400/60">✓ lucide-react@0.468.0</div>
                    <div className="text-emerald-400/60">✓ clsx@2.1.1</div>
                    <div className="text-emerald-400/60">✓ tailwind-merge@2.6.0</div>
                    <div className="text-stone-500">✔ 4 packages in 2.3s</div>
                  </div>
                </div>
              )}

              {/* Step 4: Read file */}
              {isPhaseVisible(phase, 'read') && (
                <ReadBlock
                  phase={phase}
                  currentPhase="read"
                  filename="src/app/globals.css"
                  content={`@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
:root {
  --aura-cream: #F9F6F2;
  --aura-charcoal: #1C1C1C;
  --aura-gold: #C9A962;
}

body {
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
}`}
                />
              )}

              {/* Step 5: Tailwind Config */}
              {isPhaseVisible(phase, 'tailwind') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="tailwind"
                  filename="tailwind.config.ts"
                  label="Design System"
                  icon={Braces}
                  code={`import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          cream: '#F9F6F2',
          sand: '#E8E1DA', 
          charcoal: '#1C1C1C',
          rose: '#F2E8E8',
          gold: '#C9A962',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
}
export default config`}
                />
              )}

              {/* Step 6: Edit globals.css */}
              {isPhaseVisible(phase, 'edit') && (
                <EditBlock
                  phase={phase}
                  currentPhase="edit"
                  filename="src/app/globals.css"
                  oldString="@tailwind base;"
                  newString={`@tailwind base;

/* AURA Design System - Custom Utilities */
@layer components {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-aura-charcoal to-aura-gold;
  }
  
  .glass-effect {
    @apply bg-white/80 backdrop-blur-md border border-white/20;
  }
}`}
                />
              )}

              {/* Step 7: Layout */}
              {isPhaseVisible(phase, 'layout') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="layout"
                  filename="src/app/layout.tsx"
                  label="Root Layout"
                  icon={FileCode}
                  code={`import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'AURA Skin | Premium Organic Skincare',
  description: 'Discover luxury skincare crafted with nature\\'s finest ingredients.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${cormorant.variable}\`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}`}
                />
              )}

              {/* Step 8: Navbar */}
              {isPhaseVisible(phase, 'navbar') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="navbar"
                  filename="src/components/Navbar.tsx"
                  label="Navigation"
                  icon={FileCode}
                  code={`'use client'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

const navLinks = ['Shop', 'Rituals', 'About', 'Journal']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={\`fixed w-full z-50 transition-all duration-500 
        \${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}\`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-aura-charcoal flex items-center justify-center">
            <span className="text-white font-serif font-semibold">A</span>
          </div>
          <span className="font-serif text-2xl tracking-wide text-aura-charcoal">AURA</span>
        </div>
        <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
          {navLinks.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`} className="hover:text-aura-charcoal transition-colors">
              {link}
            </a>
          ))}
        </div>
        <ShoppingBag className="w-5 h-5 text-aura-charcoal cursor-pointer hover:text-aura-gold transition-colors" />
      </div>
    </motion.nav>
  )
}`}
                />
              )}

              {/* Step 9: Hero */}
              {isPhaseVisible(phase, 'hero') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="hero"
                  filename="src/components/Hero.tsx"
                  label="Hero Section"
                  icon={FileCode}
                  code={`'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908"
          className="w-full h-full object-cover"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aura-charcoal/40 via-aura-charcoal/20 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-3xl px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
          <span className="text-[11px] text-white/80 font-medium ml-2">
            Trusted by 50,000+ customers
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-8xl font-serif text-white leading-[0.95] mb-8"
        >
          Radiance,<br/><span className="italic">Defined.</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <button className="group flex items-center gap-3 bg-white text-aura-charcoal px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-aura-gold hover:text-white transition-all duration-300">
            Shop Collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}`}
                />
              )}

              {/* Step 10: Products */}
              {isPhaseVisible(phase, 'products') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="products"
                  filename="src/components/ProductGrid.tsx"
                  label="Product Grid"
                  icon={FileCode}
                  code={`'use client'
import { motion } from 'framer-motion'

const products = [
  { name: "Pure Dew Serum", desc: "Hyaluronic Acid & Vitamin C", price: 48 },
  { name: "Silk Essence", desc: "Overnight Renewal Mask", price: 62 },
  { name: "Alpine Mist", desc: "Refreshing Facial Toner", price: 34 },
]

export function ProductGrid() {
  return (
    <section className="py-32 px-8 bg-aura-cream">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif text-aura-charcoal mb-16">The Essentials</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <motion.div 
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-xl bg-aura-sand">
                <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-aura-charcoal px-6 py-3 rounded-full text-[11px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Add to Bag
                </button>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-aura-charcoal">{product.name}</h3>
              <p className="text-[12px] text-stone-400 italic">{product.desc}</p>
              <span className="text-lg font-serif text-aura-charcoal">\${product.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`}
                />
              )}

              {/* Step 11: Features */}
              {isPhaseVisible(phase, 'features') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="features"
                  filename="src/components/Features.tsx"
                  label="Features Section"
                  icon={FileCode}
                  code={`'use client'
import { motion } from 'framer-motion'
import { Leaf, Heart, Shield } from 'lucide-react'

const features = [
  { icon: Leaf, title: "100% Organic", desc: "Responsibly sourced ingredients" },
  { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals" },
  { icon: Shield, title: "Dermatologist Tested", desc: "Clinically proven results" },
]

export function Features() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-5xl font-serif text-aura-charcoal max-w-2xl mx-auto mb-20 leading-tight">
          Harnessing nature's power, refined for your ritual.
        </h2>
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-aura-cream border border-aura-sand flex items-center justify-center mb-6">
                <f.icon className="w-7 h-7 text-aura-charcoal" />
              </div>
              <h3 className="text-lg font-bold text-aura-charcoal mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`}
                />
              )}

              {/* Step 12: Footer */}
              {isPhaseVisible(phase, 'footer') && (
                <FileWriteBlock
                  phase={phase}
                  currentPhase="footer"
                  filename="src/components/Footer.tsx"
                  label="Footer Component"
                  icon={FileCode}
                  code={`'use client'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-aura-charcoal py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-2">
            <span className="font-serif text-4xl text-white mb-6 block">AURA</span>
            <p className="text-stone-400 max-w-sm leading-relaxed mb-8">
              Join our community for early access to new launches and exclusive content.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-aura-gold transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6">Shop</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Serums</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Sets</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-[11px] text-stone-500 uppercase tracking-widest">
          <span>© 2026 AURA Skin. Built with 100x Code</span>
        </div>
      </div>
    </footer>
  )
}`}
                />
              )}

              {/* Final Complete */}
              {phase === 'complete' && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="pt-6 mt-6 border-t border-white/5"
                >
                  <div className="flex items-center gap-3 text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Build Successful — Live</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/30">
                    <span>Generated 8 files in 18.2s</span>
                    <span>Build time: 4.2s</span>
                  </div>
                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-bold">
                      <span>🚀</span>
                      <span>https://aura-skin.com</span>
                    </div>
                  </div>
                </m.div>
              )}
            </m.div>
          )}
        </div>
      </div>
    </BaseTerminal>
  );
}

function ReadBlock({ 
  phase, 
  currentPhase, 
  filename, 
  content
}: { 
  phase: string
  currentPhase: string
  filename: string
  content: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-amber-400 font-bold text-[11px]">↳ [Read]</span>
        <span className="text-white/50 text-[11px]">{filename}</span>
      </div>
      <div className="ml-6 rounded-lg border border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-amber-500/50" />
            <span className="text-[10px] text-white/50 font-medium">{filename}</span>
          </div>
          <div className="flex items-center gap-3">
            {phase === currentPhase && (
              <m.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[9px] text-cyan-400/70 font-bold"
              >
                READING...
              </m.div>
            )}
            <span className="text-[9px] text-white/30 font-bold">{content.split('\n').length} lines</span>
          </div>
        </div>
        <div className="py-3 px-4 text-white/35 text-[10px] overflow-auto max-h-[80px] font-mono leading-relaxed">
          <pre className="whitespace-pre-wrap break-all">{content}</pre>
        </div>
      </div>
    </div>
  );
}

function EditBlock({ 
  phase, 
  currentPhase, 
  filename, 
  oldString, 
  newString 
}: { 
  phase: string
  currentPhase: string
  filename: string
  oldString: string
  newString: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-rose-400 font-bold text-[11px]">↳ [Edit]</span>
        <span className="text-white/50 text-[11px]">{filename}</span>
      </div>
      <div className="ml-6 rounded-lg border border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileEdit className="w-3.5 h-3.5 text-rose-500/50" />
            <span className="text-[10px] text-white/50 font-medium">{filename}</span>
          </div>
          {phase === currentPhase && (
            <m.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-[9px] text-rose-400/70 font-bold"
            >
              EDITING...
            </m.div>
          )}
        </div>
        <div className="py-3 px-4 text-[10px] font-mono leading-relaxed space-y-2">
          <div className="text-red-400/50 line-through opacity-60">
            <span className="text-white/20 mr-2">-</span>
            {oldString}
          </div>
          <div className="text-emerald-400/70">
            <span className="text-white/20 mr-2">+</span>
            <pre className="whitespace-pre-wrap break-all inline">{newString}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileWriteBlock({ 
  phase, 
  currentPhase, 
  filename, 
  label, 
  code,
  icon: Icon = FileCode 
}: { 
  phase: string
  currentPhase: string
  filename: string
  label: string
  code: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  const [streamedCode, setStreamedCode] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const streamingRef = useRef(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isCurrentPhase = phase === currentPhase;

  const startStreaming = useRef(() => {
    if (streamingRef.current) return;
    streamingRef.current = true;
    indexRef.current = 0;
    
    setIsStreaming(true);
    setStreamedCode("");
    
    intervalRef.current = setInterval(() => {
      if (indexRef.current < code.length) {
        const chunkSize = Math.floor(Math.random() * 3) + 1;
        setStreamedCode(code.slice(0, indexRef.current + chunkSize));
        indexRef.current += chunkSize;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsStreaming(false);
        streamingRef.current = false;
      }
    }, 8);
  });

  const stopStreaming = useRef(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    streamingRef.current = false;
    setStreamedCode(code);
    setIsStreaming(false);
  });

  useEffect(() => {
    if (isCurrentPhase) {
      startStreaming.current();
    } else {
      stopStreaming.current();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCurrentPhase, code]);

  useEffect(() => {
    if (isStreaming && codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [streamedCode, isStreaming]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-emerald-400 font-bold text-[11px]">↳ [Write]</span>
        <span className="text-white/50 text-[11px]">{filename}</span>
        <span className="text-white/20 text-[10px]">— {label}</span>
      </div>
      <div className="ml-6 rounded-lg border border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-emerald-500/50" />
            <span className="text-[10px] text-white/50 font-medium">{filename}</span>
          </div>
          <div className="flex items-center gap-3">
            {isStreaming && (
              <m.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[9px] text-amber-400/70 font-bold"
              >
                WRITING...
              </m.div>
            )}
            <span className="text-[9px] text-emerald-500/50 font-bold">NEW FILE</span>
          </div>
        </div>
        <div className="py-3 px-4 text-white/35 text-[10px] overflow-auto max-h-[120px] font-mono leading-relaxed">
          <pre ref={codeRef} className="whitespace-pre-wrap break-all">
            {streamedCode}
            {isStreaming && (
              <m.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-1.5 h-3 bg-amber-400 ml-0.5 align-middle"
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
