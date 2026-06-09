import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
  type PlayerColor,
  type PlayerIcon,
} from "@/shared/consts/player-customization";

type User = {
  id: string;
  username: string;
  color: PlayerColor;
  icon: PlayerIcon;
};

type UserStore = {
  user: User | null;
  login: (username: string, color?: PlayerColor, icon?: PlayerIcon) => void;
  logout: () => void;
  updateProfile: (
    username: string,
    color: PlayerColor,
    icon: PlayerIcon,
  ) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      login: (
        username,
        color = DEFAULT_PLAYER_COLOR,
        icon = DEFAULT_PLAYER_ICON,
      ) => {
        const id = crypto.randomUUID();
        set({ user: { id, username, color, icon } });
      },

      logout: () => {
        set({ user: null });
      },

      updateProfile: (username, color, icon) => {
        set((state) => {
          if (!state.user) return state;
          return { user: { ...state.user, username, color, icon } };
        });
      },
    }),
    {
      name: "user-storage",
      version: 1,
      migrate: (persistedState, version) => {
        const state = persistedState as { user?: Partial<User> | null };
        if (version === 0 && state.user) {
          state.user.color ??= DEFAULT_PLAYER_COLOR;
          state.user.icon ??= DEFAULT_PLAYER_ICON;
        }
        return state;
      },
    },
  ),
);
