import { motion } from "motion/react";

import { useTwBreakpoints } from "@/shared/hooks/use-tw-breakpoints";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

const slideVariants = {
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
  bottom: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
};

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function LobbyScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
      {children}
    </div>
  );
}

function PlayersSidebar({
  children,
  headerSlot,
}: {
  children: React.ReactNode;
  headerSlot: React.ReactNode;
}) {
  const breakpoints = useTwBreakpoints();
  const isMobile = breakpoints.smaller("sm");
  const variants = slideVariants.left;

  if (isMobile) {
    return (
      <motion.div
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-0 w-full md:w-1/3"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={transition}
    >
      <Card className="h-full min-h-0">
        <CardHeader className="hidden md:flex">{headerSlot}</CardHeader>
        <CardContent className="min-h-0">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

function MainSection({ children }: { children: React.ReactNode }) {
  const breakpoints = useTwBreakpoints();
  const isMobile = breakpoints.smaller("sm");
  const variants = isMobile ? slideVariants.bottom : slideVariants.right;

  return (
    <motion.div
      className="flex min-h-0 w-full flex-1 flex-col"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ ...transition, delay: 0.05 }}
    >
      <Card className="flex h-full min-h-0 flex-col">{children}</Card>
    </motion.div>
  );
}

function MainSectionBody({
  settingsSlot,
  joinSlot,
}: {
  settingsSlot: React.ReactNode;
  joinSlot: React.ReactNode;
}) {
  return (
    <ScrollArea className={"overflow-auto"}>
      <CardContent className="flex flex-1 flex-col gap-6">
        {settingsSlot}

        <Separator />

        {joinSlot}
      </CardContent>
    </ScrollArea>
  );
}

function MainSectionFooter({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="mt-auto flex justify-center border-t">
      {children}
    </CardFooter>
  );
}

export const LobbyScreenLayout = Object.assign(LobbyScreenLayoutRoot, {
  PlayersSidebar,
  MainSection,
  MainSectionBody,
  MainSectionFooter,
});
