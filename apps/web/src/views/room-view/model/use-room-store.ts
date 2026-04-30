import { create } from "zustand";
import type { GameState } from "./types";
import type { ClientEvent, ServerEvent } from "@/api/ws/types";
import { mapStories } from "./map";

export const useRoomStore = create<GameState>((set, get) => ({
  status: "idle",
  players: [],
  round: 0,
  totalRounds: 0,
  secondsLeft: 0,
  submitted: new Set<string>(),
  prevSentence: null,
  allStories: [],
  error: null,
  secondsPerTurn: 60,

  handleEvent(event: ServerEvent) {
    switch (event.type) {
      case "room_state":
        set({
          status: event.room.status,
          players: event.room.players,
          round: event.room.round,
          secondsPerTurn: event.room.secondsPerTurn,
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
}));
