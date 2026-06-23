import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { cn } from "@/shared/lib/utils";

import {
  playerAvatarColorClasses,
  playerIconComponents,
} from "../../model/consts";
import {
  PLAYER_ICONS,
  type PlayerColor,
  type PlayerIcon,
} from "../../model/types";

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
              "flex cursor-pointer items-center justify-center rounded-xl p-2 transition-colors outline-none",
              "focus-visible:ring-brand-200/40 focus-visible:ring-4",
              selected
                ? playerAvatarColorClasses[color]
                : "text-surface hover:bg-surface-2/10",
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
