import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { ROUND_TRANSITION_DURATION_MS } from "../../../model/consts";
import { useRoomStore } from "../../../model/store/use-room-store";

export function RoundTransitionOverlay() {
  const { t } = useTranslation();
  const round = useRoomStore((s) => s.round);
  const totalRounds = useRoomStore((s) => s.totalRounds);

  return (
    <motion.div
      className="bg-brand-400/70 fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-surface text-small font-semibold tracking-(--tracking-display) uppercase">
          {t("room.common.roundTransition.round")}
        </span>
        <span className="text-[9rem] leading-none font-bold tracking-tight tabular-nums">
          {round}
        </span>
        <div className="text-surface flex items-center gap-2">
          <span className="bg-surface/40 h-px w-6" />
          <span className="text-small font-medium tracking-widest uppercase">
            {t("room.common.roundTransition.of", { totalRounds })}
          </span>
          <span className="bg-surface/40 h-px w-6" />
        </div>
      </motion.div>

      <div className="bg-ink-muted absolute right-0 bottom-0 left-0 h-1">
        <motion.div
          className="bg-brand-400 h-full"
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: ROUND_TRANSITION_DURATION_MS / 1000,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}
