import {
  DEFAULT_PLAYER_COLOR,
  type PlayerColor,
  playerColorClasses,
} from "@/shared/consts/player-customization";
import { cn } from "@/shared/lib/utils";

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
        "min-w-0 rounded-2xl border px-4 py-2.5",
        side === "right" ? "ml-auto rounded-br-sm" : "mr-auto rounded-bl-sm",
        playerColorClasses[color],
        className,
      )}
    >
      <p className="text-foreground/90 text-sm leading-relaxed wrap-break-word">
        {message}
      </p>
    </div>
  );
}
