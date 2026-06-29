"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── LiquidButton ────────────────────────────────────────────────────────────
const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 transition text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 text-xs gap-1.5 px-4",
        lg:      "h-10 rounded-md px-6",
        xl:      "h-12 rounded-md px-8",
        xxl:     "h-14 rounded-md px-10",
        // Square badge — perfect for single/double digit numbers
        badge:   "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-sm sm:text-base md:text-lg p-0",
        icon:    "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "xxl",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative",
        liquidbuttonVariants({ variant, size, className })
      )}
      {...props}
    >
      {/* Glass morphism shell */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full transition-all border border-white/20
          shadow-[0_0_8px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.1),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.15),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.3),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.1),inset_0_0_2px_2px_rgba(255,255,255,0.05)]"
      />

      {/* Backdrop distortion layer — uses SVG filter defined once via GlassFilter */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#lg-glass-filter")' }}
      />

      {/* Content */}
      <div className="pointer-events-none z-10 font-mono font-medium text-white select-none">
        {children}
      </div>
    </Comp>
  )
}

/**
 * Render this ONCE per page that uses LiquidButton.
 * The SVG filter id "lg-glass-filter" is referenced by all LiquidButton instances.
 */
function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="lg-glass-filter"
          x="0%" y="0%"
          width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export { LiquidButton, GlassFilter, liquidbuttonVariants }
