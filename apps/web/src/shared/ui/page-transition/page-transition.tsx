import { motion, type Variants } from "motion/react";

type PageTransitionEffect = "scale" | "fade" | "blur";

const variantsMap: Record<PageTransitionEffect, Variants> = {
  scale: {
    initial: { scale: 1.04, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.96, opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
};

type PageTransitionProps = {
  children: React.ReactNode;
  effect?: PageTransitionEffect;
  className?: string;
};

export function PageTransition({
  children,
  effect = "scale",
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      className={className || "flex min-h-0 flex-1 flex-col"}
      variants={variantsMap[effect]}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
