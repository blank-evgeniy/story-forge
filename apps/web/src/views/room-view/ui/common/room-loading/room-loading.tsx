import { motion } from "motion/react";

import { Spinner } from "@/shared/ui/spinner";

type RoomLoadingProps = {
  title?: string;
};

export function RoomLoading({ title }: RoomLoadingProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      {title && <span className="text-lg">{title}</span>}
      <Spinner className="size-8" />
    </motion.div>
  );
}
