import Elysia from "elysia";

import { ClientEventSchema } from "../model/client-events";
import { handleClose, handleMessage, wsLimiter } from "../services/ws";

export const wsModule = new Elysia().ws("/ws", {
  body: ClientEventSchema,

  close(ws) {
    console.log("ws close", ws.id);
    wsLimiter.delete(ws.id);
    handleClose(ws);
  },

  message(ws, data) {
    const id = ws.id;

    if (!wsLimiter.allow(id)) {
      ws.send(
        JSON.stringify({
          code: "RATE_LIMIT",
          message: "Слишком много запросов",
          type: "error",
        }),
      );
      return;
    }

    handleMessage(ws, data);
  },

  open(ws) {
    console.log("ws open", ws.id);
  },
});
