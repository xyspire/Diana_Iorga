'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Spade } from 'lucide-react';
import { LiquidButton, GlassFilter } from '@/components/ui/liquid-glass-button';

export default function AboutSection() {
  return (
    <section
      className="w-full py-16 md:py-24 relative z-10 bg-studio-dark overflow-hidden"
      id="about-section"
    >
      {/* Required once per page for LiquidButton glass distortion */}
      <GlassFilter />

      <div className="w-full px-6 relative z-10">

        {/* Badge — exact same style as SelectedWorks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white">
            <Spade className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xl font-mono tracking-widest text-zinc-300 uppercase">
              About Me
            </span>
          </div>
        </motion.div>

        {/* Photo on top, Text below — full flex-col on every screen */}
        <div className="flex flex-col gap-4">

          {/* TOP — Photo (centered, fixed height, no border) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="relative w-[260px] sm:w-[320px] md:w-[380px] h-[340px] sm:h-[420px] md:h-[500px] overflow-hidden rounded-sm">
              <img
                src="/formal_photo.png"
                alt="Diana Iorga"
                className="w-full h-full object-cover object-top brightness-[0.88] saturate-[0.85] select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-dark/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* BOTTOM — Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col justify-between rounded-sm p-8 md:p-10 lg:p-14"
          >
            {/* Main bio text */}
            <div className="flex flex-col gap-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-light font-sans text-white tracking-tight leading-[1.3]">
                My journey into graphic design began with a simple passion for creating and a drive to teach myself the rules of visual communication.
              </p>

              <div className="h-[1px] w-full bg-white/8" />

              <p className="text-sm sm:text-base font-sans font-light text-zinc-400 leading-relaxed">
                Today, that self-starting foundation shapes my entire professional approach: I am deeply curious, highly adaptable, and constantly looking to experience different design fields to broaden my expertise.
              </p>

              <p className="text-sm sm:text-base font-sans font-light text-zinc-500 leading-relaxed">
                I don&apos;t believe in staying inside a creative box. By exploring everything from digital design to print layout, I bring a fresh, multi-disciplinary perspective to every project. I focus on delivering clean, professional, and purposeful designs that elevate your brand and connect with your audience.
              </p>
            </div>

            {/* Bottom — name / role + LiquidButton pills */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pt-8 border-t border-white/8">
              <div>
                <p className="text-base font-sans font-normal text-white tracking-tight">Diana Iorga</p>
                <p className="text-[11px] font-mono text-zinc-600 tracking-widest uppercase mt-1">Graphic Designer</p>
              </div>

              {/* LiquidButton skill pills */}
              <div className="flex flex-wrap gap-3">
                <LiquidButton size="sm">
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-300">Print</span>
                </LiquidButton>
                <LiquidButton size="sm">
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-300">Branding</span>
                </LiquidButton>
                <LiquidButton size="sm">
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-300">Digital</span>
                </LiquidButton>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
