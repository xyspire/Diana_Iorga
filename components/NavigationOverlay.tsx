"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Instagram, Linkedin } from "lucide-react";
import FlowingMenu from "./FlowingMenu";
import LineButton from "./LineButton";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function NavigationOverlay({
  isOpen,
  onClose,
  onNavigate,
}: NavigationOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-studio-black z-[100] flex flex-col justify-between py-6 md:py-12"
          initial={{ opacity: 0, y: "-20%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-20%" }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          id="fullscreen-menu-overlay"
        >
          {/* Overlay Top bar */}
          <div className="flex items-center justify-end pb-4 border-b border-white/5 px-6 md:px-12">
            {/* <span className="text-xs font-mono tracking-widest text-studio-gray-300 uppercase">DIRECTORY NAVIGATION</span> */}
            <LineButton onClick={onClose} id="header-menu-trigger">
              <X className="w-7 h-7 text-white " />
            </LineButton>
          </div>

          {/* Menu Links with Flowing Marquee Experience */}
          <div
            className="flex-1 my-4 flex flex-col justify-center min-h-[50vh]"
            id="overlay-navigation"
          >
            <FlowingMenu
              items={[
                {
                  num: "01",
                  text: "HOME",
                  link: "/",
                  image: "https://picsum.photos/600/400?random=11",
                },
                {
                  num: "02",
                  text: "Works",
                  link: "/works",
                  image: "https://picsum.photos/600/400?random=12",
                },
                {
                  num: "03",
                  text: "FAQ QUESTIONS",
                  link: "/#faq-section",
                  image: "https://picsum.photos/600/400?random=18",
                },
                {
                  num: "04",
                  text: "START PROJECT",
                  link: "/#contact-studio",
                  image: "https://picsum.photos/600/400?random=15",
                },
              ]}
              speed={12}
              textColor="var(--color-studio-white)"
              bgColor="var(--color-studio-black)"
              marqueeBgColor="var(--color-studio-white)"
              marqueeTextColor="var(--color-studio-black)"
              borderColor="rgba(255, 255, 255, 0.08)"
              onItemClick={onNavigate}
            />
          </div>

          {/* Overlay Footer containing Branding Logo */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10 text-xs md:text-sm font-light text-studio-gray-300 px-6 md:px-12">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl md:text-2xl font-normal tracking-tight text-white select-none">
                Diana Iorga
                <span className="text-xs align-super ml-0.5 font-light text-zinc-500">
                  ®
                </span>
              </span>
            </div>

            {/* Social row matching visual asset */}
            <div className="flex items-center gap-10">
              <a
                href="mailto:diananiculina11@gmail.com"
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1.5 py-1"
                title="Email"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="https://www.instagram.com/didinico11/"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1.5 py-1"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/diana-niculina-iorga/"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1.5 py-1"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-zinc-400" />
              </a>
            </div>

            <div className="text-[10px] md:text-xs font-mono text-stone-600 uppercase tracking-wider hidden md:block">
              All rights reserved © 2026
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
