import { RoomState } from "../../../model/state";

export type SerializedRoom = ReturnType<typeof serializeRoom>;

export function serializeRoom(room: RoomState) {
  return {
    ...room,
    drafts: undefined,
    players: Array.from(room.players.values()).map(({ ws, ...rest }) => rest),
    submittedIds: Array.from(room.submittedIds),
    timer: undefined,
  };
}
