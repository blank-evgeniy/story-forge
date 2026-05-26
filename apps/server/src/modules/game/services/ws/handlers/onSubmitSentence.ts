import { ElysiaWS } from "elysia/dist/ws";

import { getPlayerStoryIndex } from "../round/utils/getPlayerStoryIndex";
import { getTwistById } from "../round/twist";
import { tryFinishRound } from "../round/tryFinishRound";
import { roomManager } from "../../rooms";

export function onSubmitSentence(
  ws: ElysiaWS,
  event: { content: string; twistId?: string },
) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { player, playerId, room } = context;

  if (room.status !== "writing" || room.submitted.has(playerId)) return;

  const storyIndex = getPlayerStoryIndex(room, player.id);

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
