import { RoomState } from "../../model/state";
import { autoSubmitMissing } from "./autoSubmitMissing";
import { onRoundEnd } from "./onRoundEnd";

export function tryFinishRound(room: RoomState, isTimeout = false) {
  console.log(isTimeout);
  if (room.status !== "writing") return;

  const connectedPlayers = [...room.players.values()].filter(
    (p) => p.connected,
  );
  if (connectedPlayers.length === 0) return;

  const allSubmitted = connectedPlayers.every((p) => room.submitted.has(p.id));
  if (!allSubmitted && !isTimeout) return;

  if (room.timer) clearTimeout(room.timer);
  room.timer = null;
  autoSubmitMissing(room);
  onRoundEnd(room);
}
