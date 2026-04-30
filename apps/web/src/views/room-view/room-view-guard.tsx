import { gameRoute } from "@/app/routes/routes";
import { Spinner } from "@/components/ui/spinner";
import type { ReactNode } from "react";
import { useGetRoom } from "./api/use-get-room";

export function RoomViewGuard({ children }: { children: ReactNode }) {
  const { roomCode } = gameRoute.useParams();
  const { data, isLoading } = useGetRoom(roomCode);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!data) return null;

  if (data.status !== "lobby") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-lg">Игра уже началась</p>
      </div>
    );
  }

  return children;
}
