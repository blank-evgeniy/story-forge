import { RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";
import { TURN_TIMER_BUFFER_MS } from "../consts";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { onRoundEnd } from "./onRoundEnd";
import { sendYourTurn } from "./sendYourTurn";
import { autoSubmitMissing } from "./autoSubmitMissing";

export function onRoundStart(room: RoomState) {
  room.submitted = new Set();

  roomManager.broadcast(room, {
    type: "round_started",
    timer: room.config.secondsPerTurn,
  });

  const players = getSortedPlayers(room);
  players.forEach((player) => sendYourTurn(room, player));

  room.timer = setTimeout(
    () => {
      autoSubmitMissing(room);
      onRoundEnd(room);
    },
    room.config.secondsPerTurn * 1000 + TURN_TIMER_BUFFER_MS,
  );
}
