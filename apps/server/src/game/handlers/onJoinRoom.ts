import { ElysiaWS } from "elysia/dist/ws";

import { roomManager } from "../room/room-manager";
import { createPlayer, Player } from "../../model/state";
import { socketMeta } from "../../modules/ws";
import { serializeRoom } from "../utils/serializeRoom";
import { sendYourTurn } from "../round/sendYourTurn";

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
      room.players.size + 1,
    );
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

  socketMeta.set(ws.id, { playerId: event.playerId, roomCode: event.code });
}
