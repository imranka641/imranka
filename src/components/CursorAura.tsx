import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/webglUtils';

/**
 * Subtle desktop cursor ambient spotlight (compositor-only transform).
 * Automatically disables on touch devices and prefers-reduced-motion.
 */
export const CursorAura: React.FC = () => {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const el = auraRef.current;
    if (!el) return;

    let targetX = -400;
    let targetY = -400;
    let curX = -400;
    let curY = -400;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.14;
      curY += (targetY - curY) * 0.14;
      el.style.transform = `translate3d(${curX - 180}px, ${curY - 180}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none z-0 hidden lg:block opacity-35 dark:opacity-35 light:opacity-15"
      style={{
        background:
          'radial-gradient(circle, rgba(34, 211, 238, 0.16) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 72%)',
        willChange: 'transform',
      }}
    />
  );
};
