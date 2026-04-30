import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room-manager";
import { onRoundEnd } from "./onRoundEnd";
import { getWsMeta } from "../utils/getWsMeta";

export function onSubmitSentence(ws: ElysiaWS, event: { content: string }) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "writing") return;

  const player = room.players.get(playerId);
  if (!player) return;

  const totalPlayers = room.players.size;
  const storyIndex =
    (player.turnOrder - room.round + totalPlayers) % totalPlayers;

  room.stories[storyIndex].sentences.push({
    content: event.content,
    playerId,
    wasTimeout: false,
  });

  room.submitted.add(playerId);
  roomManager.broadcast(room, {
    type: "player_submitted",
    playerId,
  });

  if (room.submitted.size === room.players.size) {
    if (room.timer) clearTimeout(room.timer);

    onRoundEnd(room);
  }
}
