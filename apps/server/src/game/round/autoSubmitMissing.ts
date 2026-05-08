import { RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";
import { getSortedPlayers } from "../utils/getSortedPlayers";
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
    room.stories[storyIndex].sentences.push({
      playerId: player.id,
      content: "...",
      wasTimeout: true,
    });

    room.submitted.add(player.id);

    roomManager.broadcast(room, {
      type: "player_submitted",
      playerId: player.id,
    });
  });
}
