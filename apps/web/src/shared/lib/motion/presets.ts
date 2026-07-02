import type { Transition, Variants } from "motion/react";

/** easeOutQuint curve (easings.net) shared across room transitions. */
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const transitionBase = {
  duration: 0.45,
  ease: EASE_OUT_QUINT,
} satisfies Transition;

export type SlideDirection = "left" | "right" | "top" | "bottom";

export const slideVariants = {
  left: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },
  right: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  },
  top: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  bottom: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
} satisfies Record<SlideDirection, Variants>;
