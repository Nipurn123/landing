declare module 'react-pageflip' {
  import { ComponentType, RefObject, ReactNode } from 'react';

  interface PageFlipProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    className?: string;
    onFlip?: (e: { data: number }) => void;
    usePortrait?: boolean;
    children?: ReactNode;
    ref?: RefObject<HTMLFlipBookRef | null>;
  }

  interface PageFlip {
    flipNext(): void;
    flipPrev(): void;
    turnToPage(page: number): void;
  }

  interface HTMLFlipBookRef {
    pageFlip(): PageFlip;
  }

  const HTMLFlipBook: ComponentType<PageFlipProps>;
  export default HTMLFlipBook;
}

interface PageFlip {
  flipNext(): void;
  flipPrev(): void;
  turnToPage(page: number): void;
}

interface HTMLFlipBookRef {
  pageFlip(): PageFlip;
}
