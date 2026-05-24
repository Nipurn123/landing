import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { m } from 'framer-motion';
import Logo from '../icons/Logo';

export default function WorkspaceRedirect() {
  const { user } = useUser();
  const [status, setStatus] = useState<string | null>('checking');
  const [isWakingUp, setIsWakingUp] = useState(false);

  useEffect(() => {
    if (!user) return;
    checkStatus();
  }, [user]);

  const checkStatus = async () => {
    if (!user) return;
    setStatus('checking');
    try {
      const userId = user.id.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 32);
      const res = await fetch(`https://app.100xprompt.com/api/workspace/status/${userId}`);
      const data = await res.json();

      if (data.status === 'running') {
        setStatus('running');
        redirectToWorkspace(userId);
      } else {
        setStatus('stopped');
      }
    } catch (err) {
      console.error(err);
      setStatus('stopped');
    }
  };

  const redirectToWorkspace = async (userId: string) => {
    const workspaceUrl = `https://workspace-${userId}.app.100xprompt.com`;
    
    // Poll for SSL / network readiness
    let attempts = 0;
    while (attempts < 60) {
      try {
        await fetch(`${workspaceUrl}/health`, { mode: 'no-cors' });
        await new Promise(r => setTimeout(r, 2000));
        window.location.href = workspaceUrl;
        return;
      } catch (e) {
        // Not ready yet
      }
      await new Promise(r => setTimeout(r, 2500));
      attempts++;
    }
    
    window.location.href = workspaceUrl;
  };

  const handleWakeUp = async () => {
    if (!user) return;
    setIsWakingUp(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress || "user@example.com";
      const userId = user.id.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 32);
      
      await fetch("https://app.100xprompt.com/api/workspace/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email })
      });
      
      setStatus('running');
      redirectToWorkspace(userId);
    } catch (err) {
      console.error(err);
      setIsWakingUp(false);
    }
  };

  if (status === 'checking' || isWakingUp || status === 'running') {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--color-background))] text-[hsl(var(--color-text-primary))]">
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[hsl(var(--color-primary))] border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold font-display mb-2 text-center tracking-tight">
          {isWakingUp ? 'Waking up your Workspace' : (status === 'running' ? 'Connecting to Workspace' : 'Checking Workspace Status')}
        </h2>
        <p className="text-[hsl(var(--color-text-muted))] font-body animate-pulse text-center max-w-md mx-auto">
          {isWakingUp || status === 'running' ? 'Provisioning secure container & issuing SSL certificate...' : 'Please wait a moment while we locate your container...'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[hsl(var(--color-background))] text-[hsl(var(--color-text-primary))]">
      {/* Simple Header */}
      <nav className="fixed top-0 left-0 right-0 bg-[hsl(var(--color-surface)/0.8)] backdrop-blur-md border-b border-[hsl(var(--color-border))] z-50 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3 font-display font-bold">
          <Logo width={32} height={32} />
          <span className="text-xl tracking-tight mt-1">100xprompt</span>
        </div>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            }
          }}
          afterSignOutUrl="/"
        />
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-16">
        <div className="max-w-md w-full bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] p-12 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-[hsl(var(--color-primary)/0.1)] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[hsl(var(--color-primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-4 tracking-tight">Workspace is Sleeping</h1>
          <p className="text-[hsl(var(--color-text-muted))] font-body mb-10 leading-relaxed text-sm">
            Your secure container was put to sleep to conserve resources after 30 minutes of inactivity. Your files and data are completely safe.
          </p>
          
          <button 
            onClick={handleWakeUp}
            className="w-full bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-[hsl(var(--color-background))] font-bold uppercase tracking-widest py-4 rounded-xl transition-colors font-body shadow-[0_0_20px_hsl(var(--color-primary)/0.3)]"
          >
            Wake Up Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
