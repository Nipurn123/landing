import { useState, useEffect, useRef } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  priority?: boolean;
}

export default function LazyVideo({ src, priority = false, ...props }: LazyVideoProps) {
  const [isVisible, setIsVisible] = useState(priority);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (priority) return; // Skip observer if priority is true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load slightly before it comes into view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      src={isVisible ? src : undefined}
      {...props}
    />
  );
}
