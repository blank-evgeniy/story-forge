import { AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

import { gameRoute } from "@/app/routes/routes";
import { usePlayerStore } from "@/entities/player";

import { useRoomSocket } from "./api/use-room-socket";
import { RoomActionsProvider } from "./model/context/room-actions-context";
import { SaveStoryProvider } from "./model/context/save-story-context";
import { useRoomStore } from "./model/store/use-room-store";
import { RevealTransitionOverlay } from "./ui/common/reveal-transition-overlay";
import { RoomError } from "./ui/common/room-error";
import { RoomLayout } from "./ui/common/room-layout";
import { RoomLoading } from "./ui/common/room-loading";
import { RoundTransitionOverlay } from "./ui/common/round-transition-overlay";
import { LobbyScreen } from "./ui/lobby-screen";
import { RevealScreen } from "./ui/reveal-screen";
import { WritingScreen } from "./ui/writing-screen";
import { useRoomDocumentTitle } from "./utils/use-room-document-title";

export function RoomViewConnector() {
  const { t } = useTranslation();
  const { roomCode } = gameRoute.useParams();

  const player = usePlayerStore((store) => store.player);

  const status = useRoomStore((store) => store.status);
  const round = useRoomStore((store) => store.round);

  const roomSocket = useRoomSocket({
    player,
    roomCode,
  });

  useRoomDocumentTitle(status, round);

  if (roomSocket.status === "connecting")
    return <RoomLoading title={t("room.common.connection.connecting")} />;
  if (roomSocket.status === "disconnected")
    return <RoomError title={t("room.common.connection.lost")} />;
  if (roomSocket.status === "failed")
    return <RoomError title={t("room.common.connection.failed")} />;

  return (
    <RoomLayout>
      <RoomActionsProvider client={roomSocket.client}>
        {status === "lobby" && <LobbyScreen roomCode={roomCode} />}
        {status === "writing" && <WritingScreen />}
        {status === "reveal" && (
          <SaveStoryProvider roomCode={roomCode}>
            <RevealScreen />
          </SaveStoryProvider>
        )}

        <AnimatePresence>
          {status === "round_starting" && <RoundTransitionOverlay />}
          {status === "revealing" && <RevealTransitionOverlay />}
        </AnimatePresence>
      </RoomActionsProvider>
    </RoomLayout>
  );
}
