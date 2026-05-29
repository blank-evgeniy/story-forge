import { type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";

import type { PlayerColor, PlayerIcon } from "@/lib/player-customization";

import { PlayerAvatar } from "@/components/player-customization";
import { avatarVariants } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type PlayerCardContextValue = {
  color: PlayerColor;
  icon: PlayerIcon;
  username: string;
  disconnected?: boolean;
};

const PlayerCardContext = createContext<PlayerCardContextValue | null>(null);

function usePlayerCard() {
  const context = useContext(PlayerCardContext);
  if (!context) {
    throw new Error("PlayerCard.*  must be used within <PlayerCard>");
  }
  return context;
}

type PlayerCardProps = {
  color: PlayerColor;
  icon: PlayerIcon;
  username: string;
  disconnected?: boolean;
  direction?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
};

export function PlayerCard({
  color,
  icon,
  username,
  disconnected,
  direction = "vertical",
  children,
  className,
}: PlayerCardProps) {
  return (
    <PlayerCardContext.Provider
      value={{ color, icon, username, disconnected: !!disconnected }}
    >
      <div
        className={cn(
          "min-w-0 flex gap-2",
          direction === "vertical"
            ? "flex-col items-center"
            : "flex-row items-center",
          className,
        )}
      >
        {children}
      </div>
    </PlayerCardContext.Provider>
  );
}

type PlayerCardAvatarProps = VariantProps<typeof avatarVariants> & {
  pending?: boolean;
  className?: string;
};

export function PlayerCardAvatar({
  size = "lg",
  pending,
  className,
}: PlayerCardAvatarProps) {
  const { color, icon } = usePlayerCard();

  return (
    <PlayerAvatar
      color={color}
      icon={icon}
      size={size}
      className={className}
      fallbackClassName={pending ? "bg-muted text-muted-foreground" : undefined}
    />
  );
}

const titleSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
} as const;

type PlayerCardTitleProps = {
  size?: keyof typeof titleSizeStyles;
  className?: string;
};

export function PlayerCardTitle({
  size = "md",
  className,
}: PlayerCardTitleProps) {
  const { username, disconnected } = usePlayerCard();

  return (
    <span
      title={username}
      className={cn(
        "text-muted-foreground truncate block max-w-full",
        titleSizeStyles[size],
        disconnected && "line-through",
        className,
      )}
    >
      {username}
    </span>
  );
}
