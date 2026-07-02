import { AnimatePresence } from "motion/react";

import { Reveal } from "@/shared/ui/reveal";

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
    <Reveal direction="left" className="absolute inset-0 flex flex-col">
      {children}
    </Reveal>
  );
}

function StoryHistoryAnimated({ children }: { children: React.ReactNode }) {
  return (
    <Reveal direction="right" className="absolute inset-0 overflow-y-auto">
      {children}
    </Reveal>
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
    <div className="flex h-[38vh] min-h-0 shrink-0 flex-col">
      <AnimatePresence>
        {isVisible && (
          <Reveal
            direction="bottom"
            className="flex min-h-0 flex-1 flex-col gap-4"
          >
            {children}
          </Reveal>
        )}
      </AnimatePresence>
    </div>
  );
}

export const RevealScreenLayout = Object.assign(RevealScreenLayoutRoot, {
  StorySection,
  StoryRevealAnimated,
  StoryHistoryAnimated,
  Footer,
});
