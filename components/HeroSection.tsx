"use client";

import React from "react";
import { Globe, Instagram, InstagramIcon, Linkedin, Mail } from "lucide-react";
import Noise from "./Noise";
import { MorphingText } from "./ui/liquid-text";
import Image from "next/image";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TextAnimate } from "./ui/text-animate";

export default function HeroSection() {
  const words = [
    "Tomorrow",
    "Visionaries",
    "Innovation",
    "Excellence",
    "Ambition",
    "Growth",
  ];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
    
      className="sticky top-0 h-screen w-full flex flex-col justify-end px-6 pb-20 md:px-16 md:pb-24 lg:px-12 overflow-hidden bg-transparent z-0"
      id="page-top"
      ref={containerRef}
      
    >
      {/* Background Image Layer (lowest z-index) */}
      <motion.div 

       initial={{ scale: 1.25, z: 10 }}
        animate={{ scale: 1, z: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
       
          className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/herobg.jpeg"
          alt="Background"
          className="w-full h-full object-cover transition-all duration-700 select-none pointer-events-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Hide the broken image if the file is empty/missing
            (e.target as HTMLElement).style.display = "none";
          }}
          loading="eager"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Atmospheric Noise Layer (above background image, below content) */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden select-none">
        <Noise
          patternSize={50}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={1}
          patternAlpha={7}
        />
      </div>

      {/* Interactive Content Grid (highest z-index) */}
      <motion.div style={{y}}  className="flex  w-full gap-4 items-end relative z-20">
        {/* Stacked Social Icons - Aligned vertically to the left of the title */}
        <div className="md:col-span-1 flex flex-col items-start md:gap-8 md:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className=" hidden md:flex flex-col items-center gap-10 text-[13px] tracking-wide"
          >
            <a
              href="mailto:diananiculina11@gmail.com"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
              title="Email"
            >
              <Mail className="w-5 h-5 text-zinc-300" />
            </a>
             <a
              href="https://www.instagram.com/didinico11/"
              
              target="_blank"
              className="text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
              title="Instagram"
            >
              <Instagram className="w-5 h-5 text-zinc-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/diana-niculina-iorga/"
              target="_blank"
              className="text-white/60 hover:text-white font-sans font-medium tracking-tight hover:scale-105 transition-all text-[15px]"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-zinc-300" />
            </a>
          </motion.div>
        </div>

        {/* Headline Typography Column: "Designing for You" */}
        <div className="col-span-11 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, ease: "easeInOut" }}
            className="flex flex-col"
          >
            <h1
              className="text-6xl sm:text-8xl md:text-9xl leading-[0.88] md:leading-[0.85] font-sans font-normal tracking-tighter select-none pb-20 md:pb-3 lg:pb-0 "
              id="hero-display-headline"
            >
              <span className="block text-white"><TextAnimate animation="slideUp" by="word">Crafting</TextAnimate></span>
              <span className="flex items-center mt-2 w-full">
                <span className="text-studio-gray-400 font-light mr-4 shrink-0">
                  for{" "}
                </span>
                <MorphingText texts={words} className="text-white flex-1" />
              </span>
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
