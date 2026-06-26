import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ThemeName } from "./types";

import { DEFAULT_THEME } from "./consts";

type ThemeStore = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
