import { useMutation } from "@siberiacancode/reactuse";

import type { CreateRoomDTO } from "@/shared/api/requests/types";

import { createRoom } from "@/shared/api/requests/create-room";

export const useCreateRoom = () =>
  useMutation((data: CreateRoomDTO) => createRoom(data));
