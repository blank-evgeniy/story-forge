import { Player, RoomState } from "../../../model/state";
import { roomManager } from "../../rooms";
import { pickThreeTwists, shouldShowTwist } from "./twist";
import { getPlayerStoryIndex } from "./utils/getPlayerStoryIndex";

export function sendYourTurn(room: RoomState, player: Player) {
  const showTwist =
    room.config.enableTwists &&
    shouldShowTwist(room.round, room.totalRounds || room.players.size);

  roomManager.send(room, player.id, {
    prevEntry: getEntry(room, player.id, room.config.blindMode),
    twistsToChoose: showTwist ? pickThreeTwists(room.locale) : undefined,
    type: "your_turn",
  });
}

function getEntry(room: RoomState, playerId: string, blindMode: boolean) {
  const round = room.round;

  if (round === 1) return null;

  const storyIndex = getPlayerStoryIndex(room, playerId);
  const currentStory = room.stories[storyIndex];
  const currentStoryLength = currentStory.entries.length;

  const lastEntry = currentStory.entries[currentStoryLength - 1];

  return blindMode
    ? [{ ...lastEntry, twist: undefined }]
    : currentStory.entries;
}
