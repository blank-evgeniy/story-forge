import { TURN_TIMER_BUFFER_MS } from "../../../model/consts";
import { RoomState } from "../../../model/state";
import { roomManager } from "../../rooms";
import { getSortedPlayers } from "../utils/getSortedPlayers";
import { sendYourTurn } from "./sendYourTurn";
import { tryFinishRound } from "./tryFinishRound";

export function onRoundStart(room: RoomState) {
  roomManager.broadcast(room, {
    timer: room.config.secondsPerTurn,
    type: "round_started",
  });

  const players = getSortedPlayers(room);
  players.forEach((player) => sendYourTurn(room, player));

  room.timer = setTimeout(
    () => tryFinishRound(room, true),
    room.config.secondsPerTurn * 1000 + TURN_TIMER_BUFFER_MS,
  );
}
