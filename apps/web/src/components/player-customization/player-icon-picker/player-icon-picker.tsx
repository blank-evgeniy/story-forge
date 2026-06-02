import {
  PLAYER_ICONS,
  playerAvatarColorClasses,
  type PlayerColor,
  type PlayerIcon,
  playerIconComponents,
} from "@/lib/player-customization";
import { cn } from "@/lib/utils";

type PlayerIconPickerProps = {
  value: PlayerIcon;
  color: PlayerColor;
  onChange: (icon: PlayerIcon) => void;
};

export function PlayerIconPicker({
  value,
  color,
  onChange,
}: PlayerIconPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {PLAYER_ICONS.map((id) => {
        const Icon = playerIconComponents[id];
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors",
              selected
                ? cn("ring-1 ring-current/30", playerAvatarColorClasses[color])
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-label={id}
          >
            <Icon className="size-6" />
          </button>
        );
      })}
    </div>
  );
}
