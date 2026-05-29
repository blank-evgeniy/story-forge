import {
  DEFAULT_PLAYER_COLOR,
  type PlayerColor,
  playerColorClasses,
} from "@/lib/player-customization";
import { cn } from "@/lib/utils";

type PlayerMessageProps = {
  message: string;
  side?: "left" | "right";
  color?: PlayerColor;
  className?: string;
};

export function PlayerMessage({
  message,
  side = "left",
  color = DEFAULT_PLAYER_COLOR,
  className,
}: PlayerMessageProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-2.5 min-w-0",
        side === "right" ? "ml-auto rounded-br-sm" : "mr-auto rounded-bl-sm",
        playerColorClasses[color],
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-foreground/90 wrap-break-word">
        {message}
      </p>
    </div>
  );
}
