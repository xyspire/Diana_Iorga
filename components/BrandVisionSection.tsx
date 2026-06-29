"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import LineButton from "./LineButton";

// ── Text lines to reveal ───────────────────────────────────────────────────
const TEXT_LINES = [
  "Bringing Creative",
  "Ideas to Life.",
  "Across Every",
  "Medium.",
];

// ── Per-character reveal driven by scroll progress ─────────────────────────
interface CharRevealProps {
  char: string;
  globalIndex: number;   // position in the full flattened char list
  totalChars: number;    // total chars across all lines
  lineVisible: boolean;  // true once the containing line enters the viewport
  progress: MotionValue<number>;
  rangeStart: number;    // scroll-progress value where reveals begin
  rangeEnd: number;      // scroll-progress value where reveals end
}

function CharReveal({
  char,
  globalIndex,
  totalChars,
  lineVisible,
  progress,
  rangeStart,
  rangeEnd,
}: CharRevealProps) {
  const span = rangeEnd - rangeStart;
  const charStart = rangeStart + (globalIndex / totalChars) * span;
  const charEnd = rangeStart + ((globalIndex + 1) / totalChars) * span;

  const color = useTransform(
    progress,
    [charStart, charEnd],
    ["rgba(255,255,255,0.18)", "rgba(255,255,255,1)"],
  );

  // Non-breaking space so whitespace chars take width
  const display = char === " " ? "\u00A0" : char;

  return (
    <motion.span
      style={{ color: lineVisible ? color : "rgba(255,255,255,0.18)" }}
      className="inline-block select-none font-sans font-normal"
    >
      {display}
    </motion.span>
  );
}

// ── One line of text, each char revealed individually ─────────────────────
interface RevealLineProps {
  line: string;
  lineIndex: number;
  charOffset: number;     // how many chars came before this line
  totalChars: number;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}

function RevealLine({
  line,
  charOffset,
  totalChars,
  progress,
  rangeStart,
  rangeEnd,
}: RevealLineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={lineRef} className="block">
      {line.split("").map((char, i) => (
        <CharReveal
          key={i}
          char={char}
          globalIndex={charOffset + i}
          totalChars={totalChars}
          lineVisible={inView}
          progress={progress}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
        />
      ))}
    </span>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export default function BrandVisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll progress: 0 = section enters viewport bottom, 1 = section leaves viewport top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Total character count across all lines (for even distribution)
  const totalChars = TEXT_LINES.reduce((sum, l) => sum + l.length, 0);

  // Reveal window: starts as section enters (~0.2) and finishes at mid-scroll (~0.58)
  const REVEAL_START = 0.2;
  const REVEAL_END = 0.58;

  // ── Image transforms (unchanged) ────────────────────────────────────────
  const tlX = useTransform(scrollYProgress, [0.1, 0.5], ["0vw", isMobile ? "-35vw" : "-17vw"]);
  const tlY = useTransform(scrollYProgress, [0.1, 0.5], ["0vh", isMobile ? "-22vh" : "-20vh"]);
  const tlScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1.02]);
  const tlRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, 12]);

  const trX = useTransform(scrollYProgress, [0.1, 0.5], ["0vw", isMobile ? "28vw" : "17vw"]);
  const trY = useTransform(scrollYProgress, [0.1, 0.5], ["0vh", isMobile ? "-22vh" : "-18vh"]);
  const trScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1.05]);
  const trRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, -12]);

  const blX = useTransform(scrollYProgress, [0.1, 0.5], ["0vw", isMobile ? "-28vw" : "-14vw"]);
  const blY = useTransform(scrollYProgress, [0.1, 0.5], ["0vh", isMobile ? "22vh" : "18vh"]);
  const blScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1.02]);
  const blRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, -10]);

  const brX = useTransform(scrollYProgress, [0.1, 0.5], ["0vw", isMobile ? "28vw" : "13vw"]);
  const brY = useTransform(scrollYProgress, [0.1, 0.5], ["0vh", isMobile ? "22vh" : "20vh"]);
  const brScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1.05]);
  const brRotate = useTransform(scrollYProgress, [0.1, 0.5], [0, 16]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] select-none z-20"
      id="brand-vision-section"
    >
      {/* Sticky viewport-lock container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-studio-dark px-6 sm:px-12 md:px-24">
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">

          {/* ── Images ──────────────────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[
              { id: "tl", src: "/wemake2.jpg" },
              { id: "tr", src: "/wemake1.png" },
              { id: "bl", src: "/aarogyam2.jpg" },
              { id: "br", src: "/aarogyam1.jpg" },
            ].map((img, i) => {
              const transforms = [
                { x: tlX, y: tlY, scale: tlScale, rotate: tlRotate },
                { x: trX, y: trY, scale: trScale, rotate: trRotate },
                { x: blX, y: blY, scale: blScale, rotate: blRotate },
                { x: brX, y: brY, scale: brScale, rotate: brRotate },
              ];
              const t = transforms[i];
              return (
                <motion.div
                  key={img.id}
                  style={{ x: t.x, y: t.y, scale: t.scale, rotate: t.rotate, willChange: 'transform' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-40 sm:h-40 md:w-36 md:h-36 aspect-square z-10 pointer-events-auto overflow-hidden rounded-sm border border-white/5 hover:border-white/25 transition-colors duration-500 shadow-2xl"
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover select-none pointer-events-none transition-all duration-700 hover:scale-105" referrerPolicy="no-referrer" />
                </motion.div>
              );
            })}
          </div>

          {/* ── Letter-by-letter scroll-reveal text ─────────────────────── */}
          <div className="relative z-10 max-w-lg px-6 md:px-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-medium tracking-tight text-center leading-[1.3] sm:leading-[1.35] font-sans">
              {TEXT_LINES.map((line, lineIdx) => {
                // character offset: how many chars are in all previous lines
                const charOffset = TEXT_LINES.slice(0, lineIdx).reduce(
                  (sum, l) => sum + l.length,
                  0,
                );
                return (
                  <RevealLine
                    key={lineIdx}
                    line={line}
                    lineIndex={lineIdx}
                    charOffset={charOffset}
                    totalChars={totalChars}
                    progress={scrollYProgress}
                    rangeStart={REVEAL_START}
                    rangeEnd={REVEAL_END}
                  />
                );
              })}
            </h3>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div className="mt-16 md:mt-24 flex flex-col items-center relative z-20 pointer-events-auto">
            <LineButton
              onClick={() => {
                const element = document.getElementById("contact-studio");
                if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              id="btn-vision-contact"
            >
              contact me
            </LineButton>
          </div>
        </div>
      </div>
    </div>
  );
}
