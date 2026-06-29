'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';
import LineButton from './LineButton';
import { LiquidButton, GlassFilter } from './ui/liquid-glass-button';
import CountUp from './ui/CountUp';

export default function StudioStatsSection() {
  const handleScrollToWorks = () => {
    const element = document.getElementById('selected-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="w-full min-h-[90vh] pt-28 px-6 z-10 bg-studio-dark"
      id="studio-stats"
    >

      {/* Background Gradient on the left side using herobg */}
      <div className="absolute left-0 top-0 h-full w-full select-none pointer-events-none z-0 opacity-60">
        <img
          src="/herobg.jpeg"
          alt=""
          className="w-full h-full object-cover object-left select-none pointer-events-none filter blur-[15px] saturate-[140%] brightness-[1.1]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-studio-dark/40 to-studio-dark pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-studio-dark via-transparent to-studio-dark pointer-events-none" />
      </div>
      {/*
        GlassFilter renders the SVG filter definition ONCE here.
        All LiquidButton instances in this section reference "lg-glass-filter".
      */}
      <GlassFilter />

      {/* Main Stats Group */}
      <div className="min-w-full flex justify-center align-end mt-12 md:mt-16 z-10">
        <div className="flex flex-col items-end gap-3 sm:gap-4 md:gap-5 min-w-full text-right font-sans">

          {[
            { id: 'projects', value: '2', label: 'Projects' },
            { id: 'years', value: '10', label: 'Years Experience' },
            { id: 'clients', value: '80', label: 'Happy Clients' },
            { id: 'awards', value: '10', label: 'Awards' },
          ].map((stat, index) => {
            const delay = 1.5 + (index * 0.1);
            const isTextFirst = index % 2 === 0;

            const textAnimateNode = (
              <span className="relative inline-block" key={`text-${stat.id}`}>
                <TextAnimate
                  animation="slideUp"
                  by="word"
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-light tracking-tight text-white uppercase leading-[0.95]"
                >
                  {stat.label}
                </TextAnimate>
              </span>
            );

            const numberNode = (
              <motion.div
                key={`num-${stat.id}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
                className="flex-shrink-0 relative"
              >
                <LiquidButton size="badge" className="pointer-events-none p-2">
                  <CountUp
                    from={0}
                    to={parseInt(stat.value)}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    delay={0}
                  />+
                </LiquidButton>

              </motion.div>
            );

            return (
              <div key={stat.id} className="flex items-center gap-3 sm:gap-4 md:gap-5 justify-end group">
                {isTextFirst ? (
                  <>
                    {textAnimateNode}
                    {numberNode}
                  </>
                ) : (
                  <>
                    {numberNode}
                    {textAnimateNode}
                  </>
                )}
              </div>
            );
          })}

        </div>
      </div>

    </section>
  );
}
