export const THEMES = [
  "orange",
  "violet",
  "emerald",
  "azure",
  "rose",
] as const;

export type ThemeName = (typeof THEMES)[number];
