import { RoomState } from "../../model/state";
import { roomManager } from "../room-manager";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { onRoundEnd } from "./onRoundEnd";

export function onRoundStart(room: RoomState) {
  room.submitted = new Set();

  roomManager.broadcast(room, {
    type: "iteration_started",
    round: room.round,
    totalRounds: room.totalRounds || room.players.size,
    timer: room.secondsPerTurn,
  });

  const players = getSortedPlayers(room);
  players.forEach((player) => {
    roomManager.send(room, player.id, {
      type: "your_turn",
      prevSentence: getSentence(room, player.turnOrder, room.blindMode),
    });
  });

  room.timer = setTimeout(() => {
    autoSubmitMissing(room);
  }, room.secondsPerTurn * 1000);
}

function autoSubmitMissing(room: RoomState) {
  const players = getSortedPlayers(room);

  players.forEach((player) => {
    if (room.submitted.has(player.id) || !player.connected) return;

    const storyIndex =
      (player.turnOrder - room.round + players.length) % players.length;
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

  const storyIndex = (playerOrder - round + totalPlayers) % totalPlayers;
  const currentStory = room.stories[storyIndex];
  const currentStoryLength = currentStory.sentences.length;

  return blindMode
    ? currentStory.sentences[currentStoryLength - 1]
    : currentStory.sentences;
}
