import { RoomState } from "../../model/state";
import { roomManager } from "../room-manager";
import { pickThreeTwists, shouldShowTwist } from "../twist";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { getStoryIndex } from "../utils/getStoryIndex";
import { onRoundEnd } from "./onRoundEnd";

export function onRoundStart(room: RoomState) {
  room.submitted = new Set();

  roomManager.broadcast(room, {
    type: "iteration_started",
    round: room.round,
    totalRounds: room.totalRounds || room.players.size,
    timer: room.config.secondsPerTurn,
  });

  const players = getSortedPlayers(room);
  players.forEach((player) => {
    const showTwist =
      room.config.enableTwists &&
      shouldShowTwist(room.round, room.totalRounds || room.players.size);

    roomManager.send(room, player.id, {
      type: "your_turn",
      prevSentence: getSentence(room, player.turnOrder, room.config.blindMode),
      twistsToChoose: showTwist ? pickThreeTwists() : undefined,
    });
  });

  room.timer = setTimeout(() => {
    autoSubmitMissing(room);
  }, room.config.secondsPerTurn * 1000);
}

function autoSubmitMissing(room: RoomState) {
  const players = getSortedPlayers(room);

  players.forEach((player) => {
    if (room.submitted.has(player.id) || !player.connected) return;

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

  onRoundEnd(room);
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
