"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LayoutGrid, Spade } from "lucide-react";

const TESTIMONIALS_DATA = [
  {
    id: "01",
    name: "Emily Carter",
    role: "Founder at Bloom Agency",
    date: "04.08.2025",
    text: "“It was a very cool experience! The designer understood my vision perfectly and turned my ideas into reality. Thank you again, and I wish you prosperity!”",
    tilt: 0,
    zIndex: 10,
    logo: (
      <svg
        className="w-9 h-9"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 5C22.5 12.5 27.5 17.5 35 20C27.5 22.5 22.5 27.5 20 35C17.5 27.5 12.5 22.5 5 20C12.5 17.5 17.5 12.5 20 5Z"
          fill="url(#clover-grad)"
        />
        <defs>
          <radialGradient
            id="clover-grad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(20 20) rotate(90) scale(15)"
          >
            <stop stopColor="#caa9f3" />
            <stop offset="0.5" stopColor="#b37ad4" />
            <stop offset="1" stopColor="#7997e6" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "02",
    name: "Liam Henderson",
    role: "Creative Director at Novus Studio",
    date: "12.10.2025",
    text: "“Absolutely breathtaking attention to detail. Every interaction feels heavy, intentional, and fully realized. He didn’t just build our site; he defined our digital essence with rare artistic clarity.”",
    tilt: -5.3,
    zIndex: 20,
    logo: (
      <svg
        className="w-9 h-9"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20M5 20A15 15 0 1 1 35 20A15 15 0 1 1 5 20"
          stroke="url(#circle-grad)"
          strokeWidth="2.5"
          strokeDasharray="3 3"
        />
        <circle cx="20" cy="20" r="8" fill="#b37ad4" opacity="0.8" />
        <defs>
          <linearGradient
            id="circle-grad"
            x1="5"
            y1="5"
            x2="35"
            y2="35"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b37ad4" />
            <stop offset="1" stopColor="#7997e6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "03",
    name: "Sophia Vance",
    role: "Product Lead at Vesper Tech",
    date: "18.02.2026",
    text: "“The combination of technical excellence and master-level visual craft is exceptionally rare. A total professional from briefing to deployment. Our conversion rate increased by 42% post-launch.”",
    tilt: 4.2,
    zIndex: 30,
    logo: (
      <svg
        className="w-9 h-9"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          rx="4"
          stroke="url(#rect-grad)"
          strokeWidth="2"
        />
        <path
          d="M14 20H26"
          stroke="#7997e6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 14V26"
          stroke="#7997e6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="rect-grad"
            x1="8"
            y1="8"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7997e6" />
            <stop offset="1" stopColor="#caa9f3" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracker setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Slide up transitions & fades for individual cards
  // Card 1
  const y1 = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.85, 1.0],
    ["100vh", "0vh", "0vh", "0px"],
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.85, 1.0],
    [0, 1, 1, 1],
  );
  const scale1 = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.45, 0.85],
    [0.93, 1, 0.96, 0.93],
  );

  // Card 2
  const y2 = useTransform(
    scrollYProgress,
    [0.26, 0.46, 0.85, 1.0],
    ["100vh", "0vh", "0vh", "0px"],
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.26, 0.42, 0.85, 1.0],
    [0, 1, 1, 1],
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0.26, 0.46, 0.7, 0.85],
    [0.93, 1, 0.98, 0.96],
  );

  // Card 3
  const y3 = useTransform(
    scrollYProgress,
    [0.55, 0.75, 0.85, 1.0],
    ["100vh", "0vh", "0vh", "0px"],
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.55, 0.71, 0.85, 1.0],
    [0, 1, 1, 1],
  );
  const scale3 = useTransform(
    scrollYProgress,
    [0.55, 0.75, 0.85, 1.0],
    [0.93, 1, 1, 1],
  );

  // Background "Feedback" text scroll parallax animation
  const yFeedback = useTransform(scrollYProgress, [0.0, 0.85], ["25%", "0%"]);
  const opacityFeedback = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.8, 1.0],
    [0.2, 0.9, 0.9, 0.9],
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] "
      id="testimonials-stack-container"

    >
      {/* Sticky Frame Viewport - locks in place while cards layer across on scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-studio-dark flex flex-col justify-between"  >



        {/* Header Elements */}
        <div className="w-full px-6  flex  justify-between items-center gap-12 sm:gap-16">

        <div className="flex flex-col items-start gap-4 max-w-xl bg-studio-dark z-10">
          <div className="inline-flex items-center gap-2 px-3  py-1.5 rounded-full border border-white">
            <Spade className="w-3.5 h-3.5 text-white" />
            <h2 className="text-xl font-mono tracking-widest text-white uppercase">SERVICES</h2>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-sans tracking-tight font-light text-white leading-tight">
             A few highlights from the amazing people I’ve had the chance to
              design for
          </p>
        </div>

          {/* Top Right minimal elegant thin arrow */}
          <div className="hidden md:block">
            <svg
              className="w-60 h-60 text-zinc-600 stroke-[0.75] hover:text-white hover:scale-105 transition-all duration-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 19L19 5"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5H19V15"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Central Display Area for Layered / Stacked Testimonial Cards */}
        <div className="absolute inset-x-0 top-[26%] md:top-[22%] bottom-[16%] flex items-center justify-center pointer-events-none z-30">
          {TESTIMONIALS_DATA.map((testimonial, index) => {
            const transforms = [
              { y: y1, opacity: opacity1, scale: scale1, mt: "" },
              { y: y2, opacity: opacity2, scale: scale2, mt: "mt-3 sm:mt-4" },
              { y: y3, opacity: opacity3, scale: scale3, mt: "mt-6 sm:mt-8" },
            ];
            const { y, opacity, scale, mt } = transforms[index];

            return (
              <motion.div
                key={testimonial.id}
                style={{
                  y,
                  opacity,
                  scale,
                  rotate: testimonial.tilt,
                  zIndex: testimonial.zIndex,
                }}
                className={`absolute max-w-[90vw] w-[86vw] md:w-[62vw] lg:w-[48vw] max-w-[720px] pointer-events-auto origin-center ${mt}`}
              >
                <div className="relative w-full bg-white rounded-sm py-8 px-8 sm:py-10 sm:px-10 border border-zinc-200 shadow-[0_24px_70px_rgba(0,0,0,0.45)] group flex flex-col justify-between min-h-[220px] sm:min-h-[260px]">
                  {/* Card top row */}
                  <div className="flex items-center justify-between w-full mb-3.5 sm:mb-5">
                    <div className="flex items-center justify-center">
                      {testimonial.logo}
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-light select-none">
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Main quote */}
                  <p className="text-zinc-800 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed tracking-tight tracking-wide mb-6 sm:mb-8 font-light italic">
                    {testimonial.text}
                  </p>

                  {/* Footer metadata */}
                  <div className="flex flex-col items-start gap-0.5">
                    <h4 className="text-zinc-900 text-sm sm:text-base font-sans font-medium tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-zinc-500 text-xs sm:text-sm font-sans font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Absolute Background word element at the bottom - "Feedback" with elegant font weights */}
        <motion.div
          style={{ y: yFeedback, opacity: opacityFeedback }}
          className="absolute bottom-0 left-0 w-full text-center select-none pointer-events-none z-10 overflow-hidden leading-[0.75] px-4"
        >
          <h2 className="text-[17vw] sm:text-[19vw] md:text-[21vw] font-extralight text-white tracking-tighter uppercase font-sans select-none pointer-events-none leading-[0.75] mb-0 pb-0">
            Feedback
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
