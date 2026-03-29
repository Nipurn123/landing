import { useEffect, useState } from 'react';
import { Database, FileText, Lock, Globe, ShieldAlert, Activity, Zap, Server } from 'lucide-react';

export function CinematicOverlay({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'waiting' | 'animating' | 'returning'>('waiting');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('animating'), 500);
    const t2 = setTimeout(() => setStage('returning'), 10000); // Extended time for complex animation
    const t3 = setTimeout(onComplete, 11500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (stage === 'waiting') return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto cursor-pointer perspective-[2000px] overflow-hidden"
      onClick={onComplete}
    >
      {/* Background Dimmer */}
      <div className={`absolute inset-0 bg-black/98 transition-opacity duration-1500 ${stage === 'returning' ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Background Grid Particles */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000 ${stage === 'returning' ? 'opacity-0' : ''}`}>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-green-dark)_0%,transparent_70%)] opacity-20" />
      </div>

      <div className="relative w-[1100px] h-[850px] flex flex-col items-center justify-center">

        {/* TOP SECTION - Ingestion Visuals */}
        <div className={`bg-[#050505] border border-white/10 rounded-t-[40px] flex flex-col justify-center items-center overflow-hidden shadow-[0_0_150px_rgba(26,107,58,0.2)] z-20 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
              ${stage === 'animating' ? 'w-[1000px] h-[450px] opacity-100 scale-100 translate-y-0' : 'w-[450px] h-[600px] opacity-0 scale-90 translate-y-[100px]'}
            `}>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-green-dark)] opacity-[0.08] blur-[150px] rounded-full" />
          
          <div className="flex flex-col items-center z-10 w-full px-20">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-green-dark)]" />
               <div className="px-4 py-1.5 rounded-full border border-[var(--color-green-dark)]/50 bg-[var(--color-green-dark)]/10 text-[var(--color-green-light)] text-[11px] font-bold tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(26,107,58,0.3)]">
                 LIVE INGESTION ENGINE
               </div>
               <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-green-dark)]" />
            </div>

            <div className="relative w-full h-[280px] flex flex-col items-center">
              
              {/* Source Nodes */}
              <div className="flex justify-between w-[700px] z-30 relative">
                
                {/* External APIs */}
                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <Globe className="w-8 h-8 text-gray-500 animate-pulse" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-green-dark)]/30" />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-4 tracking-[0.2em] font-bold uppercase">External APIs</span>
                </div>

                {/* Legacy Docs - HIGHLIGHTED */}
                <div className="flex flex-col items-center -translate-y-6">
                  <div className="w-24 h-24 rounded-3xl bg-black border-2 border-[var(--color-green-light)] flex items-center justify-center relative shadow-[0_0_50px_rgba(74,171,109,0.4)] overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--color-green-dark)]/20 animate-pulse" />
                    <FileText className="w-10 h-10 text-[var(--color-green-light)]" />
                    <div className="absolute inset-0 rounded-3xl border border-white/10" />
                  </div>
                  <span className="text-[11px] text-[var(--color-green-light)] mt-4 font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(74,171,109,0.8)]">Legacy Systems</span>
                </div>

                {/* Local Databases */}
                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <Database className="w-8 h-8 text-gray-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-green-dark)]/30" />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-4 tracking-[0.2em] font-bold uppercase">Sovereign DBs</span>
                </div>

              </div>

              {/* DYNAMIC DATA FLOWS - THE "ACTUAL SENDING" ANIMATION */}
              <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[700px] h-[180px] z-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 700 180" fill="none">
                  {/* Paths */}
                  <path id="pathLeft" d="M 50 20 Q 50 160 350 160" stroke="var(--color-green-dark)" strokeWidth="1" strokeOpacity="0.2" />
                  <path id="pathCenter" d="M 350 20 L 350 160" stroke="var(--color-green-light)" strokeWidth="1.5" strokeOpacity="0.4" />
                  <path id="pathRight" d="M 650 20 Q 650 160 350 160" stroke="var(--color-green-dark)" strokeWidth="1" strokeOpacity="0.2" />
                  
                  {/* Animated Data Packets Flowing Along Paths */}
                  
                  {/* Packets from Left (API) */}
                  <circle r="4" fill="var(--color-green-light)" className="filter blur-[1px] shadow-[0_0_8px_var(--color-green-light)]">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50 20 Q 50 160 350 160" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2" fill="white" className="opacity-80">
                    <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path="M 50 20 Q 50 160 350 160" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Packets from Center (Legacy Docs) - High priority flow */}
                  {[0, 0.4, 0.8, 1.2].map((delay) => (
                    <g key={`center-${delay}`}>
                       <circle r="5" fill="var(--color-green-light)">
                        <animateMotion dur="1s" begin={`${delay}s`} repeatCount="indefinite" path="M 350 20 L 350 160" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2" fill="white">
                        <animateMotion dur="1s" begin={`${delay}s`} repeatCount="indefinite" path="M 350 20 L 350 160" />
                      </circle>
                    </g>
                  ))}

                  {/* Packets from Right (DBs) */}
                  <circle r="4" fill="var(--color-green-light)" className="filter blur-[1px]">
                    <animateMotion dur="3s" begin="0.2s" repeatCount="indefinite" path="M 650 20 Q 650 160 350 160" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle r="3" fill="var(--color-green-dark)">
                    <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 650 20 Q 650 160 350 160" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>

              {/* CENTRAL ENCRYPTION CORE - THE "RECEIVE" HUB */}
              <div className="absolute top-[200px] left-1/2 -translate-x-1/2 z-40">
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-green-light)] opacity-20 animate-[ping_3s_linear_infinite] scale-150" />
                <div className="absolute inset-[-20px] rounded-full border border-t-[var(--color-green-light)] border-r-transparent border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite] opacity-40 shadow-[0_0_50px_rgba(74,171,109,0.2)]" />
                
                <div className="relative w-28 h-28 rounded-full bg-[#050505] border-[3px] border-[var(--color-green-light)] flex items-center justify-center shadow-[0_0_80px_rgba(74,171,109,0.8)] overflow-hidden">
                   {/* Scanning Beam Inner */}
                   <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[var(--color-green-light)]/20 to-transparent h-1/2 w-full animate-[scan_2s_ease-in-out_infinite]" />
                   
                   <Lock className="w-12 h-12 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
                   
                   {/* Flow connection to the bottom section */}
                   <div className="absolute inset-2 rounded-full border border-white/5" />
                </div>
                
                {/* Data Conversion Visual */}
                <div className="absolute -right-32 top-10 flex flex-col items-start bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-[180px] shadow-2xl">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-green-light)] animate-pulse" />
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">Processing</span>
                   </div>
                   <div className="space-y-1.5 w-full">
                      <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                         <div className="h-full bg-[var(--color-green-light)] w-[80%] animate-[progress_3s_ease-in-out_infinite]" />
                      </div>
                      <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                         <span>SEC_LAYER_01</span>
                         <span className="text-[var(--color-green-light)]">ACTIVE</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Detailed Sovereign Value */}
        <div className={`bg-[#080808] border border-white/10 border-t-0 rounded-b-[40px] flex items-center px-16 relative overflow-hidden transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) delay-150
              ${stage === 'animating' ? 'w-[1000px] h-[350px] opacity-100 scale-100 translate-y-0' : 'w-[450px] h-[600px] opacity-0 scale-90 translate-y-[-100px]'}
            `}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-green-light)] opacity-[0.05] blur-[150px] rounded-full" />
          
          <div className="relative z-10 flex gap-12 w-full items-center">
            <div className="flex-[1.3] pr-10 border-r border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-gradient-to-r from-[var(--color-green-light)] to-transparent" />
                <span className="text-[12px] text-gray-500 font-black tracking-[0.4em] uppercase">The Perimeter</span>
              </div>
              <h2 className="font-display font-bold text-5xl text-white leading-[1.05] mb-8 tracking-tight">
                Your data is <br />
                <span className="text-[var(--color-green-light)] glow-text">untouchable.</span>
              </h2>
              <p className="font-body text-[22px] text-gray-400 font-light leading-relaxed max-w-sm">
                We deploy ingestion nodes directly inside your VPC. Data units are vectorized locally. No raw data ever crosses the perimeter.
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-6">
              {/* Premium Feature Card 1 */}
              <div className="group bg-gradient-to-r from-white/5 to-transparent border border-white/10 p-6 rounded-[24px] transition-all hover:border-[var(--color-green-light)]/40 hover:from-white/10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-green-dark)]/20 flex items-center justify-center group-hover:bg-[var(--color-green-dark)]/40 transition-colors">
                    <ShieldAlert className="w-6 h-6 text-[var(--color-green-light)]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-white mb-2 tracking-wide uppercase">Zero-Trust Vault</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed">Local encryption keys. Sovereign compute. Mathematical privacy by design.</p>
                  </div>
                </div>
              </div>

              {/* Premium Feature Card 2 */}
              <div className="group bg-gradient-to-r from-white/5 to-transparent border border-white/10 p-6 rounded-[24px] transition-all hover:border-[var(--color-green-light)]/40 hover:from-white/10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-green-dark)]/20 flex items-center justify-center group-hover:bg-[var(--color-green-dark)]/40 transition-colors">
                    <Zap className="w-6 h-6 text-[var(--color-green-light)]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-white mb-2 tracking-wide uppercase">10TB/Hour Ingress</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed">Proprietary parsing logic for multi-modal legacy streams in real-time.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 text-[10px] font-bold tracking-widest uppercase text-gray-600">
                 <div className="flex items-center gap-2">
                    <Server className="w-3 h-3" />
                    <span>Edge Deploy: ACTIVE</span>
                 </div>
                 <div className="flex items-center gap-2 text-[var(--color-green-light)]">
                    <Activity className="w-3 h-3" />
                    <span>Synced</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -30; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(74, 171, 109, 0.4);
        }
      `}</style>
    </div>
  );
}
