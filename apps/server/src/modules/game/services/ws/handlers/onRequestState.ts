import { ElysiaWS } from "elysia/dist/ws";

import { serializeRoom } from "../utils/serializeRoom";
import { roomManager } from "../../rooms";

export function onRequestState(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { room } = context;

  ws.send(JSON.stringify({ type: "room_state", room: serializeRoom(room) }));
}
