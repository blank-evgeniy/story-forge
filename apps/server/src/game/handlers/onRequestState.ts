import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room-manager";
import { getWsMeta } from "../utils/getWsMeta";
import { serializeRoom } from "../utils/serializeRoom";

export function onRequestState(ws: ElysiaWS) {
  const { roomCode } = getWsMeta(ws);

  if (!roomCode) return;

  const room = roomManager.get(roomCode);
  if (!room) return;

  ws.send(JSON.stringify({ type: "room_state", room: serializeRoom(room) }));
}
