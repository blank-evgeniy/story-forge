import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { getWsMeta } from "../utils/getWsMeta";

export function onDraftSentence(
  ws: ElysiaWS,
  event: { content?: string; twistId?: string },
) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!roomCode || !playerId) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "writing" || room.submitted.has(playerId))
    return;

  const player = room.players.get(playerId);
  if (!player) return;

  room.drafts.set(playerId, {
    content: event.content,
    twistId: event.twistId,
  });
}
