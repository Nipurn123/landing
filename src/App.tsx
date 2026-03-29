import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, domMax } from 'framer-motion';
import { NavigationProvider } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ScrollToTop from './components/ui/ScrollToTop';
import PerspectiveToggle from './components/ui/PerspectiveToggle';
import './index.css';

const ExecutiveView = lazy(() => import('./components/views/ExecutiveView'));
const AnalyticsView = lazy(() => import('./components/views/AnalyticsView'));
// const MillennialView = lazy(() => import('./components/views/MillennialView'));
const AiView = lazy(() => import('./components/views/AiView'));
const ContactView = lazy(() => import('./components/views/ContactView'));
const LoginView = lazy(() => import('./components/views/LoginView'));
const SsoCallback = lazy(() => import('./components/views/SsoCallback'));
const ProductProView = lazy(() => import('./components/views/ProductProView'));
const ProductFlashView = lazy(() => import('./components/views/ProductFlashView'));
const ModelView = lazy(() => import('./components/views/ModelView'));
const PricingView = lazy(() => import('./components/views/PricingView'));
const DocsView = lazy(() => import('./components/views/DocsView'));
const BlogView = lazy(() => import('./components/views/BlogView'));
const CodeView = lazy(() => import('./components/views/CodeView'));
const InfrastructureView = lazy(() => import('./components/views/InfrastructureView'));
const PrivacyPolicyView = lazy(() => import('./components/views/PrivacyPolicyView'));
const TermsOfUseView = lazy(() => import('./components/views/TermsOfUseView'));

function LoadingSpinner() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-white/60 text-sm font-mono">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavigationProvider>
        <AuthProvider>
          <PerspectiveToggle />
          <ErrorBoundary>
            <LazyMotion features={domMax}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<ExecutiveView />} />
                  <Route path="/analytics" element={<AnalyticsView />} />
                  {/* <Route path="/story" element={<MillennialView />} /> */}
                  <Route path="/machine" element={<AiView />} />
                  <Route path="/contact" element={<ContactView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/sso-callback" element={<SsoCallback />} />
                  <Route path="/pro" element={<ProductProView />} />
                  <Route path="/flash" element={<ProductFlashView />} />
                  <Route path="/model" element={<ModelView />} />
                  <Route path="/pricing" element={<PricingView />} />
                  <Route path="/docs" element={<DocsView />} />
                  <Route path="/blog" element={<BlogView />} />
                  <Route path="/code" element={<CodeView />} />
                  <Route path="/infrastructure" element={<InfrastructureView />} />
                  <Route path="/privacy" element={<PrivacyPolicyView />} />
                  <Route path="/terms" element={<TermsOfUseView />} />
                </Routes>
              </Suspense>
            </LazyMotion>
          </ErrorBoundary>
        </AuthProvider>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
