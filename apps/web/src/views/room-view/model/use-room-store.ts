import { create } from "zustand";
import type { ClientEvent, ServerEvent } from "@/api/ws/types";
import { mapStories } from "./map";
import type { Player, PrevSentence, Story, TwistsSet } from "./types";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { router } from "@/app/routes/routes";

type GameActions = {
  handleEvent: (event: ServerEvent) => void;
  startGame: (ws: WebSocket) => void;
  submitSentence: (ws: WebSocket, content: string, twistId?: string) => void;
  draftSentence: (ws: WebSocket, content?: string, twistId?: string) => void;
  editSentence: (ws: WebSocket) => void;
  restartGame: (ws: WebSocket) => void;
  startReveal: () => void;
  reset: () => void;
};

type GameData = {
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
  submitted: Set<string>;
  prevSentence: PrevSentence[] | null;
  allStories: Story[];
  error: string | null;
  secondsPerTurn: number;
  twistsToChoose: TwistsSet | null;
};

export type GameState = GameData & GameActions;

const initialState: GameData = {
  status: "idle",
  players: [],
  round: 0,
  totalRounds: 0,
  submitted: new Set<string>(),
  prevSentence: null,
  allStories: [],
  error: null,
  secondsPerTurn: 60,
  twistsToChoose: null,
  isHost: false,
};

export const useRoomStore = create<GameState>((set, get) => ({
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
            { id: event.playerId, username: event.username, connected: true },
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
          prevSentence:
            event.prevSentence?.map((s) => ({
              sentence: s.content,
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
          submitted: new Set(),
          round: event.nextRound,
          status: "round_starting",
        });
        break;

      case "player_submitted":
        set({ submitted: new Set(get().submitted).add(event.playerId) });
        break;

      case "player_unsubmitted": {
        const newSubmitted = new Set(get().submitted);
        newSubmitted.delete(event.playerId);
        set({ submitted: newSubmitted });
        break;
      }

      case "all_revealed": {
        const stories = mapStories(get().players, event.stories);
        set({ status: "revealing", allStories: stories });
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
        set({ error: event.message });
        toast.error(event.message);

        if (event.code === "GAME_ALREADY_STARTED") {
          router.navigate({ to: "/" });
        }

        break;
      }
    }
  },

  startGame(ws: WebSocket) {
    const event: ClientEvent = { type: "start_game" };
    ws.send(JSON.stringify(event));
  },

  submitSentence(ws: WebSocket, content: string, twistId?: string) {
    const event: ClientEvent = { type: "submit_sentence", content, twistId };
    ws.send(JSON.stringify(event));
  },

  draftSentence(ws: WebSocket, content?: string, twistId?: string) {
    const event: ClientEvent = { type: "draft_sentence", content, twistId };
    ws.send(JSON.stringify(event));
  },

  editSentence(ws: WebSocket) {
    const event: ClientEvent = { type: "edit_sentence" };
    ws.send(JSON.stringify(event));
  },

  restartGame(ws: WebSocket) {
    const event: ClientEvent = { type: "restart_game" };
    ws.send(JSON.stringify(event));
  },

  startReveal: () => set({ status: "reveal" }),

  reset: () => set(initialState),
}));
