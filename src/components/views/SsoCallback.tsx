import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function SsoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      fetch('/api/sso-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
      })
        .then(() => navigate('/'))
        .catch((err) => {
          console.error('SSO callback error:', err);
          navigate('/login');
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-[#ff5a1f] animate-spin" />
        <span className="text-white/60 text-sm font-mono">Completing sign in...</span>
      </div>
    </m.div>
  );
}
