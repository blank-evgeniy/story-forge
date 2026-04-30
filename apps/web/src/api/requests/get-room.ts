import { client } from "../client";
import type { GetRoomDto } from "./types";

export async function getRoom(roomCode: string) {
  const res = await client<GetRoomDto>(`/rooms/${roomCode}`);

  return res;
}
