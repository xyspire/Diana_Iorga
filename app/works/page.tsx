"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import NavigationOverlay from "@/components/NavigationOverlay";
import ContactFooterSection from "@/components/ContactFooterSection";
import { PROJECTS_DATA, Project } from "@/lib/projects-data";
import { TextAnimate } from "@/components/ui/text-animate";

export default function WorksPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    slug: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative min-h-screen text-white bg-studio-black">
      <Header onMenuTrigger={() => setIsMenuOpen(true)} />
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end bg-studio-black overflow-hidden pb-0">
        {/* Subtle ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[50vw] h-[60vh] opacity-[0.12] blur-[140px]"
            style={{ background: "radial-gradient(circle, #6b21a8 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-[0.07] blur-[120px]"
            style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-14 md:pb-20">
          {/* Year badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase mb-3"
          >
            (2024–25©)
          </motion.p>

          {/* Two-column: big heading left, descriptor right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
            {/* Big title */}
            <div className="shrink-0">
              <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-light font-sans tracking-tighter text-white leading-[0.88] uppercase">
                <TextAnimate animation="slideUp" by="word" duration={1.0}>
                  Selected
                </TextAnimate>
                <br />
                <span className="text-white/25">
                  <TextAnimate animation="slideUp" by="word" duration={1.0} delay={0.08}>
                    Works.
                  </TextAnimate>
                </span>
              </h1>
            </div>

            {/* Right descriptor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-sm lg:max-w-xs xl:max-w-sm shrink-0 pb-2"
            >
              <p className="text-sm md:text-base font-sans font-light text-zinc-400 leading-relaxed mb-6">
                A curated selection of client work, brand identities, and visual experiments — crafted with intention and care.
              </p>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-600 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/8" />
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="relative z-10 bg-studio-black w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={idx}
              isHovered={hoveredSlug === project.slug}
              mousePos={mousePos}
              onHover={setHoveredSlug}
              onMouseMove={handleMouseMove}
              onClick={() => router.push(`/works/${project.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <ContactFooterSection onScrollToTop={() => scrollToSection("page-top")} />
    </div>
  );
}

/* ────────────────── PROJECT CARD ────────────────── */
interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  onHover: (slug: string | null) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>, slug: string) => void;
  onClick: () => void;
}

function ProjectCard({
  project,
  index,
  isHovered,
  mousePos,
  onHover,
  onMouseMove,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => onHover(project.slug)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={(e) => onMouseMove(e, project.slug)}
    >
      <div className="relative w-full overflow-hidden rounded-sm border border-white/10 bg-studio-dark">
        {/* Image area — tall aspect */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">

          {/* Hover VIEW label following cursor */}
          <motion.div
            className="absolute pointer-events-none z-30 hidden sm:block"
            style={{ left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="relative py-2.5 px-5 bg-black/40 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/25" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/25" />
              <span className="text-[10px] font-mono tracking-widest text-white uppercase select-none font-light flex items-center gap-1.5">
                View <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>

          {/* Project number */}
          <div className="absolute top-5 left-5 z-20">
            <span className="text-[11px] font-mono text-white/30 tracking-widest">{project.id}</span>
          </div>

          {/* Category badge */}
          <div className="absolute top-5 right-5 z-20">
            <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase px-2.5 py-1 border border-white/10 rounded-full bg-black/30 backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Hero image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-[900ms] ease-out brightness-[0.7]"
            referrerPolicy="no-referrer"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

          {/* Bottom-left title overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
            <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-2">{project.subtitle}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-sans tracking-tight text-white uppercase leading-[0.9]">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Card footer strip */}
        <div className="w-full bg-studio-dark border-t border-white/10 py-4 px-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs font-sans font-light text-zinc-400 leading-relaxed max-w-sm">
            {project.description}
          </p>
          <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300 shrink-0">
            <span className="text-[10px] font-mono tracking-widest uppercase">View Case</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
