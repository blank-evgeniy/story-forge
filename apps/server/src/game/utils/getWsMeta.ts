import { ElysiaWS } from "elysia/dist/ws";
import { socketMeta } from "../../modules/ws";

export function getWsMeta(ws: ElysiaWS): {
  roomCode: string | null;
  playerId: string | null;
} {
  const meta = socketMeta.get(ws.id);

  const playerId = meta?.playerId ?? null;
  const roomCode = meta?.roomCode ?? null;

  return {
    playerId,
    roomCode,
  };
}
