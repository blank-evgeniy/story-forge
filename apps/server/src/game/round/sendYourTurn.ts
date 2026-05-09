import { Player, RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";

import { getPlayerStoryIndex } from "./utils/getPlayerStoryIndex";
import { pickThreeTwists, shouldShowTwist } from "./twist";

export function sendYourTurn(room: RoomState, player: Player) {
  const showTwist =
    room.config.enableTwists &&
    shouldShowTwist(room.round, room.totalRounds || room.players.size);

  roomManager.send(room, player.id, {
    type: "your_turn",
    prevSentence: getSentence(room, player.id, room.config.blindMode),
    twistsToChoose: showTwist ? pickThreeTwists() : undefined,
  });
}

function getSentence(room: RoomState, playerId: string, blindMode: boolean) {
  const round = room.round;

  if (round === 1) return null;

  const storyIndex = getPlayerStoryIndex(room, playerId);
  const currentStory = room.stories[storyIndex];
  const currentStoryLength = currentStory.sentences.length;

  const lastSentence = currentStory.sentences[currentStoryLength - 1];

  return blindMode
    ? [{ ...lastSentence, twist: undefined }]
    : currentStory.sentences;
}
