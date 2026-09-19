import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest?.('button') ||
        target.closest?.('a') ||
        target.getAttribute?.('role') === 'button' ||
        target.classList?.contains('cursor-pointer') ||
        target.dataset?.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#dfccad] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.6 : isHovered ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#cbb38d]/40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
          backgroundColor: isHovered ? 'rgba(203, 179, 141, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(223, 204, 173, 0.7)' : 'rgba(203, 179, 141, 0.3)',
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
      />
    </div>
  );
};
