"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Spade } from "lucide-react";
import LineButton from "./LineButton";
import Image from "next/image";

const WORK_ITEMS = [
  {
    id: "01",
    slug: "wemake",
    title: "We Make",
    description:
      "At We Make, we manufacture products that inspire creation, organization, and learning.",
    category: "UX & UI Design",
    image:
      "/wemake.png",

  },
  {
    id: "02",
    slug: "aarogyamroots",
    title: "Aarogyam Roots",
    description:
      "Aarogyam Roots positions itself in the premium, eco-conscious wellness and beauty market. ",
    category: "Design & Development",
    image:
      "/aarogyam.jpg",

  },

];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Track the scroll of our parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Portfolio text animation: rises to fully visible centring on scroll
  const yPortfolio = useTransform(scrollYProgress, [0.0, 0.75], ["32%", "0%"]);
  const opacityPortfolio = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.8, 1.0],
    [0.2, 0.9, 0.9, 0.9],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleScrollToFooter = () => {
    const element = document.getElementById("contact-studio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-studio-dark"
      id="selected-works"
    >
      {/* CSS Overrides to hide main custom-cursor-dot when hovering over our custom interactive image frames */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body:has(.project-card-frame:hover) #custom-cursor-dot {
          opacity: 0 !important;
          transform: scale(0) !important;
          transition: opacity 0.25s ease, transform 0.25s ease !important;
        }
      `,
        }}
      />

      {/* Sticky Screen Viewport Frame for Background (Header and Portfolio Text) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-studio-dark flex flex-col justify-between py-0 pointer-events-none z-0">
        {/* Fixed Header Elements - Stays locked in position while cards layer across */}
        <div className="absolute top-12 md:top-16 w-full px-6 flex flex-col md:flex-row md:items-start justify-between gap-6 pointer-events-auto z-40">
          <div className="flex flex-col items-start gap-8 max-w-sm sm:max-w-md">
            <div className="inline-flex items-center gap-2 px-3    py-1.5 rounded-full border border-white">
              <Spade className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xl font-mono tracking-widest text-zinc-300 uppercase">
                Featured Works
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-sans font-light text-zinc-300 tracking-tight leading-tight">
              A few highlights from the amazing people I’ve had the chance to
              design for
            </p>
          </div>

          <div className="hidden md:block">
            <LineButton
              onClick={() => router.push("/works")}
              id="btn-portfolio-see-works"
            >
              see all works
            </LineButton>
          </div>
        </div>

        {/* Absolute Background element at the bottom - "Portfolio" with thin elegance weights */}
        <motion.div
          style={{ y: yPortfolio, opacity: opacityPortfolio }}
          className="absolute bottom-0 left-0 w-full text-center select-none pointer-events-none z-0 overflow-hidden leading-[0.75] px-4"
        >
          <h2 className="text-[18vw] sm:text-[20vw]  font-light text-white tracking-tighter uppercase font-sans select-none pointer-events-none leading-[0.75] mb-0 pb-0 opacity-100">
            Portfolio
          </h2>
        </motion.div>
      </div>

      {/* Natural Flow Cards Container */}
      <div className="relative z-10 w-full flex flex-col items-center gap-16 md:gap-24 px-4 -mt-[45vh] pb-32">
        {WORK_ITEMS.map((work) => {
          return (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center max-w-[92vw] w-[88vw] md:w-[60vw] lg:w-[45vw] lg:max-w-[850px]"
            >
              <div
                className="project-card-frame relative w-full bg-studio-dark border border-white/15 rounded-md overflow-hidden flex flex-col group cursor-pointer shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]"
                onMouseEnter={() => setHoveredId(work.id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={handleMouseMove}
                onClick={() => router.push(`/works/${work.slug}`)}
                id={`project-card-${work.id}`}
              >
                {/* Image Container Aspect Box */}
                <div className="relative w-full aspect-[16/9.5] overflow-hidden flex items-center justify-center">
                  {/* Menu style design VIEW Button following pointer inside the frame with border lines & transparent bg */}
                  <motion.div
                    className="absolute pointer-events-none z-30 hidden sm:block"
                    style={{
                      left: mousePos.x,
                      top: mousePos.y,
                      x: "-50%",
                      y: "-50%",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: hoveredId === work.id ? 1 : 0,
                      opacity: hoveredId === work.id ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  >
                    <div className="relative py-2.5 px-6 bg-white/5 backdrop-blur-md">
                      {/* Top line of button */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                      {/* Bottom line of button */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30" />
                      <span className="text-xs font-mono tracking-widest text-white uppercase select-none font-light">
                        view
                      </span>
                    </div>
                  </motion.div>

                  <Image
                    src={work?.image as string}
                    alt={work?.title as string}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[900ms] select-none pointer-events-none filter"
                    referrerPolicy="no-referrer"
                    unoptimized={Boolean(work?.image && (work.image as string).startsWith("http"))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-1" />

                  {/* Center Logo/Symbol and Heading */}
                  <div className="flex flex-col items-center gap-2 z-10 select-none pointer-events-none text-center px-4">
                    <h3 className="text-2.5xl sm:text-4xl md:text-5xl font-sans tracking-tight font-light text-white uppercase mt-2">
                      {work.title}
                    </h3>
                  </div>
                </div>

                {/* Lower Section inside Card Border - BG Black */}
                <div className="w-full bg-studio-dark border-t border-white/15 py-5 sm:py-6 px-6 text-center flex flex-col items-center gap-3.5 select-none pointer-events-none">
                  <p className="text-xs sm:text-xs md:text-[0.92rem] font-sans font-light text-zinc-300 leading-relaxed max-w-xl">
                    {work.description}
                  </p>
                  <div className="inline-flex items-center justify-center border-l border-r border-white/10 px-4 py-0.5">
                    <span className="text-[10px] md:text-xs font-mono tracking-wider text-zinc-500 font-light uppercase">
                      {work.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
