import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type MessageRowProps = {
  side: "left" | "right";
  children: React.ReactNode;
  className?: string;
};

export const MessageRow = ({ side, children, className }: MessageRowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "flex gap-1 w-full sm:max-w-[85%] max-w-[95%] items-end",
        side === "left" ? "self-start" : "self-end flex-row-reverse",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
