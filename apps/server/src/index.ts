import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { roomsModule } from "./modules/rooms";
import { wsModule } from "./modules/ws";

const isProd = process.env.NODE_ENV === "production";

const app = new Elysia()
  .use(
    cors({
      origin: isProd ? "https://story-forge-web-omega.vercel.app" : true,
    }),
  )
  .use(roomsModule)
  .use(wsModule)
  .listen(3001);

console.log(
  `🦊  Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
