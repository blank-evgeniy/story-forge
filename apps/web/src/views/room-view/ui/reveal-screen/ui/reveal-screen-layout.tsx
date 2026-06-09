import { AnimatePresence, motion } from "motion/react";

function RevealScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-6">{children}</div>;
}

function StorySection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>
  );
}

function StoryRevealAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col gap-2"
    >
      {children}
    </motion.div>
  );
}

function StoryHistoryAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="absolute inset-0 overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}

function Footer({
  children,
  isVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="flex min-h-0 flex-col gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const RevealScreenLayout = Object.assign(RevealScreenLayoutRoot, {
  StorySection,
  StoryRevealAnimated,
  StoryHistoryAnimated,
  Footer,
});
