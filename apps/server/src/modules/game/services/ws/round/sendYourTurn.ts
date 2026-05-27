import { Player, RoomState } from "../../../model/state";
import { roomManager } from "../../rooms";
import { pickThreeTwists, shouldShowTwist } from "./twist";
import { getPlayerStoryIndex } from "./utils/getPlayerStoryIndex";

export function sendYourTurn(room: RoomState, player: Player) {
  const showTwist =
    room.config.enableTwists &&
    shouldShowTwist(room.round, room.totalRounds || room.players.size);

  roomManager.send(room, player.id, {
    prevSentence: getSentence(room, player.id, room.config.blindMode),
    twistsToChoose: showTwist ? pickThreeTwists() : undefined,
    type: "your_turn",
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
