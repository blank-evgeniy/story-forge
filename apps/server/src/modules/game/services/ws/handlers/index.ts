import { ElysiaWS } from "elysia/dist/ws";

import { ClientEvent } from "../../../model/client-events";
import { onClose } from "./onClose";
import { onDraftSentence } from "./onDraftSentence";
import { onEditSentence } from "./onEditSentence";
import { onJoinRoom } from "./onJoinRoom";
import { onRequestState } from "./onRequestState";
import { onRestartGame } from "./onRestartGame";
import { onStartGame } from "./onStartGame";
import { onSubmitSentence } from "./onSubmitSentence";

export function handleClose(ws: ElysiaWS) {
  onClose(ws);
}

export function handleMessage(ws: ElysiaWS, event: ClientEvent) {
  switch (event.type) {
    case "draft_sentence":
      return onDraftSentence(ws, event);
    case "edit_sentence":
      return onEditSentence(ws);
    case "join_room":
      return onJoinRoom(ws, event);
    case "request_state":
      return onRequestState(ws);
    case "restart_game":
      return onRestartGame(ws);
    case "start_game":
      return onStartGame(ws);
    case "submit_sentence":
      return onSubmitSentence(ws, event);
  }
}
