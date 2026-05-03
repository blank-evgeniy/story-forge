import { t } from "elysia";
import { Static } from "elysia";

export const ClientEventSchema = t.Union([
  t.Object({
    type: t.Literal("join_room"),
    code: t.String(),
    username: t.String({ minLength: 2, maxLength: 20 }),
    playerId: t.String(),
  }),
  t.Object({
    type: t.Literal("submit_sentence"),
    content: t.String({ minLength: 1, maxLength: 200 }),
  }),
  t.Object({ type: t.Literal("start_game") }),
  t.Object({ type: t.Literal("request_state") }),
]);

export type ClientEvent = Static<typeof ClientEventSchema>;
