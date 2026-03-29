import { useState } from 'react';
import { UserButton, useAuth } from '@clerk/clerk-react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { useIsMobile } from '../../hooks/useResponsive';
import Logo from '../icons/Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const { 
    goHome, 
    goToContact, 
    goToLogin, 
    goToModel, 
    goToFlash, 
    goToPricing, 
    goToBlog, 
    goToDocs, 
    goToCode, 
    goToInfrastructure 
  } = useNavigation();
  const { isSignedIn } = useAuth();

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
    setProductsExpanded(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 md:h-24 lg:h-28 bg-[hsl(var(--color-surface)/0.6)] backdrop-blur-2xl border-b border-white/5 z-50 flex items-center justify-between px-4 sm:px-6 md:px-16 transition-all">
        <div onClick={goHome} className="flex items-center gap-1.5 sm:gap-3 font-display font-bold text-[hsl(var(--color-text-primary))] hover:opacity-80 transition-opacity cursor-pointer">
          <Logo width={isMobile ? 70 : 140} height={isMobile ? 70 : 140} className="drop-shadow-2xl" />
          <span className="text-base sm:text-xl md:text-2xl tracking-tighter mt-1">100xprompt</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 font-body text-[13px] font-semibold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.1em]">
          <div className="relative group py-8">
            <button className="hover:text-[hsl(var(--color-text-primary))] transition-colors flex items-center gap-1 cursor-pointer outline-none text-[13px]">
              Meet 100xprompt <span className="opacity-40 text-[9px] mt-[0.5px] group-hover:rotate-180 transition-transform">▼</span>
            </button>
            
            <div className="absolute top-[calc(100%-10px)] left-0 w-[480px] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
              <div className="mt-2 bg-[hsl(var(--color-surface))] rounded-2xl shadow-2xl border border-[hsl(var(--color-border))] overflow-hidden flex p-8 gap-10 text-[hsl(var(--color-text-primary))] normal-case tracking-normal backdrop-blur-2xl">
                
                <div className="flex-[1.2]">
                  <h3 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em] mb-6">Products</h3>
                  <div className="flex flex-col gap-6">
                    <span onClick={() => handleNavClick(goToCode)} className="group/item cursor-pointer">
                      <div className="font-bold text-sm mb-1 group-hover/item:text-[#4aab6d] transition-colors">CLI</div>
                      <div className="text-xs text-[hsl(var(--color-text-muted))] leading-relaxed font-normal">Autonomous coding agent & deployment tools for air-gapped environments.</div>
                    </span>
                    <span onClick={() => handleNavClick(goToInfrastructure)} className="group/item cursor-pointer">
                      <div className="font-bold text-sm mb-1 group-hover/item:text-[#4aab6d] transition-colors">Infrastructure Layer</div>
                      <div className="text-xs text-[hsl(var(--color-text-muted))] leading-relaxed font-normal">On-premise, air-gapped, and sovereign cloud deployment stack.</div>
                    </span>
                  </div>
                </div>

                <div className="flex-1 border-l border-[hsl(var(--color-border))] pl-10">
                  <h3 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em] mb-6">Models</h3>
                  <div className="flex flex-col gap-5">
                    <div 
                      onClick={() => handleNavClick(goToModel)}
                      className="flex items-center justify-between group/link cursor-pointer hover:bg-[hsl(var(--color-surface-hover))] -mx-2 px-2 py-1.5 rounded-lg transition-all"
                    >
                      <span className="text-sm font-bold group-hover/link:text-[#4aab6d] transition-colors">100X Prompt Pro</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div 
                      onClick={() => handleNavClick(goToFlash)}
                      className="flex items-center justify-between group/link cursor-pointer hover:bg-[hsl(var(--color-surface-hover))] -mx-2 px-2 py-1.5 rounded-lg transition-all"
                    >
                      <span className="text-sm font-bold group-hover/link:text-[#4aab6d] transition-colors">100X Prompt Flash</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-40 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div onClick={goToPricing} className="hover:text-[hsl(var(--color-text-primary))] transition-colors cursor-pointer">Pricing</div>
          <div onClick={goToBlog} className="hover:text-[hsl(var(--color-text-primary))] transition-colors cursor-pointer">Blog</div>
          <div onClick={goToDocs} className="hover:text-[hsl(var(--color-text-primary))] transition-colors cursor-pointer">Docs</div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={goToContact} 
            className="hidden md:flex font-body text-[12px] font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest hover:text-[hsl(var(--color-text-primary))] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] px-5 py-2.5 rounded hover:bg-[hsl(var(--color-border-subtle))] hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))]"
          >
            Contact <span className="opacity-40 ml-2 font-mono bg-[hsl(var(--color-border))] px-1.5 py-0.5 rounded-sm">C</span>
          </button>
          {isSignedIn ? (
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonTrigger: "focus:shadow-[0_0_0_2px_hsl(var(--color-primary))]",
                }
              }}
              afterSignOutUrl="/"
            />
          ) : (
            <button 
              onClick={goToLogin}
              className="btn-primary font-body text-[12px] font-bold uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
            >
              Log In <span className="opacity-60 font-mono bg-white/20 px-1.5 py-0.5 rounded-sm ml-1 hidden sm:inline">L</span>
            </button>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 bg-[hsl(var(--color-background))]/95 backdrop-blur-xl z-40 lg:hidden overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              <button
                onClick={() => setProductsExpanded(!productsExpanded)}
                className="w-full flex items-center justify-between p-4 text-left text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-xl transition-colors"
              >
                <span className="font-semibold text-lg">Meet 100xprompt</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${productsExpanded ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {productsExpanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-4"
                  >
                    <div className="py-2 space-y-1">
                      <div className="text-xs font-bold text-[hsl(var(--color-text-muted))] uppercase tracking-widest px-4 py-2">Products</div>
                      <button onClick={() => handleNavClick(goToCode)} className="w-full text-left p-4 text-[hsl(var(--color-text-secondary))] hover:bg-white/5 rounded-xl transition-colors">
                        <div className="font-semibold">CLI</div>
                        <div className="text-sm text-[hsl(var(--color-text-muted))]">Autonomous coding agent</div>
                      </button>
                      <button onClick={() => handleNavClick(goToInfrastructure)} className="w-full text-left p-4 text-[hsl(var(--color-text-secondary))] hover:bg-white/5 rounded-xl transition-colors">
                        <div className="font-semibold">Infrastructure Layer</div>
                        <div className="text-sm text-[hsl(var(--color-text-muted))]">On-premise deployment</div>
                      </button>
                      
                      <div className="text-xs font-bold text-[hsl(var(--color-text-muted))] uppercase tracking-widest px-4 py-2 mt-4">Models</div>
                      <button onClick={() => handleNavClick(goToModel)} className="w-full text-left p-4 text-[hsl(var(--color-text-secondary))] hover:bg-white/5 rounded-xl transition-colors">
                        <div className="font-semibold">100X Prompt Pro</div>
                        <div className="text-sm text-[hsl(var(--color-text-muted))]">Flagship LLM</div>
                      </button>
                      <button onClick={() => handleNavClick(goToFlash)} className="w-full text-left p-4 text-[hsl(var(--color-text-secondary))] hover:bg-white/5 rounded-xl transition-colors">
                        <div className="font-semibold">100X Prompt Flash</div>
                        <div className="text-sm text-[hsl(var(--color-text-muted))]">Lightweight LLM</div>
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              <button onClick={() => handleNavClick(goToPricing)} className="w-full text-left p-4 text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-xl transition-colors font-semibold text-lg">
                Pricing
              </button>
              <button onClick={() => handleNavClick(goToBlog)} className="w-full text-left p-4 text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-xl transition-colors font-semibold text-lg">
                Blog
              </button>
              <button onClick={() => handleNavClick(goToDocs)} className="w-full text-left p-4 text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-xl transition-colors font-semibold text-lg">
                Docs
              </button>
              <button onClick={() => handleNavClick(goToContact)} className="w-full text-left p-4 text-[hsl(var(--color-text-primary))] hover:bg-white/5 rounded-xl transition-colors font-semibold text-lg md:hidden">
                Contact
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
