import { RoomState } from "../../model/state";

export function getSortedPlayers(room: RoomState) {
  return [...room.players.values()].sort((a, b) => a.turnOrder - b.turnOrder);
}
