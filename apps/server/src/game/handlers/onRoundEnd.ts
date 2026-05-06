import { RoomState } from "../../model/state";
import { roomManager } from "../room-manager";
import { ROUND_TRANSITION_DELAY_MS } from "../consts";
import { onRoundStart } from "./onRoundStart";

export function onRoundEnd(room: RoomState) {
  if (room.round === room.totalRounds) {
    room.status = "reveal";
    roomManager.broadcast(room, {
      type: "all_revealed",
      stories: room.stories,
    });
    return;
  }

  room.round++;

  roomManager.broadcast(room, {
    type: "iteration_ended",
    nextRound: room.round,
    totalRounds: room.totalRounds || room.players.size,
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
