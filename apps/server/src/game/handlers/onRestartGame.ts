import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { getWsMeta } from "../utils/getWsMeta";
import { serializeRoom } from "../utils/serializeRoom";

export function onRestartGame(ws: ElysiaWS) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "reveal") return;

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

  roomManager.broadcast(room, {
    type: "game_restarted",
    room: serializeRoom(room),
  });
}
