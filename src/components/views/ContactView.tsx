import { useState } from 'react';
import { m } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { useIsMobile } from '../../hooks/useResponsive';
import Logo from '../icons/Logo';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Seo, NAVIGATION_BREADCRUMBS } from '../../seo';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactView() {
  const { goHome } = useNavigation();
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<FormStatus>('idle');

  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    companyDomain: '',
    email: '',
    referralSource: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          jobTitle: '',
          companyDomain: '',
          email: '',
          referralSource: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Seo pageKey="contact" breadcrumbs={NAVIGATION_BREADCRUMBS.contact} />
      <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#ffffff] text-[#111] font-mono selection:bg-[#ff3333]/20 selection:text-[#ff3333] relative overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-[900px] px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 md:pb-32">
        <div className="mb-10 sm:mb-16 md:mb-20">
<button 
  onClick={goHome}
  className="flex items-center gap-4 hover:opacity-70 transition-opacity"
>
  <Logo width={isMobile ? 80 : 140} height={isMobile ? 80 : 140} />
  <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter text-[#111] pt-1">100xprompt</span>
</button>
        </div>

        {status === 'success' ? (
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 sm:py-20"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 mb-4 sm:mb-6">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-3 sm:mb-4">Message Sent!</h2>
            <p className="text-[#888888] text-sm sm:text-base mb-6 sm:mb-8">We'll get back to you within 24 hours.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-[#4aab6d] underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Send another message
            </button>
          </m.div>
        ) : (
          <>
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-3 sm:mb-4">
                Get in touch.
              </h1>
              <p className="text-[#888888] text-sm sm:text-base tracking-tight">
                Tell us about your use case and we'll find the right path forward.
              </p>
            </div>

            <form className="w-full space-y-8 sm:space-y-10" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                    What's your name? <span className="text-[#ff3333]">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nipurn Agarwal"
                    className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base placeholder:text-[#b3b3b3]"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                    What's your job title? <span className="text-[#ff3333]">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Founder"
                    className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base placeholder:text-[#b3b3b3]"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                  What's your company's domain? <span className="text-[#ff3333]">*</span>
                </label>
                <p className="text-[#888888] text-xs sm:text-sm mb-2 sm:mb-3">
                  Please include a valid business website domain.
                </p>
                <input 
                  type="text" 
                  name="companyDomain"
                  value={formData.companyDomain}
                  onChange={handleChange}
                  placeholder="100xprompt.com"
                  className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base placeholder:text-[#b3b3b3]"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                  What's your business email? <span className="text-[#ff3333]">*</span>
                </label>
                <p className="text-[#888888] text-xs sm:text-sm mb-2 sm:mb-3">
                  Please include a valid business email address.
                </p>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@100xprompt.com"
                  className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base placeholder:text-[#b3b3b3]"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                  Where did you hear about 100xprompt? <span className="text-[#ff3333]">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base text-[#111] appearance-none cursor-pointer"
                    required
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled className="text-[#b3b3b3]">Select an option</option>
                    <option value="Twitter / X">Twitter / X</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Friend or Colleague">Friend or Colleague</option>
                    <option value="News / Media">News / Media</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 sm:right-4 flex items-center pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#111] mb-2 sm:mb-3">
                  Please describe the problem you hope to solve with 100xprompt's engine?
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Let us know anything else that might help us find the right solution"
                  rows={5}
                  className="w-full border border-[#e5e5e5] bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none focus:border-[#111] transition-colors text-sm sm:text-base placeholder:text-[#b3b3b3] resize-y"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">Something went wrong. Please try again.</p>
                </div>
              )}

              <div className="pt-2">
                <p className="text-xs sm:text-sm text-[#888888] mb-4 sm:mb-6">
                  <span className="text-[#ff3333]">*</span> Required
                </p>
                
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#111] hover:bg-[#333] text-white py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Continue →'
                  )}
                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </m.div>
    </>
  );
}
