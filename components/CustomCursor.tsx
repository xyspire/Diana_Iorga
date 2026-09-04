'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Use motion values for hardware accelerated transforms without re-rendering React
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for elastic, trailing movement
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    // Disable standard cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return () => clearTimeout(timer);

    // Apply global style to disable default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      body {
        cursor: none !important;
      }
      iframe, input, textarea, select {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(style);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Throttle hover detection to once per animation frame
    let hoverRafId = 0;
    const handleMouseOver = (e: MouseEvent) => {
      if (hoverRafId) return;
      hoverRafId = window.requestAnimationFrame(() => {
        hoverRafId = 0;
        const target = e.target as HTMLElement;
        if (!target) return;
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer') !== null ||
          target.getAttribute('role') === 'button';
        setIsHovered(isInteractive);
      });
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      if (hoverRafId) window.cancelAnimationFrame(hoverRafId);
      style.remove();
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      ref={cursorRef}
      id="custom-cursor-dot"
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovered ? 3.5 : 1,
        backgroundColor: isHovered ? 'var(--color-studio-white)' : 'var(--color-studio-white)',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 400, damping: 25 },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
