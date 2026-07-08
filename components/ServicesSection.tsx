'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { LayoutGrid, Spade } from 'lucide-react';
import Image from 'next/image';

const SERVICES_ITEMS = [
  {
    id: '01',
    title: 'Logo Design',
    description: 'I design user-first interfaces for mobile apps, SaaS platforms, and dashboards — balancing usability with aesthetics. Every screen is purposeful, every flow frictionless.',
    image: '/service_logo.jpg',
    tags: ['Mobile Apps', 'SaaS', 'Dashboards', 'Aesthetics']
  },
  {
    id: '02',
    title: 'Product Design',
    description: 'From landing pages to full websites — I craft sleek, high-converting web designs that capture attention and drive results.',
    image: '/product_design.jpg',
    tags: ['Websites', 'Landing pages', 'Portfolio & personal sites']
  },
  {
    id: '03',
    title: 'Thumnail Design',
    description: 'I help shape bold, cohesive identities that speak clearly and look sharp across every touchpoint.',
    image: '/thumbnail.png',
    tags: ['Visual Identity', 'Styleguides', 'Typography', 'Logo Systems']
  },
  {
    id: '04',
    title: 'Music Album Design',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: '/music.jpg',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  },
  {
    id: '05',
    title: 'Notebook Cover Design',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: '/notebook.jpg',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  },
  {
    id: '06',
    title: 'Book Cover Design',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: '/book_cover.jpg',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  },
  {
    id: '07',
    title: '3D Modelling',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: '/3d_model.jpg',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  },
  {
    id: '08',
    title: 'Motion Graphics',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  },
  {
    id: '09',
    title: 'Social Media Assets',
    description: 'I bring your designs to life in Framer — with animations, CMS integration, and performance optimization baked in.',
    image: '/social.jpg',
    tags: ['Web Animations', 'CMS Integration', 'SEO Optimized', 'Speed Performance']
  }
];

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth cursor tracking within the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic values for rotation that change depending on movement direction
  const rotation = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRot = useSpring(rotation, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Dynamic rotation: subtle tilt depending on position relative to center of screen x
    const tilt = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    rotation.set(tilt);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(null)}
      className="relative w-full py-24 overflow-hidden bg-studio-dark"
      id="services-section"

    >

      {/* Grid container layout */}
      <div className="w-full px-6  flex flex-col gap-12 sm:gap-16"
      >


        {/* Responsive Header Elements */}
        <div className="flex flex-col items-start gap-4 max-w-xl bg-studio-dark z-10">
          <div className="inline-flex items-center gap-2 px-3    py-1.5 rounded-full border border-white">
            <Spade className="w-3.5 h-3.5 text-white" />
            <h2 className="text-xl font-mono tracking-widest text-white uppercase">SERVICES</h2>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-sans tracking-tight font-light text-white leading-tight">
            Explore a range of creative services made to grow your brand and reach more people
          </p>
        </div>


        {/* List of Services */}
        <div className="relative w-full flex flex-col mt-4">
          {SERVICES_ITEMS.map((service, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(index)}
                className="relative group w-full pt-10 pb-2 md:pt-14 border-b border-white flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 cursor-pointer transition-colors duration-500 hover:bg-white/[0.01]"
              >
                {/* Horizontal line indicator expanding on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-left z-10"
                />

                {/* Left side: Title + id */}
                <div className="col-span-12 md:col-span-6 lg:col-span-7 flex items-baseline gap-2 z-1">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-white transition-colors duration-500 tracking-tight leading-none">
                    {service.title}

                    <span className="text-xs sm:text-sm font-mono align-super text-white font-light select-none ml-2">{service.id}</span>
                  </h3>

                </div>

                {/* Right side: Description & Action/Details */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-4 justify-center z-1">
                  <p className="text-sm sm:text-base font-sans font-light text-white leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Bullet and Expandable Hashtags with responsive animation height */}
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-2 flex-wrap pt-2"
                    >
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-0.5 text-white "
                        >
                          <span>|</span>  # {tag}  <span>|</span>
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Card Asset following cursor (ONLY visible on desktop to ensure amazing layouts) */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none z-[100]">
        <AnimatePresence mode="wait">
          {hoveredIdx !== null && (
            <motion.div
              style={{
                left: 0,
                top: 0,
                x: smoothX,
                y: smoothY,
                rotate: smoothRot,
              }}
              className="absolute w-[280px] md:w-[320px] lg:w-[360px] aspect-[5/3] overflow-hidden rounded-lg pointer-events-none origin-center -translate-x-1/2 -translate-y-1/2"
              initial={{
                scale: 0.6,
                opacity: 0,
                x: mouseX.get(),
                y: mouseY.get(),
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              exit={{
                scale: 0.6,
                opacity: 0
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
                opacity: { duration: 0.15 }
              }}
            >
              {/* Backing glow effect */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 shadow-[0_32px_96px_rgba(0,0,0,0.85)] flex items-center justify-center">

                {/* Visual Image container */}
                <motion.img
                  key={hoveredIdx}
                  src={SERVICES_ITEMS[hoveredIdx].image}
                  alt={SERVICES_ITEMS[hoveredIdx].title}
                  className="w-full h-full object-cover filter brightness-[0.85] select-none z-[1000]"
                  initial={{ scale: 1.15, filter: 'blur(4px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  exit={{ scale: 1.15 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  referrerPolicy="no-referrer"
                />

                {/* Vignette ambient border shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Inline Visual View support to make it perfectly responsive on mobile viewport */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 640px) {
          #services-section .group:hover {
            background-color: rgba(255, 255, 255, 0.02);
          }
        }
      `}} />
    </section>
  );
}
