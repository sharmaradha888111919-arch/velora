import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Safety watchdog: Force-finish preloader if taking longer than 3.5s
    const watchdog = setTimeout(() => {
      setProgress(100);
      setIsFinished(true);
      onLoaded();
    }, 3500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearTimeout(watchdog);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onLoaded, 650);
          }, 200);
          return 100;
        }
        // Realistic easing progress
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(8, Math.floor(remaining * 0.15) + Math.floor(Math.random() * 4)));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      clearTimeout(watchdog);
    };
  }, [onLoaded]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinished(true);
    setTimeout(onLoaded, 400);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b] text-[#f5f2eb] select-none overflow-hidden"
        >
          {/* Subtle ambient light gradient in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(203,179,141,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Subtle animated floating ambient dust/ring */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[500px] h-[500px] rounded-full border border-[#dfccad]/5 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 0.95, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[700px] h-[700px] rounded-full border border-[#dfccad]/3 pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full text-center">
            {/* Monogram / Atelier Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-12 h-12 mb-8 flex items-center justify-center rounded-full border border-[#cbb38d]/30 text-[#e6d5b8] font-serif text-xl tracking-widest"
            >
              V
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl font-light tracking-[0.25em] font-serif text-[#f4eee2] mb-3"
            >
              VELORA
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm font-sans tracking-[0.35em] text-[#cbb38d] uppercase mb-10"
            >
              WEAR THE MOMENT.
            </motion.p>

            {/* Thin animated progress indicator */}
            <div className="w-48 sm:w-64 h-[2px] bg-[#222228] relative overflow-hidden rounded-full mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#b59c73] via-[#e6d5b8] to-[#cbb38d]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between w-48 sm:w-64 text-[10px] tracking-[0.2em] font-mono text-[#77746e]">
              <span>ATELIER</span>
              <span>{progress}%</span>
              <span>SHOWROOM</span>
            </div>
          </div>

          {/* Discreet skip button for impatient users */}
          <button
            id="preloader-skip-button"
            onClick={handleSkip}
            className="absolute bottom-8 text-[11px] font-sans tracking-[0.2em] text-[#6b6762] hover:text-[#cbb38d] transition-colors py-1 px-3 border border-transparent hover:border-[#cbb38d]/20 rounded-full"
          >
            ENTER SHOWROOM &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
