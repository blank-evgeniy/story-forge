import Elysia, { t } from "elysia";
import { roomManager } from "../game/room-manager";

export const roomsModule = new Elysia({ prefix: "/rooms" })
  .post(
    "/",
    ({ body }) => {
      const code = roomManager.create(body.playerId, {
        blindMode: body.blindMode,
        secondsPerTurn: body.secondsPerTurn,
        enableTwists: body.enabledTwists,
      });
      return { code };
    },
    {
      body: t.Object({
        playerId: t.String(),
        secondsPerTurn: t.Number(),
        blindMode: t.Boolean(),
        enabledTwists: t.Boolean(),
      }),
    },
  )

  .get("/:code", ({ params }) => {
    const room = roomManager.get(params.code);
    if (!room) throw new Error("Not found");
    return { code: room.code, status: room.status };
  });
