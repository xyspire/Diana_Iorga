"use client";

import React from "react";

export function ProjectLogo({
  type,
  className = "w-8 h-8",
}: {
  type: "triangle" | "circle" | "square";
  className?: string;
}) {
  if (type === "triangle") {
    return (
      <svg
        className={`${className} text-white stroke-[1.5]`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 22H22L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "circle") {
    return (
      <svg
        className={`${className} text-white stroke-[1.5]`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12C10.5 12 12.5 10 12.5 7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 12C13.5 12 11.5 14 11.5 16.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  // square
  return (
    <svg
      className={`${className} text-white stroke-[1.5]`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
