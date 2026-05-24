import { m } from 'framer-motion';
import { useNavigation } from '../../../context/NavigationContext';

export default function CodeCTA() {
  const { goToContact } = useNavigation();

  return (
    <m.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      className="relative overflow-hidden rounded-[32px] p-16 md:p-24 text-center border border-stone-100"
      style={{
        background: 'linear-gradient(180deg, #fafbfc 0%, #f0f2f4 100%)',
      }}
    >
      {/* Subtle breathing glow */}
      <m.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#4aab6d" }}
      />

      {/* Minimal geometric accent - single orbiting dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#4aab6d", boxShadow: `0 0 12px #4aab6d` }} />
        </m.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Single refined icon */}
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20"
          style={{ 
            background: `linear-gradient(135deg, #4aab6d 0%, #3d9a5c 100%)`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L18 6L15.74 10.91L22 12L15.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L8.26 13.09L2 12L8.26 10.91L6 6L10.91 8.26L12 2Z" fill="white"/>
          </svg>
        </m.div>

        <div className="flex flex-col gap-5 items-center">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-[#111827] font-normal leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Ready to own your <br className="hidden sm:block" />
            <span className="italic" style={{ color: "#4aab6d" }}>AI infrastructure?</span>
          </h2>
          
          <p 
            className="text-base md:text-lg text-gray-500 font-body max-w-md leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Sovereign, secure, and built for the world.
          </p>
        </div>

        <m.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={goToContact}
          className="px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
          style={{
            background: '#111827',
            color: '#fff',
          }}
        >
          Start the conversation
        </m.button>
      </div>
    </m.div>
  );
}
