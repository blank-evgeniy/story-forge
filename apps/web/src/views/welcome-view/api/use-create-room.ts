import { useMutation } from "@siberiacancode/reactuse";

import type { CreateRoomDTO } from "@/api/requests/types";

import { createRoom } from "@/api/requests/create-room";

export const useCreateRoom = () =>
  useMutation((data: CreateRoomDTO) => createRoom(data));
