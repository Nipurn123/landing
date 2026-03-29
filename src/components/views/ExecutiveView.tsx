import { useScroll, useTransform } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import MainLayout from '../layout/MainLayout';
import Hero from '../sections/Hero';
import SovereignCore from '../sections/KhufiaEngine';
import ScrollytellingSection from '../sections/ScrollytellingSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import SecuritySection from '../sections/SecuritySection';
import CTASection from '../sections/CTASection';
import { Seo, platformFAQSchema } from '../../seo';

export default function ExecutiveView() {
  const { goToLogin, goToContact, goToDocs } = useNavigation();
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <MainLayout>
      <Seo pageKey="home" schema={platformFAQSchema} />
      <Hero heroY={heroY} heroOpacity={heroOpacity} onLoginClick={goToLogin} onDocsClick={goToDocs} />

      <SovereignCore />

      <ScrollytellingSection onLoginClick={goToLogin} onContactClick={goToContact} />

      <TestimonialsSection />

      <SecuritySection />

      <CTASection />
    </MainLayout>
  );
}
