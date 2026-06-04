import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../../rooms";
import { tryFinishRound } from "../round/tryFinishRound";
import { getTwistById } from "../round/twist";
import { getPlayerStoryIndex } from "../round/utils/getPlayerStoryIndex";

export function onSubmitEntry(
  ws: ElysiaWS,
  event: { content: string; twistId?: string },
) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { player, playerId, room } = context;

  if (room.status !== "writing" || room.submittedIds.has(playerId)) return;

  const storyIndex = getPlayerStoryIndex(room, player.id);

  room.stories[storyIndex].entries.push({
    content: event.content,
    playerId,
    twist:
      room.config.enableTwists && event.twistId
        ? getTwistById(event.twistId)
        : undefined,
    wasTimeout: false,
  });

  room.submittedIds.add(playerId);
  roomManager.broadcast(room, {
    playerId,
    type: "player_submitted",
  });

  tryFinishRound(room);
}
