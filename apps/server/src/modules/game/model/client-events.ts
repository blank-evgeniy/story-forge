import { z } from "zod";

import { roomConfigSchema } from "./schemas";

export const ClientEventSchema = z.discriminatedUnion("type", [
  z.object({
    code: z.string(),
    color: z.string(),
    icon: z.string(),
    playerId: z.string(),
    type: z.literal("join_room"),
    username: z.string().min(1).max(50),
  }),

  z.object({
    config: roomConfigSchema,
    type: z.literal("edit_config"),
  }),

  z.object({
    content: z.string().min(1).max(200),
    twistId: z.string().optional(),
    type: z.literal("submit_entry"),
  }),

  z.object({
    content: z.string().min(1).max(200).optional(),
    twistId: z.string().optional(),
    type: z.literal("draft_entry"),
  }),

  z.object({
    type: z.literal("edit_entry"),
  }),

  z.object({
    type: z.literal("start_game"),
  }),

  z.object({
    type: z.literal("restart_game"),
  }),

  z.object({
    type: z.literal("request_state"),
  }),
]);

export type ClientEvent = z.infer<typeof ClientEventSchema>;
