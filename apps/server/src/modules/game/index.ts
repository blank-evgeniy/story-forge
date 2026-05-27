import Elysia from "elysia";

import { roomsModule } from "./controllers/rooms";
import { wsModule } from "./controllers/ws";

export const gameModule = new Elysia().use(roomsModule).use(wsModule);
