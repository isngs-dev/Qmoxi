"use client";

import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const VARIANTS: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof VARIANTS;
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "section" | "article" | "span" | "figure";
  amount?: number;
};

/** Scroll-triggered entrance. Animates once, transform + opacity only. */
export function Reveal({ children, className, variant = "up", delay = 0, duration = 0.8, as = "div", amount = 0.25 }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl";
  amount?: number;
}) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof VARIANTS;
  as?: "div" | "li" | "article" | "span" | "dd" | "dt";
}) {
  const Component = m[as];
  return (
    <Component className={cn(className)} variants={VARIANTS[variant]} transition={{ duration: 0.75, ease: EASE }}>
      {children}
    </Component>
  );
}
