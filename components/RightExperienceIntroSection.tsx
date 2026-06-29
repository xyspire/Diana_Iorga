'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function RightExperienceIntroSection() {
  return (
    <section
      className="w-full py-7 relative overflow-visible z-10 bg-studio-dark"
      id="experience-intro"
    >
      {/* ── Full-width content row ── */}
      <div className="w-full px-6 relative z-10">
        <div className="flex-col items-center justify-between w-full">

          {/* Right — text, split into two lines */}
          <div className="flex flex-col items-end gap-1 max-w-full">
            <motion.p
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl font-sans font-light text-zinc-300 leading-[1.45] tracking-tight text-right"
            >
              Operating as a multi-disciplinary Graphic Designer, I create print-ready designs that combine
              <br />
              creative thinking with technical precision.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
