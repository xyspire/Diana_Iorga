"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import NavigationOverlay from "@/components/NavigationOverlay";
import HeroSection from "@/components/HeroSection";
import BrandVisionSection from "@/components/BrandVisionSection";
import StudioStatsSection from "@/components/StudioStatsSection";
import SelectedWorks from "@/components/SelectedWorks";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactFooterSection from "@/components/ContactFooterSection";

import AboutSection from "@/components/AboutSection";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="relative min-h-screen text-white select-none">
      {/* HEADER */}
      <Header onMenuTrigger={() => setIsMenuOpen(true)} />

      {/* FULLSCREEN NAV OVERLAY */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* HERO */}
      <HeroSection />

      {/* SCROLLING CONTENT */}
      <div className="relative z-10 ">
        <BrandVisionSection />

        <AboutSection />

        {/*Left EXPERIENCE INTRO SECTION */}
        {/* <ExperienceIntroSection /> */}
        {/* Right Experience Intro Section */}
        {/* <RightExperienceIntroSection /> */}

        {/* STUDIO STATS SECTION */}
        <StudioStatsSection />


        {/* SELECTED WORKS */}
        <SelectedWorks />

        {/* SERVICES */}
        <ServicesSection />

        {/* TESTIMONIALS */}
        <TestimonialsSection />

        {/* FAQ */}
        <FaqSection />

        {/* CONTACT / FOOTER */}
        <ContactFooterSection
          onScrollToTop={() => scrollToSection("page-top")}
        />
      </div>
    </div>
  );
}
