import { ElysiaWS } from "elysia/dist/ws";

import { ClientEvent } from "../../../model/client-events";
import { onClose } from "./onClose";
import { onDraftEntry } from "./onDraftEntry";
import { onEditEntry } from "./onEditEntry";
import { onJoinRoom } from "./onJoinRoom";
import { onRequestState } from "./onRequestState";
import { onRestartGame } from "./onRestartGame";
import { onStartGame } from "./onStartGame";
import { onSubmitEntry } from "./onSubmitEntry";

export function handleClose(ws: ElysiaWS) {
  onClose(ws);
}

export function handleMessage(ws: ElysiaWS, event: ClientEvent) {
  switch (event.type) {
    case "draft_entry":
      return onDraftEntry(ws, event);
    case "edit_entry":
      return onEditEntry(ws);
    case "join_room":
      return onJoinRoom(ws, event);
    case "request_state":
      return onRequestState(ws);
    case "restart_game":
      return onRestartGame(ws);
    case "start_game":
      return onStartGame(ws);
    case "submit_entry":
      return onSubmitEntry(ws, event);
  }
}
