import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../../rooms";
import { serializeRoom } from "../utils/serializeRoom";

export function onRequestState(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { room } = context;

  ws.send(JSON.stringify({ room: serializeRoom(room), type: "room_state" }));
}
