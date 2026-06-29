'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, ArrowUp, ArrowDown, Spade } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: '01',
    question: 'How long does it take to build a website?',
    answer: 'With Framer, websites can be built surprisingly fast. Depending on the scope, a site can be ready in a few days to a couple of weeks. Templates make the process even quicker — you can launch in hours.'
  },
  {
    id: '02',
    question: 'Do you offer custom designs or templates?',
    answer: 'I specialize in fully bespoke, custom digital experiences tailored exactly to your brand guidelines and business objectives. While templates are available for fast track validation, custom designs offer unparalleled distinction.'
  },
  {
    id: '03',
    question: 'Will my website work on mobile devices?',
    answer: 'Absolutely. Every single experience is built with modern, fluid responsive standards to ensure flawless performance and visual perfection across all modern smartphones, tablets, laptops, and ultra-wide displays.'
  },
  {
    id: '04',
    question: 'Do you design and write the content as well?',
    answer: 'Yes! Through collaborative creative briefs, I can help refine, write, and align your copy to fit the storytelling grids perfectly, creating cohesive and high-converting marketing narratives.'
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative w-full py-24 md:py-32 bg-studio-dark border-t border-white/5 overflow-hidden"
      id="faq-section"
    >
      {/* Absolute Noise Overlay for visual continuity */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Grid container layout */}
      <div className="w-full px-6  flex flex-col gap-12 sm:gap-16">

        {/* Responsive Header Elements */}

         <div className="flex flex-col items-start gap-4 max-w-xl bg-studio-dark z-10">
          <div className="inline-flex items-center gap-2 px-3    py-1.5 rounded-full border border-white">
            <Spade className="w-3.5 h-3.5 text-white" />
            <h2 className="text-xl font-mono tracking-widest text-white uppercase">FAQ</h2>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-sans tracking-tight font-light text-white leading-tight">
            Here are some quick answers to the things I get asked most often
          </p>
        </div>

        {/* List of FAQ items */}
        <div className="relative w-full flex flex-col">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                onClick={() => handleToggle(index)}
                className="group relative w-full py-8 md:py-12 border-b border-white/10 flex flex-col cursor-pointer transition-colors duration-300 hover:bg-white/[0.01]"
              >
                {/* Horizontal line indicator expanding on hover or open */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left z-10"
                />

                <div className="w-full flex items-start gap-6 md:grid md:grid-cols-12 md:gap-12">
                  {/* Left Column: Number */}
                  <div className="md:col-span-1 flex items-baseline pt-1">
                    <span className="text-xs sm:text-sm font-mono text-zinc-650 group-hover:text-zinc-400 transition-colors duration-300 font-light select-none">
                      {item.id}
                    </span>
                  </div>

                  {/* Center Column: Question & Answer (offset on md screens) */}
                  <div className="flex-1 md:col-span-10 flex flex-col gap-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-light text-zinc-350 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight">
                      {item.question}
                    </h3>

                    {/* Expandable Answer Section with responsive animate height */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1
                          }}
                          exit={{
                            height: 0,
                            opacity: 0
                          }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm md:text-base font-sans font-light text-zinc-400 leading-relaxed pr-6 md:pr-12 max-w-3xl pt-2 pb-1">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Column: Arrow Icon */}
                  <div className="md:col-span-1 flex justify-end items-center pt-1">
                    <div className="text-zinc-600 group-hover:text-white transition-colors duration-300 transform select-none">
                      {isOpen ? (
                        <ArrowUp className="w-5 h-5 stroke-[1.2]" />
                      ) : (
                        <ArrowDown className="w-5 h-5 stroke-[1.2]" />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
