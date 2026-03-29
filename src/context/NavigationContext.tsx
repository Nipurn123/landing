import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type RoutePath = 
  | '/' 
  | '/story' 
  | '/machine' 
  | '/contact' 
  | '/login' 
  | '/sso-callback'
  | '/pro' 
  | '/flash' 
  | '/model' 
  | '/pricing' 
  | '/docs' 
  | '/blog' 
  | '/code' 
  | '/infrastructure'
  | '/privacy'
  | '/terms';

interface NavigationContextType {
  navigateTo: (path: RoutePath) => void;
  currentPath: string;
  goHome: () => void;
  goToContact: () => void;
  goToLogin: () => void;
  goToFlash: () => void;
  goToPro: () => void;
  goToModel: () => void;
  goToPricing: () => void;
  goToDocs: () => void;
  goToBlog: () => void;
  goToCode: () => void;
  goToInfrastructure: () => void;
  goToStory: () => void;
  goToMachine: () => void;
  goToPrivacy: () => void;
  goToTerms: () => void;
  isActive: (path: RoutePath) => boolean;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

const routeMap: Record<string, RoutePath> = {
  executive: '/',
  millennial: '/story',
  ai: '/machine',
  contact: '/contact',
  login: '/login',
  ssoCallback: '/sso-callback',
  pro: '/pro',
  flash: '/flash',
  model: '/model',
  pricing: '/pricing',
  docs: '/docs',
  blog: '/blog',
  code: '/code',
  infrastructure: '/infrastructure',
  privacy: '/privacy',
  terms: '/terms',
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback((path: RoutePath) => {
    navigate(path);
  }, [navigate]);

  const goHome = useCallback(() => navigateTo('/'), [navigateTo]);
  const goToContact = useCallback(() => navigateTo('/contact'), [navigateTo]);
  const goToLogin = useCallback(() => navigateTo('/login'), [navigateTo]);
  const goToFlash = useCallback(() => navigateTo('/flash'), [navigateTo]);
  const goToPro = useCallback(() => navigateTo('/pro'), [navigateTo]);
  const goToModel = useCallback(() => navigateTo('/model'), [navigateTo]);
  const goToPricing = useCallback(() => navigateTo('/pricing'), [navigateTo]);
  const goToDocs = useCallback(() => navigateTo('/docs'), [navigateTo]);
  const goToBlog = useCallback(() => navigateTo('/blog'), [navigateTo]);
  const goToCode = useCallback(() => navigateTo('/code'), [navigateTo]);
  const goToInfrastructure = useCallback(() => navigateTo('/infrastructure'), [navigateTo]);
  const goToStory = useCallback(() => navigateTo('/story'), [navigateTo]);
  const goToMachine = useCallback(() => navigateTo('/machine'), [navigateTo]);
  const goToPrivacy = useCallback(() => navigateTo('/privacy'), [navigateTo]);
  const goToTerms = useCallback(() => navigateTo('/terms'), [navigateTo]);

  const isActive = useCallback((path: RoutePath) => {
    return location.pathname === path;
  }, [location.pathname]);

  return (
    <NavigationContext.Provider
      value={{
        navigateTo,
        currentPath: location.pathname,
        goHome,
        goToContact,
        goToLogin,
        goToFlash,
        goToPro,
        goToModel,
        goToPricing,
        goToDocs,
        goToBlog,
        goToCode,
        goToInfrastructure,
        goToStory,
        goToMachine,
        goToPrivacy,
        goToTerms,
        isActive,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { routeMap };
