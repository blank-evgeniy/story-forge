import Elysia from "elysia";
import { ClientEventSchema } from "../model/client-events";
import { handleClose, handleMessage } from "../game/handlers";

export const wsModule = new Elysia()
  .state("playerId", null as string | null)
  .state("roomCode", null as string | null)
  .ws("/ws", {
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

export type WsInstance = typeof wsModule;
