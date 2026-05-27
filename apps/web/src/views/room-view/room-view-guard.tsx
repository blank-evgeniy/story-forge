import type { ReactNode } from "react";

import { gameRoute } from "@/app/routes/routes";

import { useGetRoom } from "./api/use-get-room";
import { RoomError } from "./ui/common/room-error";
import { RoomLoading } from "./ui/common/room-loading";

export function RoomViewGuard({ children }: { children: ReactNode }) {
  const { roomCode } = gameRoute.useParams();
  const { data, isLoading } = useGetRoom(roomCode);

  if (isLoading) return <RoomLoading />;

  if (!data) return <RoomError title="Комната не найдена" />;

  return children;
}
