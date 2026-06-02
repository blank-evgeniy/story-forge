import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../../rooms";
import { getPlayerStoryIndex } from "../round/utils/getPlayerStoryIndex";

export function onEditEntry(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "writing" || !room.submittedIds.has(playerId)) return;

  const storyIndex = getPlayerStoryIndex(room, playerId);

  const story = room.stories[storyIndex];
  const lastEntry = story.entries[story.entries.length - 1];
  if (!lastEntry || lastEntry.playerId !== playerId) return;

  story.entries.pop();
  room.drafts.set(playerId, {
    content: lastEntry.content,
    twistId: lastEntry.twist?.id,
  });

  room.submittedIds.delete(playerId);

  roomManager.broadcast(room, {
    playerId,
    type: "player_unsubmitted",
  });
}
