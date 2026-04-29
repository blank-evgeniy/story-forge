import { create } from "zustand";
import type { GameState } from "./types";
import type { ClientEvent, ServerEvent } from "@/api/ws/types";

export const useRoomStore = create<GameState>((set, get) => ({
  status: "idle",
  players: [],
  round: 0,
  totalRounds: 0,
  secondsLeft: 0,
  submitted: 0,
  prevSentence: null,
  allStories: [],
  error: null,

  handleEvent(event: ServerEvent) {
    switch (event.type) {
      case "room_state":
        set({
          status: event.room.status,
          players: event.room.players,
          round: event.room.round,
          submitted: event.room.submitted.length,
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
