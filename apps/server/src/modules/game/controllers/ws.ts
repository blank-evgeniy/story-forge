import Elysia from "elysia";
import { ClientEventSchema } from "../model/client-events";
import { handleMessage, handleClose } from "../services/ws";

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
