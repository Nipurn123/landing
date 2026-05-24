import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function SsoCallback() {
  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-[#ff5a1f]/20">
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#ff5a1f] animate-spin" />
          <span className="text-white/60 text-sm font-mono">Completing sign in...</span>
        </div>
      </m.div>

      {/* Clerk handles the actual callback processing and redirect in the background */}
      <div className="hidden">
        <AuthenticateWithRedirectCallback 
          signInUrl="/login"
          signUpUrl="/login"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
