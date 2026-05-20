import { ElysiaWS } from "elysia/dist/ws";
import { MAX_PLAYERS } from "../../../model/consts";
import { createPlayer } from "../../../model/state";
import { roomManager } from "../../rooms";
import { sendYourTurn } from "../round/sendYourTurn";
import { serializeRoom } from "../utils/serializeRoom";

export function onJoinRoom(
  ws: ElysiaWS,
  event: { code: string; username: string; playerId: string },
) {
  const room = roomManager.get(event.code);
  if (!room) {
    ws.send(
      JSON.stringify({
        type: "error",
        message: "Комната не найдена",
        code: "ROOM_NOT_FOUND",
      }),
    );
    return;
  }

  if (room.players.size >= MAX_PLAYERS) {
    ws.send(
      JSON.stringify({
        type: "error",
        message: "Комната уже заполнена",
        code: "ROOM_FULL",
      }),
    );
    return;
  }

  const existing = room.players.get(event.playerId);

  if (existing) {
    existing.ws = ws;
    existing.connected = true;

    roomManager.broadcast(room, {
      type: "player_reconnected",
      playerId: existing.id,
    });
  } else {
    if (room.status !== "lobby") {
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Игра уже началась",
          code: "GAME_ALREADY_STARTED",
        }),
      );
      return;
    }

    const player = createPlayer(
      ws,
      event.playerId,
      event.username,
      room.nextTurnOrder,
    );
    room.nextTurnOrder++;
    room.players.set(player.id, player);

    roomManager.broadcast(room, {
      type: "player_joined",
      username: player.username,
      playerId: player.id,
    });
  }

  ws.send(JSON.stringify({ type: "room_state", room: serializeRoom(room) }));

  if (existing && room.status === "writing") {
    sendYourTurn(room, existing);
  }

  roomManager.registerSocket(ws.id, event.playerId, event.code);
}
