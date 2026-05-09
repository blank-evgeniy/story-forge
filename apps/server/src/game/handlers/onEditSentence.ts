import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { getWsMeta } from "../utils/getWsMeta";
import { getPlayerStoryIndex } from "../round/utils/getPlayerStoryIndex";

export function onEditSentence(ws: ElysiaWS) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!roomCode || !playerId) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "writing") return;

  if (!room.submitted.has(playerId)) return;

  const player = room.players.get(playerId);
  if (!player) return;

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
    type: "player_unsubmitted",
    playerId,
  });
}
