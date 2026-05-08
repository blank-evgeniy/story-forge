import { RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { getTwistById } from "./twist";
import { getStoryIndex } from "./utils/getStoryIndex";

export function autoSubmitMissing(room: RoomState) {
  const players = getSortedPlayers(room);

  players.forEach((player) => {
    if (room.submitted.has(player.id)) return;

    const storyIndex = getStoryIndex(
      player.turnOrder,
      room.round,
      players.length,
    );

    const draft = room.drafts.get(player.id);

    room.stories[storyIndex].sentences.push({
      playerId: player.id,
      content: draft?.content || "...",
      twist: draft?.twistId ? getTwistById(draft.twistId) : undefined,
      wasTimeout: true,
    });

    room.submitted.add(player.id);

    roomManager.broadcast(room, {
      type: "player_submitted",
      playerId: player.id,
    });
  });
}
