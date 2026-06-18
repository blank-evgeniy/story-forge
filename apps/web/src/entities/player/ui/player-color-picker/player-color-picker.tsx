import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { cn } from "@/shared/lib/utils";

import { playerColorSwatchClasses } from "../../model/consts";
import { PLAYER_COLORS, type PlayerColor } from "../../model/types";

type PlayerColorPickerProps = {
  value: PlayerColor;
  onChange: (color: PlayerColor) => void;
} & WithModuleNamespace;

export function PlayerColorPicker({
  value,
  onChange,
  namespace,
}: PlayerColorPickerProps) {
  const testId = getTestIdGenerator(namespace)("player-color-picker");
  return (
    <div className="flex flex-wrap gap-2" {...testIdAttr(testId())}>
      {PLAYER_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            "h-7 w-7 cursor-pointer rounded-full transition-all",
            playerColorSwatchClasses[color],
            value === color
              ? "ring-foreground ring-offset-background scale-110 ring-2 ring-offset-2"
              : "opacity-60 hover:opacity-90",
          )}
          aria-label={color}
          {...testIdAttr(testId("button", color))}
        />
      ))}
    </div>
  );
}
