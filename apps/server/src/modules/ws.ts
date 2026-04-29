import Elysia from "elysia";
import { ClientEventSchema } from "../model/client-events";
import { handleClose, handleMessage } from "../game/handlers";

export const socketMeta: Map<
  string,
  { roomCode: string | null; playerId: string }
> = new Map();

export const wsModule = new Elysia().ws("/ws", {
  body: ClientEventSchema,

  open(ws) {
    console.log("ws open", ws.id);
  },

  message(ws, data) {
    handleMessage(ws, data);
  },

  close(ws) {
    handleClose(ws);
  },
});
