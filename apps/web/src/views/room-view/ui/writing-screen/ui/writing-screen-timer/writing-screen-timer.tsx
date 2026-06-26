import { useTimer } from "@siberiacancode/reactuse";
import { TimerIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type WritingScreenTimerProps = {
  time: number;
};

export function WritingScreenTimer({ time }: WritingScreenTimerProps) {
  const timer = useTimer(time);

  const totalSeconds = timer.minutes * 60 + timer.seconds;
  const isUrgent = totalSeconds <= 10;
  const isWarning = totalSeconds <= 30;

  return (
    <Badge
      variant={"white"}
      className={cn(
        "bg-surface/20 flex items-center gap-2 tabular-nums transition-colors duration-500",
        isUrgent ? "text-danger" : isWarning ? "text-warning" : "text-ink",
      )}
    >
      <TimerIcon className="size-5 shrink-0" />
      <span className="text-body font-mono font-medium">
        {String(timer.minutes).padStart(2, "0")}:
        {String(timer.seconds).padStart(2, "0")}
      </span>
    </Badge>
  );
}
