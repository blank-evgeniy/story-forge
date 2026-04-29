import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  username: string;
};

type UserStore = {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      login: (username) => {
        const id = crypto.randomUUID();

        set({
          user: { id, username },
        });
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
