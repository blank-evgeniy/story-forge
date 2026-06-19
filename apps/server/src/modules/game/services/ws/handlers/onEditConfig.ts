import { ElysiaWS } from "elysia/dist/ws";

import { RoomConfig } from "../../../model/state";
import { roomManager } from "../../rooms";

export function onEditConfig(ws: ElysiaWS, event: { config: RoomConfig }) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "lobby") return;

  if (room.hostId !== playerId) {
    roomManager.send(room, playerId, {
      code: "NOT_HOST_EDIT",
      message: "Only the host can edit the configuration",
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
