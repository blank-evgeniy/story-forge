import { gameRoute } from "@/app/routes/routes";

import { RoomView } from "./ui/room-view";
import { useRoomSocket } from "./api/use-room-socket";
import { useUserStore } from "@/store/user";

export function RoomViewConnector() {
  const { roomCode } = gameRoute.useParams();
  const user = useUserStore((store) => store.user);

  const { status: wsStatus } = useRoomSocket({
    roomCode,
    username: user?.username ?? "",
    playerId: user?.id ?? "",
  });

  if (wsStatus === "connecting") return <div>Подключение...</div>;
  if (wsStatus === "disconnected") return <div>Соединение потеряно</div>;
  if (wsStatus === "failed") return <div>Не удалось подключиться</div>;

  return <RoomView />;
}
