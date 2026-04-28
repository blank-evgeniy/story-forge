import { Elysia } from "elysia";
import { roomsModule } from "./modules/rooms";
import { wsModule } from "./modules/ws";

const app = new Elysia().use(roomsModule).use(wsModule).listen(3001);

console.log(
  `🦊  Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
