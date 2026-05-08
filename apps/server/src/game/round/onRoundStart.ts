import { RoomState } from "../../model/state";
import { roomManager } from "../room/room-manager";
import { TURN_TIMER_BUFFER_MS } from "../consts";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { sendYourTurn } from "./sendYourTurn";
import { tryFinishRound } from "./tryFinishRound";

export function onRoundStart(room: RoomState) {
  roomManager.broadcast(room, {
    type: "round_started",
    timer: room.config.secondsPerTurn,
  });

  const players = getSortedPlayers(room);
  players.forEach((player) => sendYourTurn(room, player));

  room.timer = setTimeout(
    () => tryFinishRound(room),
    room.config.secondsPerTurn * 1000 + TURN_TIMER_BUFFER_MS,
  );
}
