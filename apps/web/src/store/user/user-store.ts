import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
  type PlayerColor,
  type PlayerIcon,
} from "@/lib/player-customization";

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
    }),
    {
      name: "user-storage",
    },
  ),
);
