import Elysia from "elysia";

import { ClientEventSchema } from "../model/client-events";
import { handleClose, handleMessage } from "../services/ws";

export const wsModule = new Elysia().ws("/ws", {
  body: ClientEventSchema,

  close(ws) {
    console.log("ws close", ws.id);
    handleClose(ws);
  },

  message(ws, data) {
    handleMessage(ws, data);
  },

  open(ws) {
    console.log("ws open", ws.id);
  },
});
