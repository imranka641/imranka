import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { prefersReducedMotion } from '../utils/webglUtils';

/**
 * Brief non-blocking cinematic progress reveal on initial load.
 * Never blocks access to the DOM and settles cleanly under 900ms.
 */
export const CinematicIntro: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !prefersReducedMotion();
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 850);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#030612] flex flex-col items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="text-center space-y-4 px-6"
          >
            <div className="text-xs font-mono tracking-[0.28em] text-cyan-400 uppercase">
              Imran Kedir Ahmed
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Full-Stack Web &amp; Mobile Developer
            </div>
            <div className="w-48 h-0.5 mx-auto bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
