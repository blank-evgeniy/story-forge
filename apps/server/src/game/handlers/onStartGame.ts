import { ElysiaWS } from "elysia/dist/ws";
import { roomManager } from "../room-manager";
import { onRoundStart } from "./onRoundStart";
import { getWsMeta } from "../utils/getWsMeta";

export function onStartGame(ws: ElysiaWS) {
  const { playerId, roomCode } = getWsMeta(ws);

  if (!playerId || !roomCode) return;

  const room = roomManager.get(roomCode);
  if (!room || room.status !== "lobby") return;

  if (room.players.size < 2) {
    ws.send(JSON.stringify({ type: "error", message: "Недостаточно игроков" }));
    return;
  }

  const players = [...room.players.values()].sort(
    (a, b) => a.turnOrder - b.turnOrder,
  );
  const newStories = players.map((player) => ({
    id: crypto.randomUUID(),
    ownerId: player.id,
    sentences: [],
  }));

  room.status = "writing";
  room.round = 1;
  room.totalRounds = players.length;
  room.stories = newStories;

  onRoundStart(room);
}
