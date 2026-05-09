import Elysia from "elysia";
import { ClientEventSchema } from "../model/client-events";
import { handleClose, handleMessage } from "../game/handlers";

export const wsModule = new Elysia().ws("/ws", {
  body: ClientEventSchema,

  open(ws) {
    console.log("ws open", ws.id);
  },

  message(ws, data) {
    handleMessage(ws, data);
  },

  close(ws) {
    console.log("ws close", ws.id);
    handleClose(ws);
  },
});
