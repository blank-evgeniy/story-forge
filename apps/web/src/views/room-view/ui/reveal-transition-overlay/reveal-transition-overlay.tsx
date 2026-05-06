import { useState } from "react";
import { motion } from "motion/react";

const PHRASES = [
  "Листаем страницы...",
  "Истории ждут...",
  "Занавес поднимается...",
  "Слова сложились...",
  "Финальная глава...",
  "Время читать...",
  "Перо отложено...",
  "Чернила высохли...",
];

export function RevealTransitionOverlay() {
  const [phrase] = useState(
    () => PHRASES[Math.floor(Math.random() * PHRASES.length)],
  );

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
