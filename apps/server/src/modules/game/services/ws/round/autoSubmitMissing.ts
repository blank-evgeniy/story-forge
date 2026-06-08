import { RoomState } from "../../../model/state";
import { roomManager } from "../../rooms";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { getTwistById } from "./twist";
import { getPlayerStoryIndex } from "./utils/getPlayerStoryIndex";

export function autoSubmitMissing(room: RoomState) {
  const players = getSortedPlayers(room);

  players.forEach((player) => {
    if (room.submittedIds.has(player.id)) return;

    const storyIndex = getPlayerStoryIndex(room, player.id);

    const draft = room.drafts.get(player.id);

    room.stories[storyIndex].entries.push({
      content: draft?.content || "...",
      playerId: player.id,
      twist: draft?.twistId
        ? getTwistById(draft.twistId, room.locale)
        : undefined,
      wasTimeout: true,
    });

    room.submittedIds.add(player.id);

    roomManager.broadcast(room, {
      playerId: player.id,
      type: "player_submitted",
    });
  });
}
