import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PlayerColor, PlayerIcon } from "./types";

import { DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_ICON } from "./consts";

export type Player = {
  id: string;
  username: string;
  color: PlayerColor;
  icon: PlayerIcon;
};

type PlayerStore = {
  player: Player | null;
  login: (username: string, color?: PlayerColor, icon?: PlayerIcon) => void;
  logout: () => void;
  updateProfile: (
    username: string,
    color: PlayerColor,
    icon: PlayerIcon,
  ) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      player: null,

      login: (
        username,
        color = DEFAULT_PLAYER_COLOR,
        icon = DEFAULT_PLAYER_ICON,
      ) => {
        const id = crypto.randomUUID();
        set({ player: { id, username, color, icon } });
      },

      logout: () => {
        set({ player: null });
      },

      updateProfile: (username, color, icon) => {
        set((state) => {
          if (!state.player) return state;
          return { player: { ...state.player, username, color, icon } };
        });
      },
    }),
    {
      name: "user-storage",
      version: 2,
      migrate: (persistedState, version) => {
        const state = persistedState as {
          user?: Partial<Player> | null;
          player?: Partial<Player> | null;
        };
        if (version === 0 && state.user) {
          state.user.color ??= DEFAULT_PLAYER_COLOR;
          state.user.icon ??= DEFAULT_PLAYER_ICON;
        }
        // v1 → v2: rename persisted key user → player
        if (version < 2 && state.user) {
          state.player = state.user;
          delete state.user;
        }
        return state;
      },
    },
  ),
);
