import { createRoom } from "@/api/requests/create-room";
import type { CreateRoomDTO } from "@/api/requests/types";
import { useMutation } from "@siberiacancode/reactuse";

export const useCreateRoom = () =>
  useMutation((data: CreateRoomDTO) => createRoom(data));
