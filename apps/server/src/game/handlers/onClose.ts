import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { getWsMeta } from "../utils/getWsMeta";
import { EMPTY_ROOM_CLEANUP_DELAY_MS } from "../consts";

import { socketMeta } from "../../modules/ws";

export function onClose(ws: ElysiaWS) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;
  socketMeta.delete(ws.id);

  const room = roomManager.get(roomCode);
  if (!room) return;

  const player = room.players.get(playerId);
  if (!player) return;

  if (room.status === "lobby") {
    room.players.delete(playerId);
    roomManager.broadcast(room, { type: "player_left", playerId });
  } else if (room.status === "writing" || room.status === "reveal") {
    player.connected = false;
    roomManager.broadcast(room, { type: "player_disconnected", playerId });
  }

  const anyoneLeft = [...room.players.values()].some((p) => p.connected);

  if (!anyoneLeft) {
    setTimeout(() => {
      const stillEmpty = [...room.players.values()].every((p) => !p.connected);
      if (stillEmpty) roomManager.delete(roomCode);
    }, EMPTY_ROOM_CLEANUP_DELAY_MS);
  }
}
