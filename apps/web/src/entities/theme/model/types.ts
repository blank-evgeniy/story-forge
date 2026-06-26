export const THEMES = ["orange", "violet"] as const;

export type ThemeName = (typeof THEMES)[number];
