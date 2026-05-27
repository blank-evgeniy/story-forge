import { useQuery } from "@siberiacancode/reactuse";

import { getRoom } from "@/api/requests/get-room";

export const useGetRoom = (roomCode: string) =>
  useQuery(() => getRoom(roomCode));
