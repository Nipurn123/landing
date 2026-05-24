import { m } from 'framer-motion';
import { Check, Github, Loader2, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useSignIn, useSignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigation } from '../../context/NavigationContext';
import Logo from '../icons/Logo';
import { Seo } from '../../seo';

export default function LoginView() {
  const { goHome, goToDocs, goToBlog, goToPricing } = useNavigation();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (strategy: 'oauth_google' | 'oauth_github' | 'oauth_linkedin_oidc') => {
    if (!isSignInLoaded || !isSignUpLoaded) return;
    setIsLoading(strategy.split('_')[1]);
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (error: any) {
      // If user doesn't exist yet, Clerk throws an error — fall back to signUp
      if (error?.errors?.[0]?.code === 'form_identifier_not_found' || 
          error?.errors?.[0]?.code === 'external_account_not_found') {
        try {
          await signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/',
          });
        } catch (signUpError) {
          console.error(`${strategy} sign-up error:`, signUpError);
          setIsLoading(null);
        }
      } else {
        console.error(`${strategy} sign-in error:`, error);
        setIsLoading(null);
      }
    }
  };

  return (
    <>
      <Seo pageKey="login" />
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col lg:flex-row w-full font-body bg-white selection:bg-[#ff5a1f]/20 selection:text-[#ff5a1f] relative overflow-hidden"
      >
        {/* Dark Panel - Only visible on large screens */}
        <div className="hidden lg:flex lg:w-[55%] bg-[#050505] text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 relative overflow-hidden flex-shrink-0 flex-col">
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_top_right,rgba(255,90,31,0.08),transparent_70%)] pointer-events-none" />
          
          <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={goHome}>
            <Logo width={100} height={100} className="sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] drop-shadow-[0_0_20px_rgba(74,171,109,0.25)]" />
            <span className="font-display font-extrabold text-xl sm:text-2xl lg:text-4xl tracking-tighter text-white pt-1 sm:pt-2">100xprompt</span>
          </div>

          <div className="max-w-xl z-10 relative">
            <h1 className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] mb-4 sm:mb-5 tracking-tight !text-white">
              Build on the<br />
              <span className="text-[#ff5a1f]">100X Engine</span>
            </h1>

            <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 font-light leading-relaxed">
              Sovereign AI software & CLI. Accelerate training, fine-tuning and inference within your secure perimeter.
            </p>

            <div className="space-y-3 sm:space-y-4 text-[12px] sm:text-[13px] md:text-[13px] lg:text-[15px] text-gray-400">
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5a1f] mt-0.5 sm:mt-1 shrink-0" strokeWidth={3} />
                <p>Train models directly on your proprietary data</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5a1f] mt-0.5 sm:mt-1 shrink-0" strokeWidth={3} />
                <p>Zero data leakage. 100% sovereign deployments</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5a1f] mt-0.5 sm:mt-1 shrink-0" strokeWidth={3} />
                <p>Reliably serve models with unmatched price-performance</p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-auto lg:pt-8 z-10 relative">
            <p className="text-[9px] sm:text-[10px] text-gray-500 mb-3 sm:mb-4 font-medium uppercase tracking-wider">Trusted by enterprises worldwide</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { label: 'SOC 2', sublabel: 'Compliant' },
                { label: 'ISO', sublabel: '27001' },
                { label: 'GDPR', sublabel: 'Ready' },
                { label: 'DPDP', sublabel: 'Compliant' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-white font-semibold text-[10px] sm:text-xs">{badge.label}</span>
                  <span className="text-gray-400 text-[8px] sm:text-[10px]">{badge.sublabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login Panel */}
        <div className="w-full lg:w-[45%] bg-white flex flex-col relative min-h-screen overflow-y-auto">
          
          {/* Mobile Logo - Only visible on small screens */}
          <div className="lg:hidden pt-6 sm:pt-8 px-6 sm:px-8 mb-4">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={goHome}>
              <Logo width={100} height={100} className="drop-shadow-[0_0_15px_rgba(74,171,109,0.2)]" />
              <span className="font-display font-extrabold text-2xl tracking-tighter text-gray-900 pt-1">100xprompt</span>
            </div>
          </div>
          
          <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 flex items-center gap-4 sm:gap-6 font-body text-[11px] sm:text-[12px] lg:text-[13px] text-gray-600 font-medium z-20">
            <button onClick={goHome} className="hover:text-gray-900 transition-colors">Home</button>
            <button onClick={goToDocs} className="hover:text-gray-900 transition-colors hidden sm:block">Docs</button>
            <button onClick={goToBlog} className="hover:text-gray-900 transition-colors hidden sm:block">Blog</button>
            <button onClick={goToPricing} className="hover:text-gray-900 transition-colors hidden sm:block">Pricing</button>
          </div>

          <div className="m-auto w-full max-w-[380px] sm:max-w-[420px] px-6 sm:px-8 py-16 sm:py-20">
            <SignedIn>
              <div className="text-center">
                <h2 className="font-body text-[26px] sm:text-[32px] font-medium text-gray-900 tracking-tight mb-2">You're signed in</h2>
                <p className="font-body text-[14px] sm:text-[15px] text-gray-600 mb-6 sm:mb-8">Head to your dashboard or continue exploring</p>
                <button 
                  onClick={goHome}
                  className="w-full bg-[#ff5a1f] text-white font-body text-[13px] sm:text-[14px] font-semibold py-3 sm:py-3.5 px-4 rounded hover:bg-[#e04a15] transition-colors shadow-[0_2px_10px_rgba(255,90,31,0.2)]"
                >
                  Go to Home
                </button>
              </div>
            </SignedIn>

            <SignedOut>
              <h2 className="font-body text-[26px] sm:text-[32px] font-medium text-gray-900 tracking-tight mb-2">Let's get started</h2>
              <p className="font-body text-[14px] sm:text-[15px] text-gray-600 mb-6 sm:mb-8">Sign in with your preferred provider</p>

              <div className="flex flex-col gap-3 sm:gap-4">
                <button 
                  onClick={() => handleOAuthSignIn('oauth_google')}
                  disabled={isLoading !== null}
                  className="w-full bg-white border border-gray-200 text-gray-800 font-body text-[13px] sm:text-[14px] font-semibold py-3 sm:py-3.5 px-4 rounded hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading === 'google' ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 animate-spin text-gray-600" />
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  Continue with Google
                </button>

                <button 
                  onClick={() => handleOAuthSignIn('oauth_github')}
                  disabled={isLoading !== null}
                  className="w-full bg-white border border-gray-200 text-gray-800 font-body text-[13px] sm:text-[14px] font-semibold py-3 sm:py-3.5 px-4 rounded hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading === 'github' ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 animate-spin text-gray-600" />
                  ) : (
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 text-gray-800" />
                  )}
                  Continue with GitHub
                </button>

                <button 
                  onClick={() => handleOAuthSignIn('oauth_linkedin_oidc')}
                  disabled={isLoading !== null}
                  className="w-full bg-white border border-gray-200 text-gray-800 font-body text-[13px] sm:text-[14px] font-semibold py-3 sm:py-3.5 px-4 rounded hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 relative shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading === 'linkedin' ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 animate-spin text-gray-600" />
                  ) : (
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 text-[#0A66C2]" />
                  )}
                  Continue with LinkedIn
                </button>
              </div>

              <div className="mt-8 sm:mt-12 text-[11px] sm:text-[12px] leading-relaxed text-gray-500 font-body">
                By signing up, I agree to the <a href="/privacy" className="text-[#ff5a1f] hover:underline">100xprompt privacy policy</a> and <a href="/terms" className="text-[#ff5a1f] hover:underline">terms of service</a>
              </div>
            </SignedOut>
          </div>
        </div>
      </m.div>
    </>
  );
}
