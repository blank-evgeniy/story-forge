import { type VariantProps } from "class-variance-authority";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, avatarVariants } from "@/shared/ui/avatar";

import type { PlayerColor, PlayerIcon } from "../../model/types";

import {
  playerAvatarColorClasses,
  playerIconComponents,
} from "../../model/consts";

type PlayerAvatarProps = VariantProps<typeof avatarVariants> & {
  color: PlayerColor;
  icon: PlayerIcon;
  className?: string;
  fallbackClassName?: string;
} & WithModuleNamespace;

export function PlayerAvatar({
  color,
  icon,
  size,
  className,
  fallbackClassName,
  namespace,
}: PlayerAvatarProps) {
  const testId = getTestIdGenerator(namespace)("player-avatar");

  const Icon = playerIconComponents[icon];

  return (
    <Avatar size={size} className={cn(className)} {...testIdAttr(testId())}>
      <AvatarFallback
        className={cn(playerAvatarColorClasses[color], fallbackClassName)}
      >
        <Icon />
      </AvatarFallback>
    </Avatar>
  );
}
