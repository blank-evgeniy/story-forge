export const PLAYER_ICONS = [
  "angel",
  "crying",
  "evil",
  "laughing",
  "medical-mask",
  "smile-dizzy",
  "star-face",
  "tongue-wink-right",
  "vomiting",
  "monocle",
] as const;

export type PlayerIcon = (typeof PLAYER_ICONS)[number];

export const PLAYER_COLORS = [
  "amber",
  "orange",
  "yellow",
  "blue",
  "green",
  "emerald",
  "teal",
  "cyan",
  "red",
  "lime",
  "sky",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "zinc",
] as const;

export type PlayerColor = (typeof PLAYER_COLORS)[number];
