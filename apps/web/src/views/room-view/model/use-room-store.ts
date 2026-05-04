import { create } from "zustand";
import type { ClientEvent, ServerEvent } from "@/api/ws/types";
import { mapStories } from "./map";
import type { Player, Story } from "./types";

type GameActions = {
  handleEvent: (event: ServerEvent) => void;
  startGame: (ws: WebSocket) => void;
  submitSentence: (ws: WebSocket, content: string) => void;
  reset: () => void;
};

type GameData = {
  status: "idle" | "lobby" | "writing" | "reveal";
  players: Player[];
  round: number;
  totalRounds: number;
  submitted: Set<string>;
  prevSentence: string | string[] | null;
  allStories: Story[];
  error: string | null;
  secondsPerTurn: number;
  twistsToChoose: { id: string; content: string }[] | null;
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
};

export const useRoomStore = create<GameState>((set, get) => ({
  ...initialState,

  handleEvent(event: ServerEvent) {
    switch (event.type) {
      case "room_state":
        set({
          status: event.room.status,
          players: event.room.players,
          round: event.room.round,
          secondsPerTurn: event.room.config.secondsPerTurn,
        });
        break;

      case "player_joined":
        set({
          players: [
            ...get().players.filter((p) => p.id !== event.playerId),
            { id: event.playerId, username: event.username },
          ],
        });
        break;

      case "player_left":
        set({
          players: get().players.filter((p) => p.id !== event.playerId),
        });
        break;

      case "your_turn":
        set({
          prevSentence: Array.isArray(event.prevSentence)
            ? event.prevSentence.map((s) => s.content)
            : event.prevSentence?.content,
          twistsToChoose: event.twistsToChoose || null,
        });
        break;

      case "iteration_started":
        set({
          round: event.round,
          totalRounds: event.totalRounds,
          status: "writing",
        });
        break;

      case "iteration_ended":
        set({ submitted: new Set() });
        break;

      case "player_submitted":
        set({ submitted: new Set(get().submitted).add(event.playerId) });
        break;

      case "all_revealed":
        set({
          status: "reveal",
          allStories: mapStories(get().players, event.stories),
        });
        break;

      case "error":
        set({ error: event.message });
        break;
    }
  },

  startGame(ws: WebSocket) {
    const event: ClientEvent = { type: "start_game" };
    ws.send(JSON.stringify(event));
  },

  submitSentence(ws: WebSocket, content: string) {
    const event: ClientEvent = { type: "submit_sentence", content };
    ws.send(JSON.stringify(event));
  },

  reset: () => set(initialState),
}));
