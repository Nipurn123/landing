import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  sizes = '100vw',
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('/assets/infrastrcture/')) {
      return originalSrc.replace('/assets/infrastrcture/', '/assets/infrastructure-webp/').replace(/\.(jpg|jpeg)$/i, '.webp');
    }
    if (originalSrc.startsWith('/images/')) {
      return originalSrc.replace('/images/', '/images-webp/').replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    if (originalSrc.endsWith('.jpg') || originalSrc.endsWith('.jpeg')) {
      return originalSrc.replace(/\.(jpg|jpeg)$/i, '.webp');
    }
    if (originalSrc.endsWith('.png')) {
      return originalSrc.replace(/\.png$/i, '.webp');
    }
    return originalSrc;
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ aspectRatio: '16/9' }}
        />
      )}
      <picture>
        <source 
          srcSet={isInView ? getWebPSrc(src) : undefined} 
          type="image/webp" 
        />
        <m.img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </picture>
    </div>
  );
}
