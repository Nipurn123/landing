import { useState } from 'react';
import { UserButton, useAuth } from '@clerk/clerk-react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { useCurrentBreakpoint } from '../../hooks/useResponsive';
import Logo from '../icons/Logo';
import { useUser } from '@clerk/clerk-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const breakpoint = useCurrentBreakpoint();
  
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
  const { user } = useUser();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
    setProductsExpanded(false);
  };

  const handleGoToWorkspace = async () => {
    if (!user) return;
    setIsCreatingWorkspace(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress || "user@example.com";
      // Sanitize clerk ID to be k8s compatible
      const userId = user.id.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 32);
      
      await fetch("https://app.100xprompt.com/api/workspace/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email })
      });
      
      const workspaceUrl = `https://workspace-${userId}.app.100xprompt.com`;

      // Poll until the workspace is fully ready and SSL is provisioned
      const checkReady = async () => {
        try {
          const statusRes = await fetch(`https://app.100xprompt.com/api/workspace/status/${userId}`);
          const statusData = await statusRes.json();
          
          if (statusData.status === 'running') {
            // Verify SSL and networking by doing a no-cors fetch to the workspace health endpoint
            try {
              await fetch(`${workspaceUrl}/health`, { mode: 'no-cors' });
              // If we didn't throw, it means network & SSL are fully ready!
              return true;
            } catch (e) {
              return false;
            }
          }
          return false;
        } catch (e) {
          return false;
        }
      };

      // Poll every 2.5 seconds for up to ~2.5 minutes
      let attempts = 0;
      while (attempts < 60) {
        if (await checkReady()) {
          // Extra buffer to ensure frontend files are completely available
          await new Promise(r => setTimeout(r, 2000));
          window.location.href = workspaceUrl;
          return;
        }
        await new Promise(r => setTimeout(r, 2500));
        attempts++;
      }
      
      // Fallback
      window.location.href = workspaceUrl;
    } catch (err) {
      console.error("Failed to create workspace", err);
      // Fallback
      const userId = user.id.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 32);
      window.location.href = `https://workspace-${userId}.app.100xprompt.com`;
    } finally {
      setIsCreatingWorkspace(false);
    }
  };

  const getNavbarStyles = () => {
    const baseStyles = {
      height: '64px',
      paddingX: '16px',
      logoSize: 60,
      titleSize: '16px',
      navTextSize: '11px',
      gap: '24px',
      buttonPadding: '8px 16px',
      buttonFontSize: '10px',
    };

    switch (breakpoint) {
      case 'mobile':
        return { ...baseStyles };
      case 'tablet':
        return {
          ...baseStyles,
          height: '72px',
          paddingX: '24px',
          logoSize: 70,
          titleSize: '18px',
          navTextSize: '11px',
          gap: '28px',
          buttonPadding: '10px 20px',
          buttonFontSize: '11px',
        };
      case 'laptop':
        return {
          ...baseStyles,
          height: '80px',
          paddingX: '48px',
          logoSize: 90,
          titleSize: '20px',
          navTextSize: '12px',
          gap: '32px',
          buttonPadding: '10px 20px',
          buttonFontSize: '11px',
        };
      case 'desktop':
        return {
          ...baseStyles,
          height: '88px',
          paddingX: '64px',
          logoSize: 100,
          titleSize: '22px',
          navTextSize: '12px',
          gap: '36px',
          buttonPadding: '12px 24px',
          buttonFontSize: '12px',
        };
      case 'desktopLg':
        return {
          ...baseStyles,
          height: '96px',
          paddingX: '80px',
          logoSize: 110,
          titleSize: '24px',
          navTextSize: '13px',
          gap: '40px',
          buttonPadding: '12px 28px',
          buttonFontSize: '12px',
        };
      case 'ultrawide':
        return {
          ...baseStyles,
          height: '104px',
          paddingX: '96px',
          logoSize: 120,
          titleSize: '26px',
          navTextSize: '14px',
          gap: '48px',
          buttonPadding: '14px 32px',
          buttonFontSize: '13px',
        };
      default:
        return baseStyles;
    }
  };

  const styles = getNavbarStyles();

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 bg-[hsl(var(--color-surface)/0.6)] backdrop-blur-2xl border-b border-white/5 z-50 flex items-center justify-between transition-all"
        style={{ height: styles.height, paddingLeft: styles.paddingX, paddingRight: styles.paddingX }}
      >
        <div onClick={goHome} className="flex items-center gap-1.5 sm:gap-3 font-display font-bold text-[hsl(var(--color-text-primary))] hover:opacity-80 transition-opacity cursor-pointer">
          <Logo width={styles.logoSize} height={styles.logoSize} className="drop-shadow-2xl" />
          <span className="tracking-tighter mt-1" style={{ fontSize: styles.titleSize }}>100xprompt</span>
        </div>
        
        <div className="hidden lg:flex items-center font-body font-semibold text-[hsl(var(--color-text-secondary))] uppercase tracking-[0.1em]" style={{ gap: styles.gap, fontSize: styles.navTextSize }}>
          <div className="relative group py-8">
            <button className="hover:text-[hsl(var(--color-text-primary))] transition-colors flex items-center gap-1 cursor-pointer outline-none">
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
        
        <div className="flex items-center" style={{ gap: '12px' }}>
          <button 
            onClick={goToContact} 
            className="hidden md:flex font-body font-bold text-[hsl(var(--color-text-secondary))] uppercase tracking-widest hover:text-[hsl(var(--color-text-primary))] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded hover:bg-[hsl(var(--color-border-subtle))] hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))]"
            style={{ padding: styles.buttonPadding, fontSize: styles.buttonFontSize }}
          >
            Contact <span className="opacity-40 ml-2 font-mono bg-[hsl(var(--color-border))] px-1.5 py-0.5 rounded-sm">C</span>
          </button>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoToWorkspace}
                disabled={isCreatingWorkspace}
                className="btn-primary font-body font-bold uppercase tracking-widest rounded flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))] disabled:opacity-50"
                style={{ padding: styles.buttonPadding, fontSize: styles.buttonFontSize }}
              >
                {isCreatingWorkspace ? "Loading..." : "Go to Workspace"}
              </button>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonTrigger: "focus:shadow-[0_0_0_2px_hsl(var(--color-primary))]",
                  }
                }}
                afterSignOutUrl="/"
              />
            </div>
          ) : (
            <button 
              onClick={goToLogin}
              className="btn-primary font-body font-bold uppercase tracking-widest rounded flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-background))]"
              style={{ padding: styles.buttonPadding, fontSize: styles.buttonFontSize }}
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
            className="fixed inset-0 bg-[hsl(var(--color-background))]/95 backdrop-blur-xl z-40 lg:hidden overflow-y-auto"
            style={{ top: styles.height }}
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
      <AnimatePresence>
        {isCreatingWorkspace && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white"
          >
            <m.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-[#4aab6d] border-t-transparent rounded-full mb-6"
            />
            <h2 className="text-2xl font-bold font-display mb-2">Preparing your Workspace</h2>
            <p className="text-white/60 font-body animate-pulse">
              Provisioning secure container & issuing SSL certificate...
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
