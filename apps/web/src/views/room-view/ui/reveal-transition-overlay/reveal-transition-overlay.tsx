import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { REVEAL_TRANSITION_DURATION_MS } from "../../model/consts";
import { useRoomStore } from "../../model/use-room-store";

const PHRASES = [
  "Истории ждут...",
  "Занавес поднимается...",
  "Время читать...",
];

export function RevealTransitionOverlay() {
  const startReveal = useRoomStore((s) => s.startReveal);
  const [phrase] = useState(
    () => PHRASES[Math.floor(Math.random() * PHRASES.length)],
  );

  useEffect(() => {
    const timer = setTimeout(startReveal, REVEAL_TRANSITION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [startReveal]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-2xl font-medium text-foreground"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {phrase}
      </motion.p>
    </motion.div>
  );
}
