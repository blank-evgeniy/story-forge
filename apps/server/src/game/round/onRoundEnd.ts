import { RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";
import { ROUND_TRANSITION_DELAY_MS } from "../consts";
import { onRoundStart } from "./onRoundStart";

export function onRoundEnd(room: RoomState) {
  room.submitted = new Set();
  room.drafts = new Map();

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
    type: "round_ended",
    nextRound: room.round,
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
