import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Player } from "../../model/types";

type WritingScreenPlayersProps = {
  players: Player[];
  submitted: Set<string>;
};

export function WritingScreenPlayers({
  players,
  submitted,
}: WritingScreenPlayersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {players.map((player) => {
        const hasSubmitted = submitted.has(player.id);
        const initials = player.username.slice(0, 2).toUpperCase();

        return (
          <div key={player.id} className="flex flex-col items-center gap-1">
            <Avatar size="lg">
              <AvatarFallback
                className={cn(
                  "font-medium transition-colors duration-300",
                  hasSubmitted
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground grayscale",
                )}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground max-w-12 truncate">
              {player.username}
            </span>
          </div>
        );
      })}
    </div>
  );
}
