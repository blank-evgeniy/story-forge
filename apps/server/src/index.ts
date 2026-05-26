import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { healthModule } from "./modules/health";
import { gameModule } from "./modules/game";
import { storiesModule } from "./modules/stories";

const isProd = process.env.NODE_ENV === "production";

const app = new Elysia()
  .use(
    cors({
      origin: isProd ? "https://story-forge-web-omega.vercel.app" : true,
    }),
  )
  .use(openapi())
  .use(storiesModule)
  .use(healthModule)
  .use(gameModule)
  .listen(3000);

console.log(
  `🦊  Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
