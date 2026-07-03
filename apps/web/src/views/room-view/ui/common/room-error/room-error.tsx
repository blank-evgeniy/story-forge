import type { ReactNode } from "react";

import { CircleAlertIcon } from "lucide-react";
import { motion } from "motion/react";

type RoomErrorProps = {
  title: string;
  action?: ReactNode;
};

export function RoomError({ title, action }: RoomErrorProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <span className="text-lg">{title}</span>
      <CircleAlertIcon className="text-danger size-8" />
      {action}
    </motion.div>
  );
}
