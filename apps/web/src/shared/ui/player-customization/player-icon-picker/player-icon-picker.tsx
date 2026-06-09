import {
  PLAYER_ICONS,
  playerAvatarColorClasses,
  type PlayerColor,
  type PlayerIcon,
  playerIconComponents,
} from "@/shared/consts/player-customization";
import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { cn } from "@/shared/lib/utils";

type PlayerIconPickerProps = {
  value: PlayerIcon;
  color: PlayerColor;
  onChange: (icon: PlayerIcon) => void;
} & WithModuleNamespace;

export function PlayerIconPicker({
  value,
  color,
  onChange,
  namespace,
}: PlayerIconPickerProps) {
  const testId = getTestIdGenerator(namespace)("player-icon-picker");

  return (
    <div className="grid grid-cols-5 gap-1.5" {...testIdAttr(testId())}>
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
            {...testIdAttr(testId("button", id))}
          >
            <Icon className="size-6" />
          </button>
        );
      })}
    </div>
  );
}
