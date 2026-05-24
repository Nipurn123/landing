import { useScroll, useTransform } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { lazy, Suspense } from 'react';
import MainLayout from '../layout/MainLayout';
import Hero from '../sections/Hero';
import { Seo, platformFAQSchema } from '../../seo';

// Lazy load below-the-fold components to improve initial load time
const SovereignCore = lazy(() => import('../sections/KhufiaEngine'));
const ScrollytellingSection = lazy(() => import('../sections/ScrollytellingSection'));
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'));
const SecuritySection = lazy(() => import('../sections/SecuritySection'));
const CTASection = lazy(() => import('../sections/CTASection'));

export default function ExecutiveView() {
  const { goToLogin, goToContact, goToDocs } = useNavigation();
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <MainLayout>
      <Seo pageKey="home" schema={platformFAQSchema} />
      <Hero heroY={heroY} heroOpacity={heroOpacity} onLoginClick={goToLogin} onDocsClick={goToDocs} />

      <Suspense fallback={<div className="min-h-screen w-full" />}>
        <SovereignCore />
        <ScrollytellingSection onLoginClick={goToLogin} onContactClick={goToContact} />
        <TestimonialsSection />
        <SecuritySection />
        <CTASection />
      </Suspense>
    </MainLayout>
  );
}
