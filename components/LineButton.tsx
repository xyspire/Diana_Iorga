"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  noAnimation?: boolean;
}

export default function LineButton({
  children,
  href,
  className,
  noAnimation = false,
  ...props
}: LineButtonProps) {
  const isLink = !!href;

  const buttonContent = (
    <motion.div
      className="relative flex flex-col items-center justify-center py-2.5 px-6 group cursor-pointer"
      initial="initial"
      whileHover="hover"
      animate="animate"
    >
      {/* Top Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-studio-gray-250 origin-left"
        variants={{
          initial: { scaleX: 0.7, opacity: 0.4, x: "15%" },
          hover: {
            scaleX: 1,
            opacity: 1,
            x: 0,
            backgroundColor: "var(--color-studio-white)",
          },
        }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        id="btn-top-line"
      />

      {/* Main Text Content with custom split overflow effect */}
      <div className="relative overflow-hidden h-6  flex flex-col justify-start ">
        <motion.span
          className=" tracking-wide text-white block select-none lowercase font-sans  font-normal"
          variants={{
            initial: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          {children}
        </motion.span>
        <motion.span
          className="text-sm tracking-wide text-studio-gray-250 absolute top-full left-0 block select-none lowercase font-sans font-normal"
          variants={{
            initial: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          {children}
        </motion.span>
      </div>

      {/* Bottom Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-studio-gray-250 origin-left"
        variants={{
          initial: { scaleX: 0.7, opacity: 0.4, x: "15%" },
          hover: {
            scaleX: 1,
            opacity: 1,
            x: 0,
            backgroundColor: "var(--color-studio-white)",
          },
        }}
        transition={{
          duration: 0.4,
          ease: [0.215, 0.61, 0.355, 1],
          delay: 0.05,
        }}
        id="btn-bottom-line"
      />
    </motion.div>
  );

  if (isLink) {
    return (
      <a
        href={href}
        className={cn("inline-block text-center", className)}
        role="button"
        id={props.id}
      >
        <button
          type="button"
          className="bg-transparent border-none p-0 cursor-pointer w-full"
          {...props}
        >
          {buttonContent}
        </button>
      </a>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={cn(
        "bg-transparent border-none p-0 cursor-pointer inline-block",
        className,
      )}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
