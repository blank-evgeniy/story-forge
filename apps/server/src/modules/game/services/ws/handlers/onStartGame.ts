import { ElysiaWS } from "elysia/dist/ws";

import {
  MIN_PLAYERS_TO_START,
  ROUND_TRANSITION_DELAY_MS,
} from "../../../model/consts";
import { roomManager } from "../../rooms";
import { onRoundStart } from "../round/onRoundStart";

export function onStartGame(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "lobby") return;

  if (room.players.size < MIN_PLAYERS_TO_START) {
    roomManager.send(room, playerId, {
      code: "NOT_ENOUGH_PLAYERS",
      message: "Not enough players",
      type: "error",
    });
    return;
  }

  if (room.hostId !== playerId) {
    roomManager.send(room, playerId, {
      code: "NOT_HOST_START",
      message: "Only the host can start the game",
      type: "error",
    });
    return;
  }

  const players = [...room.players.values()].sort(
    (a, b) => a.turnOrder - b.turnOrder,
  );
  const newStories = players.map((player) => ({
    entries: [],
    id: crypto.randomUUID(),
    ownerId: player.id,
  }));

  room.status = "writing";
  room.round = 1;
  room.totalRounds = players.length;
  room.stories = newStories;

  roomManager.broadcast(room, {
    totalRounds: room.totalRounds,
    type: "game_started",
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
