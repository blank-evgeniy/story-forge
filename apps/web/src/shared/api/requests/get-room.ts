import type { GetRoomDto } from "./types";

import { client } from "../client";

export async function getRoom(roomCode: string) {
  const res = await client<GetRoomDto>(`/rooms/${roomCode}`);

  return res;
}
