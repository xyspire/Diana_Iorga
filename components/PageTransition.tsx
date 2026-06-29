"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "motion/react";

const NUM_CURTAINS = 5;

// Global singleton overlay — renders once, animates on route change
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const controls = useAnimation();

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Animate curtains in (cover) → wait → animate out (reveal)
    const run = async () => {
      // Cover: scale from 0 → 1 (staggered per panel via CSS delay)
      await controls.start("cover");
      // Brief pause while page content swaps underneath
      await new Promise((r) => setTimeout(r, 80));
      // Reveal: scale from 1 → 0
      await controls.start("reveal");
      controls.start("idle");
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Page content — completely untouched */}
      {children}

      {/* Fixed curtain overlay — sits on top, never affects layout */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 9998 }}
        aria-hidden="true"
      >
        {Array.from({ length: NUM_CURTAINS }).map((_, i) => (
          <motion.div
            key={i}
            animate={controls}
            initial="idle"
            variants={{
              idle: { scaleY: 0, originY: "0%" },
              cover: {
                scaleY: 1,
                originY: "0%",
                transition: {
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.77, 0, 0.175, 1],
                },
              },
              reveal: {
                scaleY: 0,
                originY: "100%",
                transition: {
                  duration: 0.55,
                  delay: (NUM_CURTAINS - 1 - i) * 0.06,
                  ease: [0.77, 0, 0.175, 1],
                },
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${(i / NUM_CURTAINS) * 100}%`,
              width: `${100 / NUM_CURTAINS + 0.2}%`,
              background:
                i % 2 === 0
                  ? "linear-gradient(180deg, #070b28 0%, #0e155e 100%)"
                  : "linear-gradient(180deg, #0e155e 0%, #070b28 100%)",
            }}
          />
        ))}
      </div>
    </>
  );
}
