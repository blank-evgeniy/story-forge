import { Player, RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";

import { getStoryIndex } from "./utils/getStoryIndex";
import { pickThreeTwists, shouldShowTwist } from "./twist";

export function sendYourTurn(room: RoomState, player: Player) {
  const showTwist =
    room.config.enableTwists &&
    shouldShowTwist(room.round, room.totalRounds || room.players.size);

  roomManager.send(room, player.id, {
    type: "your_turn",
    prevSentence: getSentence(room, player.turnOrder, room.config.blindMode),
    twistsToChoose: showTwist ? pickThreeTwists() : undefined,
  });
}

function getSentence(room: RoomState, playerOrder: number, blindMode: boolean) {
  const round = room.round;
  const totalPlayers = room.players.size;

  if (round === 1) return null;

  const storyIndex = getStoryIndex(playerOrder, round, totalPlayers);
  const currentStory = room.stories[storyIndex];
  const currentStoryLength = currentStory.sentences.length;

  const lastSentence = currentStory.sentences[currentStoryLength - 1];

  return blindMode
    ? [{ ...lastSentence, twist: undefined }]
    : currentStory.sentences;
}
