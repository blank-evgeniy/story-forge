import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

type PlayerCardContextValue = {
  playerName: string;
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
  playerName: string;
  disconnected?: boolean;
  direction?: "vertical" | "horizontal";
  children: React.ReactNode;
  className?: string;
};

export function PlayerCard({
  playerName,
  disconnected,
  direction = "vertical",
  children,
  className,
}: PlayerCardProps) {
  return (
    <PlayerCardContext.Provider
      value={{ playerName, disconnected: !!disconnected }}
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

type PlayerCardAvatarProps = {
  variant?: "default" | "accent";
  className?: string;
};

export function PlayerCardAvatar({
  variant = "default",
  className,
}: PlayerCardAvatarProps) {
  const { playerName } = usePlayerCard();

  return (
    <Avatar size="lg" aria-label={playerName} className={className}>
      <AvatarFallback
        className={cn(
          "font-medium transition-colors duration-300",
          variant === "accent" && "bg-primary text-primary-foreground",
        )}
        aria-hidden
      >
        {playerName.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
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
  const { playerName, disconnected } = usePlayerCard();

  return (
    <span
      title={playerName}
      className={cn(
        "text-muted-foreground truncate block max-w-full",
        titleSizeStyles[size],
        disconnected && "line-through",
        className,
      )}
    >
      {playerName}
    </span>
  );
}
