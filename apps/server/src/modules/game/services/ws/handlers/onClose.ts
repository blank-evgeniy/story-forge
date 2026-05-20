import { ElysiaWS } from "elysia/dist/ws";

import { tryFinishRound } from "../round/tryFinishRound";
import { EMPTY_ROOM_CLEANUP_DELAY_MS } from "../../../model/consts";
import { roomManager } from "../../rooms";

export function onClose(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  roomManager.unregisterSocket(ws.id);
  if (!context) return;

  const { player, playerId, room, roomCode } = context;

  if (room.status === "lobby") {
    room.players.delete(playerId);
    roomManager.broadcast(room, { type: "player_left", playerId });
  } else if (room.status === "writing" || room.status === "reveal") {
    player.connected = false;
    roomManager.broadcast(room, { type: "player_disconnected", playerId });

    if (room.status === "writing") {
      tryFinishRound(room);
    }
  }

  const anyoneLeft = [...room.players.values()].some((p) => p.connected);

  if (!anyoneLeft) {
    setTimeout(() => {
      const stillEmpty = [...room.players.values()].every((p) => !p.connected);
      if (stillEmpty) roomManager.delete(roomCode);
    }, EMPTY_ROOM_CLEANUP_DELAY_MS);
  }
}
