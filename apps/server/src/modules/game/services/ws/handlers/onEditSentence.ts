import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../../rooms";
import { getPlayerStoryIndex } from "../round/utils/getPlayerStoryIndex";

export function onEditSentence(ws: ElysiaWS) {
  const context = roomManager.getContext(ws.id);
  if (!context) return;

  const { playerId, room } = context;

  if (room.status !== "writing" || !room.submitted.has(playerId)) return;

  const storyIndex = getPlayerStoryIndex(room, playerId);

  const story = room.stories[storyIndex];
  const lastSentence = story.sentences[story.sentences.length - 1];
  if (!lastSentence || lastSentence.playerId !== playerId) return;

  story.sentences.pop();
  room.drafts.set(playerId, {
    content: lastSentence.content,
    twistId: lastSentence.twist?.id,
  });

  room.submitted.delete(playerId);

  roomManager.broadcast(room, {
    playerId,
    type: "player_unsubmitted",
  });
}
