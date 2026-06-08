import { toast } from "sonner";
import { create } from "zustand";

import type { ServerEvent } from "@/shared/api/ws/types";

import { router } from "@/app/routes/routes";
import { useUserStore } from "@/store/user";

import type { Player, PrevEntry, Story, TwistsSet } from "./types";

import { mapStories } from "./map";

type RoomActions = {
  handleEvent: (event: ServerEvent) => void;
  startReveal: () => void;
  addSavedStory: (storyId: string) => void;
  reset: () => void;
};

type RoomData = {
  status:
    | "idle"
    | "lobby"
    | "round_starting"
    | "writing"
    | "revealing"
    | "reveal";
  players: Player[];
  isHost: boolean;
  round: number;
  totalRounds: number;
  submittedIds: Set<string>;
  prevEntry: PrevEntry[] | null;
  allStories: Story[];
  error: string | null;
  secondsPerTurn: number;
  twistsToChoose: TwistsSet | null;
  savedStories: string[];
  aiComment: string | null;
  aiCommentStatus: "idle" | "loading" | "success" | "error";
};

export type RoomState = RoomData & RoomActions;

const initialState: RoomData = {
  status: "idle",
  players: [],
  round: 0,
  totalRounds: 0,
  submittedIds: new Set<string>(),
  prevEntry: null,
  allStories: [],
  error: null,
  secondsPerTurn: 60,
  twistsToChoose: null,
  isHost: false,
  savedStories: [],
  aiComment: null,
  aiCommentStatus: "idle",
};

export const useRoomStore = create<RoomState>((set, get) => ({
  ...initialState,

  handleEvent(event: ServerEvent) {
    switch (event.type) {
      case "room_state": {
        const currentUser = useUserStore.getState().user;
        const userId = currentUser?.id;

        set({
          ...initialState,
          status: event.room.status,
          players: event.room.players,
          round: event.room.round,
          secondsPerTurn: event.room.config.secondsPerTurn,
          totalRounds: event.room.totalRounds,
          isHost: event.room.hostId === userId,
          allStories:
            event.room.status === "reveal"
              ? mapStories(event.room.players, event.room.stories)
              : [],
        });
        break;
      }

      case "player_joined":
        set({
          players: [
            ...get().players.filter((p) => p.id !== event.playerId),
            {
              color: event.color,
              connected: true,
              icon: event.icon,
              id: event.playerId,
              username: event.username,
            },
          ],
        });
        break;

      case "player_left":
        set({
          players: get().players.filter((p) => p.id !== event.playerId),
        });
        break;

      case "player_disconnected":
        set({
          players: get().players.map((p) =>
            p.id === event.playerId ? { ...p, connected: false } : p,
          ),
        });
        break;

      case "player_reconnected":
        set({
          players: get().players.map((p) =>
            p.id === event.playerId ? { ...p, connected: true } : p,
          ),
        });
        break;

      case "game_started":
        set({ status: "round_starting", totalRounds: event.totalRounds });
        break;

      case "your_turn":
        set({
          prevEntry:
            event.prevEntry?.map((s) => ({
              entry: s.content,
              twist: s.twist?.content,
            })) ?? null,
          twistsToChoose: event.twistsToChoose || null,
        });
        break;

      case "round_started":
        set({ status: "writing", secondsPerTurn: event.timer });
        break;

      case "round_ended":
        set({
          submittedIds: new Set(),
          round: event.nextRound,
          status: "round_starting",
        });
        break;

      case "player_submitted":
        set({ submittedIds: new Set(get().submittedIds).add(event.playerId) });
        break;

      case "player_unsubmitted": {
        const newSubmittedIds = new Set(get().submittedIds);
        newSubmittedIds.delete(event.playerId);
        set({ submittedIds: newSubmittedIds });
        break;
      }

      case "all_revealed": {
        const stories = mapStories(get().players, event.stories);
        set({
          status: "revealing",
          allStories: stories,
          aiCommentStatus: "loading",
        });
        break;
      }

      case "ai_comment": {
        set({ aiComment: event.comment, aiCommentStatus: "success" });
        break;
      }

      case "game_restarted": {
        const currentUser = useUserStore.getState().user;
        set({
          ...initialState,
          status: event.room.status,
          players: event.room.players,
          round: event.room.round,
          isHost: event.room.hostId === currentUser?.id,
        });
        break;
      }

      case "error": {
        if (event.code === "AI_FAILED") {
          set({ aiCommentStatus: "error" });
          break;
        }

        set({ error: event.message });
        toast.error(event.message);

        if (event.code === "GAME_ALREADY_STARTED") {
          router.navigate({ to: "/" });
        }

        break;
      }
    }
  },

  startReveal: () => set({ status: "reveal" }),

  addSavedStory: (storyId: string) =>
    set({
      savedStories: [...get().savedStories, storyId],
    }),

  reset: () => set(initialState),
}));
