import { PLAYER_COLORS, type PlayerColor } from "@/lib/player-customization";
import { cn } from "@/lib/utils";

const colorSwatchClasses: Record<PlayerColor, string> = {
  amber: "bg-amber-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  red: "bg-red-400",
  lime: "bg-lime-400",
  sky: "bg-sky-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  pink: "bg-pink-400",
};

type PlayerColorPickerProps = {
  value: PlayerColor;
  onChange: (color: PlayerColor) => void;
};

export function PlayerColorPicker({ value, onChange }: PlayerColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLAYER_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            "h-7 w-7 rounded-full transition-all cursor-pointer",
            colorSwatchClasses[c],
            value === c
              ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
              : "opacity-60 hover:opacity-90",
          )}
          aria-label={c}
        />
      ))}
    </div>
  );
}
