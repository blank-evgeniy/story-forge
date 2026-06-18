import Elysia, { NotFoundError } from "elysia";
import z from "zod";

import { roomConfigSchema } from "../model/schemas";
import { roomManager } from "../services/rooms";

export const roomsModule = new Elysia({ prefix: "/rooms" })
  .post(
    "/",
    ({ body }) => {
      const code = roomManager.create(body.playerId, body.config, body.locale);
      return { code };
    },
    {
      body: z.object({
        config: roomConfigSchema,
        locale: z
          .string()
          .optional()
          .transform((val): "en" | "ru" =>
            val?.toLowerCase().startsWith("ru") ? "ru" : "en",
          ),
        playerId: z.string(),
      }),
    },
  )

  .get("/:code", ({ params }) => {
    const room = roomManager.get(params.code);
    if (!room) throw new NotFoundError("Not found");
    return { code: room.code, status: room.status };
  });
