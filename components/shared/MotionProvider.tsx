"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Loads Motion features lazily and honours the OS reduced-motion preference
 * for every animation in the tree.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
