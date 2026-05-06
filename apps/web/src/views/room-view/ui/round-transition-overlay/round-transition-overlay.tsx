import { motion } from "motion/react";
import { useRoomStore } from "../../model/use-room-store";

export function RoundTransitionOverlay() {
  const round = useRoomStore((s) => s.round);
  const totalRounds = useRoomStore((s) => s.totalRounds);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
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
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
          Раунд
        </span>
        <span className="text-[9rem] font-bold leading-none tabular-nums tracking-tight">
          {round}
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-px w-6 bg-muted-foreground/40" />
          <span className="text-sm font-medium tracking-widest uppercase">
            из {totalRounds}
          </span>
          <span className="h-px w-6 bg-muted-foreground/40" />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
        <motion.div
          className="h-full bg-primary"
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
