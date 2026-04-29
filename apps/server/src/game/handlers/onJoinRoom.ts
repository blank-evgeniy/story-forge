import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room-manager";
import { Player } from "../../model/state";
import { socketMeta } from "../../modules/ws";
import { serializeRoom } from "../utils/serializeRoom";

export function onJoinRoom(
  ws: ElysiaWS,
  event: { code: string; username: string },
) {
  const room = roomManager.get(event.code);
  if (!room) {
    ws.send(JSON.stringify({ type: "error", message: "Комната не найдена" }));
    return;
  }

  const player: Player = {
    id: crypto.randomUUID(),
    ws,
    username: event.username,
    connected: true,
    turnOrder: room.players.size + 1,
  };

  room.players.set(player.id, player);

  ws.send(JSON.stringify({ type: "room_state", room: serializeRoom(room) }));

  roomManager.broadcast(room, {
    type: "player_joined",
    username: player.username,
  });

  socketMeta.set(ws.id, { playerId: player.id, roomCode: event.code });
}
