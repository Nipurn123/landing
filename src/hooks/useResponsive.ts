import { useMediaQuery } from 'react-responsive';

export const breakpoints = {
  mobile: 320,
  mobileLg: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopLg: 1536,
  ultrawide: 1920,
};

export const useIsMobile = () => useMediaQuery({ maxWidth: breakpoints.tablet - 1 });
export const useIsTablet = () => useMediaQuery({ minWidth: breakpoints.tablet, maxWidth: breakpoints.laptop - 1 });
export const useIsDesktop = () => useMediaQuery({ minWidth: breakpoints.laptop });
export const useIsDesktopOrLaptop = () => useMediaQuery({ minWidth: breakpoints.tablet });
export const useIsLargeScreen = () => useMediaQuery({ minWidth: breakpoints.desktop });

export const useCurrentBreakpoint = () => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.tablet - 1 });
  const isTablet = useMediaQuery({ minWidth: breakpoints.tablet, maxWidth: breakpoints.laptop - 1 });
  const isLaptop = useMediaQuery({ minWidth: breakpoints.laptop, maxWidth: breakpoints.desktop - 1 });
  const isDesktop = useMediaQuery({ minWidth: breakpoints.desktop, maxWidth: breakpoints.desktopLg - 1 });
  const isDesktopLg = useMediaQuery({ minWidth: breakpoints.desktopLg, maxWidth: breakpoints.ultrawide - 1 });
  const isUltrawide = useMediaQuery({ minWidth: breakpoints.ultrawide });

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isLaptop) return 'laptop';
  if (isDesktop) return 'desktop';
  if (isDesktopLg) return 'desktopLg';
  if (isUltrawide) return 'ultrawide';
  return 'mobile';
};

export const useOrientation = () => {
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  return { isPortrait, isLandscape };
};

export const useTouchDevice = () => {
  return useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });
};

export const useRetina = () => {
  return useMediaQuery({ minResolution: '2dppx' });
};

export const usePrefersReducedMotion = () => {
  return useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
};

export const usePrefersDarkMode = () => {
  return useMediaQuery({ query: '(prefers-color-scheme: dark)' });
};
