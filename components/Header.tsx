"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import LineButton from "./LineButton";

interface HeaderProps {
  onMenuTrigger: () => void;
}

export default function Header({ onMenuTrigger }: HeaderProps) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Avoid bounce effect on iOS or overscroll behavior
      if (currentScrollY < 0) return;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-4 md:px-12 md:py-2  pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -110 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="pointer-events-auto">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-sans text-lg md:text-4xl font-normal tracking-tight hover:opacity-85 transition-opacity"
          id="name"
        >
          Diana Iorga
          {/* <span className="text-[10px] md:text-xs align-super ml-0.5 font-light font-mono">
            ®
          </span> */}
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }} className="pointer-events-auto ">
        <LineButton onClick={onMenuTrigger} id="header-menu-trigger">
          <span className="text-white">menu</span>
        </LineButton>
      </motion.div>
    </motion.header>
  );
}
