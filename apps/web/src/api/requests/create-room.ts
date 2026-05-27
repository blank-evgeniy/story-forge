import type { CreateRoomDTO, CreateRoomResponseDTO } from "./types";

import { client } from "../client";

export async function createRoom(body: CreateRoomDTO) {
  const res = await client<CreateRoomResponseDTO>("/rooms", {
    method: "POST",
    body,
  });

  return res;
}
