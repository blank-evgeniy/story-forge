import { type HTMLMotionProps, motion } from "motion/react";

import {
  type SlideDirection,
  slideVariants,
  transitionBase,
} from "@/shared/lib/motion";

type RevealProps<T extends keyof HTMLElementTagNameMap = "div"> =
  HTMLMotionProps<T> & {
    as?: T;
    direction?: SlideDirection;
    delay?: number;
  };

export function Reveal<T extends keyof HTMLElementTagNameMap = "div">({
  as,
  direction = "bottom",
  delay,
  transition,
  ...props
}: RevealProps<T>) {
  const Component = motion[(as ?? "div") as "div"];
  const variants = slideVariants[direction];

  return (
    <Component
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ ...transitionBase, delay, ...transition }}
      {...(props as HTMLMotionProps<"div">)}
    />
  );
}
