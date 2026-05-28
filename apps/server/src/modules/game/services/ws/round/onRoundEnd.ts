import { ROUND_TRANSITION_DELAY_MS } from "../../../model/consts";
import { RoomState } from "../../../model/state";
import { generateCommentary } from "../../ai";
import { roomManager } from "../../rooms";
import { onRoundStart } from "./onRoundStart";

export function onRoundEnd(room: RoomState) {
  room.submitted = new Set();
  room.drafts = new Map();

  if (room.round === room.totalRounds) {
    room.status = "reveal";
    roomManager.broadcast(room, {
      stories: room.stories,
      type: "all_revealed",
    });

    generateCommentary(room).then((result) => {
      if (result.success) {
        roomManager.broadcast(room, {
          comment: result.text,
          type: "ai_comment",
        });
      } else {
        roomManager.broadcast(room, {
          code: "AI_FAILED",
          message: result.text,
          type: "error",
        });
      }
    });

    return;
  }

  room.round++;

  roomManager.broadcast(room, {
    nextRound: room.round,
    type: "round_ended",
  });

  setTimeout(() => onRoundStart(room), ROUND_TRANSITION_DELAY_MS);
}
