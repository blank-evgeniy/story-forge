import { z } from "zod";

export const ClientEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("join_room"),
    code: z.string(),
    username: z.string().min(1).max(50),
    playerId: z.string(),
  }),

  z.object({
    type: z.literal("submit_sentence"),
    content: z.string().min(1).max(200),
    twistId: z.string().optional(),
  }),

  z.object({
    type: z.literal("draft_sentence"),
    content: z.string().min(1).max(200).optional(),
    twistId: z.string().optional(),
  }),

  z.object({
    type: z.literal("edit_sentence"),
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
