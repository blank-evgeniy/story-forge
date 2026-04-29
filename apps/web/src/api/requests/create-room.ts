import { client } from "../client";
import type { CreateRoomResponseDTO, CreateRoomDTO } from "./types";

export async function createRoom(body: CreateRoomDTO) {
  const res = await client<CreateRoomResponseDTO>("/rooms", {
    method: "POST",
    body,
  });

  return res;
}
