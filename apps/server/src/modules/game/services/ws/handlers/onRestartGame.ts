import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../../rooms";
import { serializeRoom } from "../utils/serializeRoom";

export function onRestartGame(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "reveal") return;

  if (room.hostId !== playerId) {
    roomManager.send(room, playerId, {
      code: "NOT_HOST",
      message: "Только хост может перезапустить игру",
      type: "error",
    });
    return;
  }

  room.players.forEach((player, id) => {
    if (!player.connected) room.players.delete(id);
  });

  room.status = "lobby";
  room.stories = [];
  room.submittedIds = new Set();
  room.drafts = new Map();
  room.round = 1;

  roomManager.broadcast(room, {
    room: serializeRoom(room),
    type: "game_restarted",
  });
}
