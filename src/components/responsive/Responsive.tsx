import type { ReactNode } from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '../../hooks/useResponsive';

interface ResponsiveProps {
  children: ReactNode;
}

interface BreakpointProps extends ResponsiveProps {
  minWidth?: number;
  maxWidth?: number;
}

export const Mobile = ({ children }: ResponsiveProps) => (
  <MediaQuery maxWidth={breakpoints.tablet - 1}>{children}</MediaQuery>
);

export const Tablet = ({ children }: ResponsiveProps) => (
  <MediaQuery minWidth={breakpoints.tablet} maxWidth={breakpoints.laptop - 1}>
    {children}
  </MediaQuery>
);

export const Desktop = ({ children }: ResponsiveProps) => (
  <MediaQuery minWidth={breakpoints.laptop}>{children}</MediaQuery>
);

export const DesktopOrLaptop = ({ children }: ResponsiveProps) => (
  <MediaQuery minWidth={breakpoints.tablet}>{children}</MediaQuery>
);

export const LargeScreen = ({ children }: ResponsiveProps) => (
  <MediaQuery minWidth={breakpoints.desktop}>{children}</MediaQuery>
);

export const Portrait = ({ children }: ResponsiveProps) => (
  <MediaQuery orientation="portrait">{children}</MediaQuery>
);

export const Landscape = ({ children }: ResponsiveProps) => (
  <MediaQuery orientation="landscape">{children}</MediaQuery>
);

export const TouchDevice = ({ children }: ResponsiveProps) => (
  <MediaQuery query="(hover: none) and (pointer: coarse)">{children}</MediaQuery>
);

export const MouseDevice = ({ children }: ResponsiveProps) => (
  <MediaQuery query="(hover: hover) and (pointer: fine)">{children}</MediaQuery>
);

export const Breakpoint = ({ children, minWidth, maxWidth }: BreakpointProps) => (
  <MediaQuery minWidth={minWidth} maxWidth={maxWidth}>{children}</MediaQuery>
);
