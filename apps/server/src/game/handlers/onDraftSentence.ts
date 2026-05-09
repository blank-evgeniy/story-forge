import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";

export function onDraftSentence(
  ws: ElysiaWS,
  event: { content?: string; twistId?: string },
) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "writing" || room.submitted.has(playerId)) return;

  room.drafts.set(playerId, {
    content: event.content,
    twistId: event.twistId,
  });
}
