import { RoomState } from "../../model/state";

export function serializeRoom(room: RoomState) {
  return {
    ...room,
    players: Array.from(room.players.values()).map(({ ws, ...rest }) => rest),
    submitted: Array.from(room.submitted),
    timer: undefined,
  };
}
