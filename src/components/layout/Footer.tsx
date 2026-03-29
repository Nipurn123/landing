import { useNavigation } from '../../context/NavigationContext';
import { useIsMobile } from '../../hooks/useResponsive';
import Logo from '../icons/Logo';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const { goHome, goToModel, goToFlash, goToPricing, goToBlog, goToDocs, goToContact, goToCode, goToInfrastructure, goToPrivacy, goToTerms } = useNavigation();
  const isMobile = useIsMobile();

  return (
    <footer className="bg-[hsl(var(--color-surface))] py-20 px-6 md:px-12 border-t border-[hsl(var(--color-border)/0.5)] mt-auto pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <div onClick={goHome} className="flex items-center gap-2 font-display font-semibold text-[hsl(var(--color-text-primary))] cursor-pointer hover:opacity-80 transition-opacity">
            <Logo width={isMobile ? 60 : 100} height={isMobile ? 60 : 100} className="drop-shadow-2xl" />
            <span className="text-lg tracking-tighter">100xprompt</span>
          </div>
          <p className="font-body text-[hsl(var(--color-text-secondary))] text-[13px] leading-relaxed max-w-[240px]">
            The highest precision proprietary engine for your enterprise data. Built for sovereign national-scale AI infrastructure.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em]">Products</h4>
          <div className="flex flex-col gap-3 text-[14px] font-medium text-[hsl(var(--color-text-secondary))]">
            <span onClick={goToCode} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">100X Code</span>
            <span onClick={goToInfrastructure} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Infrastructure Layer</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em]">Models</h4>
          <div className="flex flex-col gap-3 text-[14px] font-medium text-[hsl(var(--color-text-secondary))]">
            <span onClick={goToModel} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">100X Prompt Pro</span>
            <span onClick={goToFlash} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">100X Prompt Flash</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em]">Resources</h4>
          <div className="flex flex-col gap-3 text-[14px] font-medium text-[hsl(var(--color-text-secondary))]">
            <span onClick={goToPricing} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Pricing</span>
            <span onClick={goToBlog} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Blog</span>
            <span onClick={goToDocs} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Documentation</span>
            <span onClick={goToPrivacy} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Privacy Policy</span>
            <span onClick={goToTerms} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Terms of Use</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-[11px] font-black text-[hsl(var(--color-text-muted))] uppercase tracking-[0.2em]">Company</h4>
          <div className="flex flex-col gap-3 text-[14px] font-medium text-[hsl(var(--color-text-secondary))]">
            <span onClick={goToContact} className="hover:text-[hsl(var(--color-primary))] transition-colors cursor-pointer">Contact Sales</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[hsl(var(--color-border)/0.5)] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-[hsl(var(--color-text-muted))] text-xs font-medium">
          © 2026 100X Prompt Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-[hsl(var(--color-text-muted))]">
          <a href="https://www.instagram.com/100xprompt/" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--color-text-primary))] transition-all" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://x.com/100XPrompt" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--color-text-primary))] transition-all" aria-label="X (Twitter)">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/posts/100xprompt_100xprompt-innovation-deeptech-activity-7283062336335028225-eIQc/" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--color-text-primary))] transition-all" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
