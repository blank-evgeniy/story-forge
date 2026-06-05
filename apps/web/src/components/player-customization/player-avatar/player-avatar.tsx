import { type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, avatarVariants } from "@/components/ui/avatar";
import {
  playerAvatarColorClasses,
  type PlayerColor,
  type PlayerIcon,
  playerIconComponents,
} from "@/lib/player-customization";
import {
  getTestIdGenerator,
  testIdAttr,
  type WithModuleNamespace,
} from "@/lib/tests/test-id";
import { cn } from "@/lib/utils";

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
