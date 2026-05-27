import Elysia, { NotFoundError } from "elysia";
import { roomManager } from "../services/rooms";
import z from "zod";

export const roomsModule = new Elysia({ prefix: "/rooms" })
  .post(
    "/",
    ({ body }) => {
      const code = roomManager.create(body.playerId, body.config);
      return { code };
    },
    {
      body: z.object({
        playerId: z.string(),
        config: z.object({
          secondsPerTurn: z.number().min(10).max(120),
          blindMode: z.boolean(),
          enableTwists: z.boolean(),
        }),
      }),
    },
  )

  .get("/:code", ({ params }) => {
    const room = roomManager.get(params.code);
    if (!room) throw new NotFoundError("Not found");
    return { code: room.code, status: room.status };
  });
