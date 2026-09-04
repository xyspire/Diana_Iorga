'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TextAnimateProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  children: string;
  animation?: 'slideUp' | 'fadeIn' | 'blurIn';
  by?: 'word' | 'character' | 'line';
  className?: string;
  delay?: number;
  duration?: number;
}

export function TextAnimate({
  children,
  animation = 'slideUp',
  by = 'word',
  className,
  delay = 0,
  duration = 1.5,
  ...props
}: TextAnimateProps) {
  // Split children based on word or character
  const segments = React.useMemo(() => {
    if (by === 'word') {
      return children.split(/(\s+)/); // Preserve spaces
    }
    if (by === 'character') {
      return children.split('');
    }
    return [children];
  }, [children, by]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: by === 'character' ? 0.02 : 0.04,
        delayChildren: delay,
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: animation === 'slideUp' ? '130%' : 0,
      opacity: animation === 'fadeIn' || animation === 'blurIn' ? 0 : 1,
      filter: animation === 'blurIn' ? 'blur(8px)' : 'none',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'none',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Beautiful ultra-smooth cubic bezier ease
      }
    }
  };

  return (
    <motion.span
      className={cn('inline-block py-1', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
      id={props.id}
    >
      {segments.map((segment, index) => {
        // If it is pure whitespace, render it directly with no animation wrapper to preserve proper alignment
        if (by === 'word' && /^\s+$/.test(segment)) {
          return <span key={index}>{segment}</span>;
        }

        return (
          <span key={index} className="inline-block overflow-hidden align-bottom pb-[0.35em] -mb-[0.35em] pt-[0.1em] -mt-[0.1em]">
            <motion.span
              className="inline-block whitespace-pre"
              variants={itemVariants}
            >
              {segment}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
