import { RoomState } from "../../../../model/state";
import { getSortedPlayers } from "../../utils/getSortedPlayers";

export function getPlayerStoryIndex(room: RoomState, playerId: string): number {
  const players = getSortedPlayers(room);
  const position = players.findIndex((p) => p.id === playerId) + 1; // 1-based
  const totalPlayers = players.length;

  return getStoryIndex(position, room.round, totalPlayers);
}

function getStoryIndex(
  playerOrder: number,
  round: number,
  totalPlayers: number,
): number {
  return (playerOrder - round + totalPlayers) % totalPlayers;
}
