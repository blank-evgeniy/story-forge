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
