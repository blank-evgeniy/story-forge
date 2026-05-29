import { ElysiaWS } from "elysia/dist/ws";

import { MAX_PLAYERS } from "../../../model/consts";
import { createPlayer } from "../../../model/state";
import { roomManager } from "../../rooms";
import { sendYourTurn } from "../round/sendYourTurn";
import { serializeRoom } from "../utils/serializeRoom";

export function onJoinRoom(
  ws: ElysiaWS,
  event: { code: string; color: string; icon: string; playerId: string; username: string; },
) {
  const room = roomManager.get(event.code);
  if (!room) {
    ws.send(
      JSON.stringify({
        code: "ROOM_NOT_FOUND",
        message: "Комната не найдена",
        type: "error",
      }),
    );
    return;
  }

  if (room.players.size >= MAX_PLAYERS) {
    ws.send(
      JSON.stringify({
        code: "ROOM_FULL",
        message: "Комната уже заполнена",
        type: "error",
      }),
    );
    return;
  }

  const existing = room.players.get(event.playerId);

  if (existing) {
    existing.ws = ws;
    existing.connected = true;

    roomManager.broadcast(room, {
      playerId: existing.id,
      type: "player_reconnected",
    });
  } else {
    if (room.status !== "lobby") {
      ws.send(
        JSON.stringify({
          code: "GAME_ALREADY_STARTED",
          message: "Игра уже началась",
          type: "error",
        }),
      );
      return;
    }

    const player = createPlayer(
      ws,
      event.playerId,
      event.username,
      room.nextTurnOrder,
      event.color,
      event.icon,
    );
    room.nextTurnOrder++;
    room.players.set(player.id, player);

    roomManager.broadcast(room, {
      color: player.color,
      icon: player.icon,
      playerId: player.id,
      type: "player_joined",
      username: player.username,
    });
  }

  ws.send(JSON.stringify({ room: serializeRoom(room), type: "room_state" }));

  if (existing && room.status === "writing") {
    sendYourTurn(room, existing);
  }

  roomManager.registerSocket(ws.id, event.playerId, event.code);
}
