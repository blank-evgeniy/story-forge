export const PLAYER_COLORS = [
  "amber",
  "blue",
  "green",
  "red",
  "lime",
  "sky",
  "indigo",
  "violet",
  "purple",
  "pink",
] as const;

export type PlayerColor = (typeof PLAYER_COLORS)[number];

export const playerColorClasses: Record<PlayerColor, string> = {
  amber: "border-amber-500/50 bg-amber-500/10",
  blue: "border-blue-500/50 bg-blue-500/10",
  green: "border-green-500/50 bg-green-500/10",
  red: "border-red-500/50 bg-red-500/10",
  lime: "border-lime-500/50 bg-lime-500/10",
  sky: "border-sky-500/50 bg-sky-500/10",
  indigo: "border-indigo-500/50 bg-indigo-500/10",
  violet: "border-violet-500/50 bg-violet-500/10",
  purple: "border-purple-500/50 bg-purple-500/10",
  pink: "border-pink-500/50 bg-pink-500/10",
};

export const DEFAULT_PLAYER_COLOR: PlayerColor = "amber";

export const playerAvatarColorClasses: Record<PlayerColor, string> = {
  amber: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
  blue: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  green: "bg-green-500/20 text-green-600 dark:text-green-400",
  red: "bg-red-500/20 text-red-600 dark:text-red-400",
  lime: "bg-lime-500/20 text-lime-600 dark:text-lime-400",
  sky: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
  indigo: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
  violet: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
  purple: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
  pink: "bg-pink-500/20 text-pink-600 dark:text-pink-400",
};

export const playerColorSwatchClasses: Record<PlayerColor, string> = {
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
