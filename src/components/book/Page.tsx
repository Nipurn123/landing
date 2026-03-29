import type { ReactNode } from 'react';
import { m } from 'framer-motion';

export default function Page({ isFlipped, zIndex, front, back }: { isFlipped: boolean, zIndex: number, front: ReactNode, back: ReactNode }) {
  return (
    <m.div
      className="page"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? -180 : 0 }}
      transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1.000] }}
      style={{ zIndex, width: '100%', height: '100%' }}
    >
      <div className="page-front" style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}>
        {front}
      </div>
      <div className="page-back" style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}>
        {back}
      </div>
    </m.div>
  );
}