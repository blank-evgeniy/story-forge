import { gameRoute } from "@/app/routes/routes";

import { useRoomSocket } from "./api/use-room-socket";
import { useUserStore } from "@/store/user";
import { useRoomStore } from "./model/use-room-store";
import { LobbyScreen } from "./ui/lobby-screen";

export function RoomViewConnector() {
  const { roomCode } = gameRoute.useParams();
  const user = useUserStore((store) => store.user);

  const { status: wsStatus, client } = useRoomSocket({
    roomCode,
    username: user?.username ?? "",
    playerId: user?.id ?? "",
  });

  const status = useRoomStore((store) => store.status);
  const startGame = useRoomStore((store) => store.startGame);

  console.log(status, wsStatus);

  const handleStart = () => {
    if (!client) return;
    startGame(client);
  };

  if (wsStatus === "connecting") return <div>Подключение...</div>;
  if (wsStatus === "disconnected") return <div>Соединение потеряно</div>;
  if (wsStatus === "failed") return <div>Не удалось подключиться</div>;

  return <>{status === "lobby" && <LobbyScreen onStartGame={handleStart} />}</>;
}
