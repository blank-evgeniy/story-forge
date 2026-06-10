import { ElysiaWS } from "elysia/dist/ws";

import { RoomConfig } from "../../../model/state";
import { roomManager } from "../../rooms";

export function onEditConfig(ws: ElysiaWS, event: { config: RoomConfig }) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { room } = context;

  if (room.status !== "lobby") return;

  if (room.hostId !== ws.id) {
    roomManager.send(room, ws.id, {
      code: "NOT_HOST",
      message: "Только хост может редактировать конфигурацию",
      type: "error",
    });
    return;
  }

  room.config = event.config;

  roomManager.broadcast(room, {
    config: event.config,
    type: "config_edited",
  });
}
