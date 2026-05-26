import { ElysiaWS } from "elysia/dist/ws";
import { onRoundStart } from "../round/onRoundStart";
import { roomManager } from "../../rooms";
import {
  MIN_PLAYERS_TO_START,
  ROUND_TRANSITION_DELAY_MS,
} from "../../../model/consts";

export function onStartGame(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "lobby") return;

  if (room.players.size < MIN_PLAYERS_TO_START) {
    roomManager.send(room, playerId, {
      type: "error",
      message: "Недостаточно игроков",
      code: "NOT_ENOUGH_PLAYERS",
    });
    return;
  }

  if (room.hostId !== playerId) {
    roomManager.send(room, playerId, {
      type: "error",
      message: "Только хост может начать игру",
      code: "NOT_HOST",
    });
    return;
  }

  const players = [...room.players.values()].sort(
    (a, b) => a.turnOrder - b.turnOrder,
  );
  const newStories = players.map((player) => ({
    id: crypto.randomUUID(),
    ownerId: player.id,
    sentences: [],
  }));

  room.status = "writing";
  room.round = 1;
  room.totalRounds = players.length;
  room.stories = newStories;

  roomManager.broadcast(room, {
    type: "game_started",
    totalRounds: room.totalRounds,
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
