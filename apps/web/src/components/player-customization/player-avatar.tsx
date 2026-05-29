import { type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, avatarVariants } from "@/components/ui/avatar";
import {
  playerAvatarColorClasses,
  type PlayerColor,
  type PlayerIcon,
  playerIconComponents,
} from "@/lib/player-customization";
import { cn } from "@/lib/utils";

type PlayerAvatarProps = VariantProps<typeof avatarVariants> & {
  color: PlayerColor;
  icon: PlayerIcon;
  className?: string;
};

export function PlayerAvatar({
  color,
  icon,
  size,
  className,
}: PlayerAvatarProps) {
  const Icon = playerIconComponents[icon];

  return (
    <Avatar size={size} className={cn(className)}>
      <AvatarFallback className={playerAvatarColorClasses[color]}>
        <Icon />
      </AvatarFallback>
    </Avatar>
  );
}
