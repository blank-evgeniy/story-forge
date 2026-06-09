import { AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

import { gameRoute } from "@/app/routes/routes";
import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
} from "@/shared/consts/player-customization";
import { useUserStore } from "@/store/user";

import { useRoomSocket } from "./api/use-room-socket";
import { RoomActionsProvider } from "./model/context/room-actions-context";
import { SaveStoryProvider } from "./model/context/save-story-context";
import { useRoomStore } from "./model/store/use-room-store";
import { RevealTransitionOverlay } from "./ui/common/reveal-transition-overlay";
import { RoomError } from "./ui/common/room-error";
import { RoomLoading } from "./ui/common/room-loading";
import { RoundTransitionOverlay } from "./ui/common/round-transition-overlay";
import { LobbyScreen } from "./ui/lobby-screen";
import { RevealScreen } from "./ui/reveal-screen";
import { WritingScreen } from "./ui/writing-screen";
import { useRoomDocumentTitle } from "./utils/use-room-document-title";

export function RoomViewFlow() {
  const { t } = useTranslation();
  const { roomCode } = gameRoute.useParams();

  const user = useUserStore((store) => store.user);

  const { status: wsStatus, client } = useRoomSocket({
    color: user?.color ?? DEFAULT_PLAYER_COLOR,
    icon: user?.icon ?? DEFAULT_PLAYER_ICON,
    playerId: user?.id ?? "",
    roomCode,
    username: user?.username ?? "",
  });

  const status = useRoomStore((store) => store.status);
  const round = useRoomStore((store) => store.round);

  useRoomDocumentTitle(status, round);

  if (wsStatus === "connecting")
    return <RoomLoading title={t("connection.connecting")} />;
  if (wsStatus === "disconnected")
    return <RoomError title={t("connection.lost")} />;
  if (wsStatus === "failed")
    return <RoomError title={t("connection.failed")} />;

  return (
    <RoomActionsProvider client={client}>
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
  );
}
