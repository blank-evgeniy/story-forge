import { AnimatePresence } from "motion/react";

import { gameRoute } from "@/app/routes/routes";
import { useUserStore } from "@/store/user";

import { useRoomSocket } from "./api/use-room-socket";
import { RoomActionsProvider } from "./model/room-actions-context";
import { useRoomStore } from "./model/use-room-store";
import { RoomError } from "./ui/common/room-error";
import { RoomLoading } from "./ui/common/room-loading";
import { LobbyScreen } from "./ui/lobby-screen";
import { RevealScreen } from "./ui/reveal-screen";
import { RevealTransitionOverlay } from "./ui/reveal-transition-overlay";
import { RoundTransitionOverlay } from "./ui/round-transition-overlay";
import { WritingScreen } from "./ui/writing-screen";

export function RoomViewInner() {
  const { roomCode } = gameRoute.useParams();

  const user = useUserStore((store) => store.user);

  const { status: wsStatus, client } = useRoomSocket({
    roomCode,
    username: user?.username ?? "",
    playerId: user?.id ?? "",
  });

  const status = useRoomStore((store) => store.status);

  if (wsStatus === "connecting") return <RoomLoading title="Подключение..." />;
  if (wsStatus === "disconnected")
    return <RoomError title="Соединение потеряно" />;
  if (wsStatus === "failed")
    return <RoomError title="Не удалось подключиться" />;

  return (
    <RoomActionsProvider client={client}>
      {status === "lobby" && <LobbyScreen roomCode={roomCode} />}
      {status === "writing" && <WritingScreen />}
      {status === "reveal" && <RevealScreen roomCode={roomCode} />}

      <AnimatePresence>
        {status === "round_starting" && <RoundTransitionOverlay />}
        {status === "revealing" && <RevealTransitionOverlay />}
      </AnimatePresence>
    </RoomActionsProvider>
  );
}
