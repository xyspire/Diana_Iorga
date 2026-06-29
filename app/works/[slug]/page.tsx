"use client";

import React, { useState, useRef, use } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import NavigationOverlay from "@/components/NavigationOverlay";
import ContactFooterSection from "@/components/ContactFooterSection";
import { getProjectBySlug, getOtherProjects } from "@/lib/projects-data";
import { TextAnimate } from "@/components/ui/text-animate";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const otherProjects = getOtherProjects(slug);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 450);
  };

  return (
    <div className="relative min-h-screen text-white bg-studio-black">
      <Header onMenuTrigger={() => setIsMenuOpen(true)} />
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* ──────────────── HERO ──────────────── */}
      {/* Reference layout: left side has date + large title + "visit" link;
           right side has project logo/brand image; below: metadata table */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden bg-studio-black"
        id="project-hero"
      >
        {/* Parallax dark hero image — bottom half bleeds into view */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img
            src={project!.heroImage}
            alt={project!.title}
            className="w-full h-full object-cover brightness-[0.22] saturate-[0.7]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-studio-black/60 via-transparent to-studio-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-studio-black/30 via-transparent to-transparent z-[1]" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 left-6 md:top-8 md:left-12 z-30 mt-14 md:mt-16"
        >
          <button
            onClick={() => router.push("/works")}
            className="group inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
            All Works
          </button>
        </motion.div>

        {/* Main hero content — split layout */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full h-full min-h-screen flex flex-col justify-end pb-0"
        >
          <div className="w-full px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-44 md:pb-20">
            {/* Date row */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase mb-3"
            >
              {project!.metadata.year}
            </motion.p>

            {/* Split: title left + logo/image right */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12 mb-12 md:mb-16">
              {/* LEFT: Big title */}
              <div className="flex-1 max-w-2xl">
                <h1 className="text-[14vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-light font-sans tracking-tighter text-white leading-[0.88] uppercase mb-8">
                  <TextAnimate animation="slideUp" by="word" duration={1.1}>
                    {project!.title}
                  </TextAnimate>
                </h1>

                {/* "visit website" style CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="relative group inline-block"
                >
                  <a
                    href={`mailto:diananiculina11@gmail.com`}
                    className="flex items-center gap-2 pb-1 select-none"
                  >
                    <span className="text-xs font-sans font-light tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">
                      get in touch
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                  <div className="h-[0.75px] bg-white/20 group-hover:bg-white/80 transition-all duration-300 w-full" />
                </motion.div>
              </div>

              {/* RIGHT: showcase image / project visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 w-full lg:w-[38%] xl:w-[35%]"
              >
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10">
                  <img
                    src={project!.showcaseImage}
                    alt={`${project!.title} showcase`}
                    className="w-full h-full object-cover brightness-[0.8]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-3 text-[10px] font-mono text-zinc-600 tracking-widest uppercase text-right">
                  {project!.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Metadata table row — full width, divider lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-full border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
                {[
                  { label: "Industry", value: project!.metadata.industry ?? project!.metadata.services },
                  { label: "Scope of work", value: project!.metadata.services },
                  { label: "Duration", value: project!.metadata.duration ?? "—" },
                  { label: "Year", value: project!.metadata.year },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5 px-0 py-5 first:pl-0 last:pr-0 pl-6 md:pl-8">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                      {item.label}
                    </span>
                    <span className="text-sm font-sans font-light text-zinc-300 leading-snug">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ──────────────── OVERVIEW / LONG DESCRIPTION ──────────────── */}
      <section className="relative z-10 bg-studio-black w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="h-[1px] w-6 bg-white/20" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">Overview</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Long description — left, big */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <p className="text-2xl sm:text-3xl md:text-[2rem] xl:text-[2.25rem] font-light font-sans tracking-tight text-white leading-[1.25] mb-10">
                {project!.longDescription}
              </p>

              <div className="h-[1px] w-full bg-white/8 mb-8" />

              {/* Deliverables */}
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block mb-4">
                  Deliverables
                </span>
                <div className="flex flex-wrap gap-2">
                  {project!.deliverables.map((d, i) => (
                    <motion.span
                      key={d.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="px-3.5 py-1.5 text-[11px] font-mono tracking-wide uppercase text-zinc-400 border border-white/10 rounded-full hover:border-white/25 hover:text-white transition-all duration-300"
                    >
                      {d.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Metadata card — right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="border border-white/10 rounded-sm overflow-hidden">
                {[
                  { label: "Client", value: project!.metadata.client },
                  { label: "Role", value: project!.metadata.role },
                  { label: "Year", value: project!.metadata.year },
                  { label: "Services", value: project!.metadata.services },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-5 ${i < 3 ? "border-b border-white/8" : ""} hover:bg-white/[0.02] transition-colors duration-300`}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                      {item.label}
                    </span>
                    <span className="text-sm font-sans font-light text-zinc-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── HERO SHOWCASE IMAGE (full-bleed wide) ──────────────── */}
      <section className="relative z-10 w-full px-4 md:px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-sm overflow-hidden border border-white/10"
          style={{ aspectRatio: "16/7" }}
        >
          <img
            src={project!.heroImage}
            alt={`${project!.title} full view`}
            className="w-full h-full object-cover brightness-[0.7] saturate-[0.85] hover:brightness-[0.82] hover:scale-[1.02] transition-all duration-[1200ms] ease-out"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* ──────────────── CASE STUDY SECTIONS ──────────────── */}
      {project!.caseStudySections && project!.caseStudySections.length > 0 && (
        <section className="relative z-10 bg-studio-black w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            {project!.caseStudySections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start"
              >
                {/* Left: section label + title */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                      0{i + 1}
                    </span>
                    <span className="h-[1px] flex-1 bg-white/8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-light font-sans tracking-tight text-white leading-[1.1]">
                    {section.title}
                  </h3>
                </div>

                {/* Right: body text */}
                <div className="lg:col-span-8">
                  <p className="text-base sm:text-lg md:text-xl font-sans font-light text-zinc-300 leading-relaxed mb-6">
                    {section.intro}
                  </p>
                  <p className="text-sm sm:text-base font-sans font-light text-zinc-500 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── GALLERY (2-col) ──────────────── */}
      <section className="relative z-10 w-full px-4 md:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project!.galleryImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-sm border border-white/10"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={src}
              alt={`${project!.title} gallery ${i + 1}`}
              className="w-full h-full object-cover brightness-[0.65] hover:brightness-[0.78] hover:scale-[1.04] transition-all duration-[1000ms] ease-out"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </section>

      {/* ──────────────── MORE PROJECTS ──────────────── */}
      {otherProjects.length > 0 && (
        <section className="relative z-10 bg-studio-black w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            {/* Heading row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-between mb-10 border-b border-white/10 pb-5"
            >
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-white/20" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                  More Projects
                </span>
              </div>
              <Link
                href="/works"
                className="group inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-zinc-600 hover:text-white transition-colors duration-300"
              >
                View All <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Other project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherProjects.map((other, i) => (
                <motion.div
                  key={other.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative cursor-pointer"
                  onClick={() => router.push(`/works/${other.slug}`)}
                >
                  <div className="relative w-full overflow-hidden rounded-sm border border-white/10 bg-studio-dark">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={other.image}
                        alt={other.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-[1.04] transition-all duration-[900ms] brightness-[0.6]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Bottom-left overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
                        <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-1.5">{other.subtitle}</p>
                        <h3 className="text-2xl sm:text-3xl font-light font-sans tracking-tight text-white uppercase">
                          {other.title}
                        </h3>
                      </div>
                    </div>

                    <div className="w-full bg-studio-dark border-t border-white/10 py-4 px-5 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                        {other.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-300 tracking-widest uppercase transition-colors duration-300">
                        View Case <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <ContactFooterSection onScrollToTop={() => scrollToSection("project-hero")} />
    </div>
  );
}
