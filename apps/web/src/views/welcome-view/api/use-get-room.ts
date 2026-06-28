import { useMutation } from "@siberiacancode/reactuse";

import { getRoom } from "@/shared/api/requests/get-room";

export const useGetRoom = () =>
  useMutation((data: { roomCode: string }) => getRoom(data.roomCode));
