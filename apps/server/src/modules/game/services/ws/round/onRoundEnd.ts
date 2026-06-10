import { ROUND_TRANSITION_DELAY_MS } from "../../../model/consts";
import { RoomState } from "../../../model/state";
import { roomManager } from "../../rooms";
import { onGameEnd } from "./onGameEnd";
import { onRoundStart } from "./onRoundStart";

export function onRoundEnd(room: RoomState) {
  room.submittedIds = new Set();
  room.drafts = new Map();

  if (room.round === room.totalRounds) {
    onGameEnd(room);
    return;
  }

  room.round++;

  roomManager.broadcast(room, {
    nextRound: room.round,
    type: "round_ended",
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
