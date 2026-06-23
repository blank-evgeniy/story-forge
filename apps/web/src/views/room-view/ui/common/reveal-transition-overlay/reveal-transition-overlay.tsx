import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { REVEAL_TRANSITION_DURATION_MS } from "../../../model/consts";
import { useRoomStore } from "../../../model/store/use-room-store";

export function RevealTransitionOverlay() {
  const { t } = useTranslation();
  const startReveal = useRoomStore((s) => s.startReveal);
  const phrases = t("reveal.transition.phrases", {
    returnObjects: true,
  }) as string[];
  const [phrase] = useState(
    () => phrases[Math.floor(Math.random() * phrases.length)],
  );

  useEffect(() => {
    const timer = setTimeout(startReveal, REVEAL_TRANSITION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [startReveal]);

  return (
    <motion.div
      className="bg-ink/70 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-surface text-h1 font-medium"
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
