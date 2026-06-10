import { RoomState } from "../../../model/state";
import { generateCommentary } from "../../ai";
import { roomManager } from "../../rooms";

export function onGameEnd(room: RoomState) {
  room.status = "reveal";
  roomManager.broadcast(room, {
    stories: room.stories,
    type: "all_revealed",
  });

  if (!room.config.aiComment.enable) return;

  room.aiComment = {
    status: "loading",
  };
  roomManager.broadcast(room, {
    type: "ai_comment_started",
  });

  generateCommentary(room).then((result) => {
    if (result.success) {
      room.aiComment = {
        content: result.text,
        status: "success",
      };
      roomManager.broadcast(room, {
        comment: result.text,
        type: "ai_comment",
      });
    } else {
      room.aiComment = {
        status: "error",
      };
      roomManager.broadcast(room, {
        code: "AI_FAILED",
        message: result.text,
        type: "error",
      });
    }
  });
}
