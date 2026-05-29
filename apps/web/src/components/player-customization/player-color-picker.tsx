import {
  PLAYER_COLORS,
  type PlayerColor,
  playerColorSwatchClasses,
} from "@/lib/player-customization";
import { cn } from "@/lib/utils";

type PlayerColorPickerProps = {
  value: PlayerColor;
  onChange: (color: PlayerColor) => void;
};

export function PlayerColorPicker({ value, onChange }: PlayerColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLAYER_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            "h-7 w-7 rounded-full transition-all cursor-pointer",
            playerColorSwatchClasses[color],
            value === color
              ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
              : "opacity-60 hover:opacity-90",
          )}
          aria-label={color}
        />
      ))}
    </div>
  );
}
