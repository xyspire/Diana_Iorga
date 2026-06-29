'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Mail, Instagram, Linkedin } from 'lucide-react';
import { TextAnimate } from './ui/text-animate';

interface ContactFooterSectionProps {
  onScrollToTop: () => void;
}

export default function ContactFooterSection({ onScrollToTop }: ContactFooterSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of our parent container for the card scaling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 25%'],
  });

  // Card scales from 95vw (inset) to 100vw (full width)
  const width = useTransform(scrollYProgress, [0, 1], ['95vw', '100vw']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['40px', '0px']);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black z-25 flex justify-center overflow-x-hidden min-h-[95vh]"
      id="contact-studio"
    >
      <div
      
        className="relative mx-auto bg-studio-dark overflow-hidden flex flex-col justify-between min-h-[95vh]"
      >
        {/* ─── Background: herobg.jpeg with blur + gradient overlay ─── */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <img
            src="/herobg.jpeg"
            alt=""
            className="w-full h-full object-cover object-center filter blur-[18px] saturate-[150%] brightness-[1.05] scale-110"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Dark gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-b from-studio-dark/80 via-studio-dark/30 to-studio-dark/85 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-studio-dark/60 via-transparent to-studio-dark/30 pointer-events-none" />
        </div>

        {/* ─── Main Content: top padding, full width with px-6 ─── */}
        <div className="relative z-10 w-full px-6 pt-28">

          {/* Two-column grid: left (profile + contact) | right (headline) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="col-span-12 lg:col-span-5 flex flex-row gap-6 sm:gap-10">

              {/* Vertical social strip */}
              <div className="flex flex-col gap-5 pt-2 pr-6 shrink-0">
                <a
                  href="mailto:diananiculina11@gmail.com"
                  className="text-zinc-500 hover:text-white hover:scale-110 transition-all duration-300"
                  title="Email"
                >
                  <Mail className="w-[18px] h-[18px] stroke-[1.5]" />
                </a>
                <a
                  href="https://www.instagram.com/didinico11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white hover:scale-110 transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram className="w-[18px] h-[18px] stroke-[1.5]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/diana-niculina-iorga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white hover:scale-110 transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="w-[18px] h-[18px] " />
                </a>
              </div>

              {/* Profile block */}
              <div className="flex flex-col items-start justify-start flex-1 gap-8">

                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 bg-zinc-900 shrink-0" >
                  <img
                    src="/avatar.png"
                    alt="Diana Iorga"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white text-base font-sans font-medium tracking-tight leading-none">
                      Diana Iorga
                    </span>
                    <span className="text-zinc-500 text-[11px] font-sans font-light leading-none">
                      Graphic Designer
                    </span>
                  </div>
                </div>

                {/* Email contact */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-sans  uppercase tracking-widest text-zinc-500 leading-none">
                    Contact me
                  </span>
                  <a
                    href="mailto:diananiculina11@gmail.com"
                    className="text-white text-xl sm:text-2xl md:text-[1.75rem] font-sans font-light tracking-tight hover:text-zinc-300 transition-colors duration-300 leading-tight"
                  >
                    diananiculina11@gmail.com
                  </a>
                </div>

                {/* Book a call CTA */}
                <div className="relative group cursor-pointer inline-block">
                  <a href="mailto:diananiculina11@gmail.com" className="flex items-center gap-1.5 pb-1 select-none">
                    <span className="text-xs sm:text-sm font-sans font-light tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">
                      contact me
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                  <div className="h-[0.75px] bg-white/20 group-hover:bg-white/90 transition-all duration-300 w-full" />
                </div>

              </div>
            </div>

            {/* ── RIGHT COLUMN: Headline ── */}
            <div className="col-span-12 lg:col-span-7 flex flex-col items-start justify-start gap-6 lg:pl-8">
              <h2 className="text-3xl w-[65%] sm:w-full sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-sans font-light leading-[1.08] tracking-tight text-white">
                <TextAnimate animation="slideUp" by="word" duration={1.0}>
                  Get in touch and let&apos;s turn concepts into stunning websites
                </TextAnimate>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-zinc-500 text-sm sm:text-base font-sans font-light tracking-wide"
              >
                Transforming ideas into reality
              </motion.p>
            </div>

          </div>
        </div>

        {/* ─── Bottom: Giant "Let's talk" + Footer bar ─── */}
        <div className="relative z-10 w-full flex flex-col justify-end mt-16 md:mt-20">

          {/* Giant background text */}
          <div className="w-full text-center select-none pointer-events-none overflow-hidden leading-[0.78] px-2 pb-1">
            <TextAnimate animation="slideUp" by="word" duration={1.0}  className="text-[17vw] sm:text-[18vw] md:text-[25vw] font-extralight text-white font-sans tracking-tighter leading-[0.78] m-0 p-0">
              Let&apos;s talk
            </TextAnimate>
          </div>

          {/* Footer bar */}
          <div className="w-full px-6 md:px-14 lg:px-20 border-t border-white/10 pt-5 pb-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] text-zinc-500 font-sans tracking-wide">

            {/* Left: copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 text-center sm:text-left">
              <span>© Diana Iorga 2026 | All Rights Reserved</span>
              {/* <a href="#contact-studio" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#contact-studio" className="hover:text-white transition-colors">Privacy Policy</a> */}
            </div>

            {/* Right: globe + created by */}
            <div className="flex items-center gap-6 sm:gap-8">
              <p>Created by Xyspire</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
