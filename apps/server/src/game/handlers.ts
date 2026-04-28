import { ElysiaWS } from "elysia/dist/ws";
import { ClientEvent } from "../model/client-events";
import { Player } from "../model/state";
import { roomManager } from "./room-manager";

export function handleMessage(ws: ElysiaWS, event: ClientEvent) {
  switch (event.type) {
    case "join_room":
      return onJoinRoom(ws, event);
  }
}

function onJoinRoom(ws: ElysiaWS, event: { code: string; username: string }) {
  const room = roomManager.get(event.code);
  if (!room) {
    ws.send(JSON.stringify({ type: "error", message: "Комната не найдена" }));
    return;
  }

  const player: Player = {
    id: crypto.randomUUID(),
    ws,
    username: event.username,
    connected: true,
    turnOrder: room.players.size + 1,
  };

  room.players.set(player.id, player);

  ws.send(JSON.stringify({ type: "room_state", room: { code: room.code } }));

  roomManager.broadcast(room, {
    type: "player_joined",
    username: player.username,
  });
}

export function handleClose(ws: any) {
  const { playerId, roomCode } = ws.data;

  if (!playerId || !roomCode) return;

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
