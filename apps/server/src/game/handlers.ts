import { ElysiaWS } from "elysia/dist/ws";
import { ClientEvent } from "../model/client-events";
import { roomManager } from "./room-manager";
import { onStartGame } from "./handlers/onStartGame";
import { onSubmitSentence } from "./handlers/onSubmitSentence";
import { onRequestState } from "./handlers/onRequestState";
import { getWsMeta } from "./utils/getWsMeta";
import { socketMeta } from "../modules/ws";
import { onJoinRoom } from "./handlers/onJoinRoom";

export function handleMessage(ws: ElysiaWS, event: ClientEvent) {
  switch (event.type) {
    case "join_room":
      return onJoinRoom(ws, event);
    case "start_game":
      return onStartGame(ws);
    case "submit_sentence":
      return onSubmitSentence(ws, event);
    case "request_state":
      return onRequestState(ws);
  }
}

export function handleClose(ws: ElysiaWS) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;
  socketMeta.delete(ws.id);

  const room = roomManager.get(roomCode);
  if (!room) return;

  const player = room.players.get(playerId);
  if (player) player.connected = false;

  roomManager.broadcast(room, { type: "player_left", playerId });

  const anyoneLeft = [...room.players.values()].some((p) => p.connected);

  if (!anyoneLeft) {
    setTimeout(() => {
      const stillEmpty = [...room.players.values()].every((p) => !p.connected);
      if (stillEmpty) roomManager.delete(roomCode);
    }, 60_000);
  }
}
