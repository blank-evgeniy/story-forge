import { ElysiaWS } from "elysia/dist/ws";

import { serializeRoom } from "../utils/serializeRoom";
import { roomManager } from "../../rooms";

export function onRestartGame(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "reveal") return;

  if (room.hostId !== playerId) {
    roomManager.send(room, playerId, {
      type: "error",
      message: "Только хост может перезапустить игру",
      code: "NOT_HOST",
    });
    return;
  }

  room.players.forEach((player, id) => {
    if (!player.connected) room.players.delete(id);
  });

  room.status = "lobby";
  room.stories = [];
  room.submitted = new Set();
  room.drafts = new Map();
  room.round = 1;

  roomManager.broadcast(room, {
    type: "game_restarted",
    room: serializeRoom(room),
  });
}
