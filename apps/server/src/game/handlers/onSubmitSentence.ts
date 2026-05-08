import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { getStoryIndex } from "../round/utils/getStoryIndex";
import { getWsMeta } from "../utils/getWsMeta";
import { getTwistById } from "../round/twist";
import { tryFinishRound } from "../round/tryFinishRound";

export function onSubmitSentence(
  ws: ElysiaWS,
  event: { content: string; twistId?: string },
) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "writing") return;

  const player = room.players.get(playerId);
  if (!player) return;

  if (room.submitted.has(playerId)) return;

  const totalPlayers = room.players.size;
  const storyIndex = getStoryIndex(player.turnOrder, room.round, totalPlayers);

  room.stories[storyIndex].sentences.push({
    content: event.content,
    twist:
      room.config.enableTwists && event.twistId
        ? getTwistById(event.twistId)
        : undefined,
    playerId,
    wasTimeout: false,
  });

  room.submitted.add(playerId);
  roomManager.broadcast(room, {
    type: "player_submitted",
    playerId,
  });

  tryFinishRound(room);
}
