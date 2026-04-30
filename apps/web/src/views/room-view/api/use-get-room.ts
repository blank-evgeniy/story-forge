import { getRoom } from "@/api/requests/get-room";
import { useQuery } from "@siberiacancode/reactuse";

export const useGetRoom = (roomCode: string) =>
  useQuery(() => getRoom(roomCode));
