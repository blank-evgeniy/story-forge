import Elysia from "elysia";

export const healthModule = new Elysia({ prefix: "/health" }).get("/", () => {
  return { ok: true };
});
