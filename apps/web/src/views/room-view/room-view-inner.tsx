import { AnimatePresence } from "motion/react";

import { gameRoute } from "@/app/routes/routes";
import { useUserStore } from "@/store/user";

import { useRoomSocket } from "./api/use-room-socket";
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
  const startGame = useRoomStore((store) => store.startGame);
  const submitSentence = useRoomStore((store) => store.submitSentence);
  const draftSentence = useRoomStore((store) => store.draftSentence);
  const editSentence = useRoomStore((store) => store.editSentence);
  const restartGame = useRoomStore((store) => store.restartGame);

  const handleStart = () => {
    if (!client) return;
    startGame(client);
  };

  const handleSubmitSentence = (content: string, twistId?: string) => {
    if (!client) return;
    submitSentence(client, content, twistId);
  };

  const handleDraftSentence = (content?: string, twistId?: string) => {
    if (!client) return;
    draftSentence(client, content, twistId);
  };

  const handleEdit = () => {
    if (!client) return;
    editSentence(client);
  };

  const handlePlayMore = () => {
    if (!client) return;
    restartGame(client);
  };

  if (wsStatus === "connecting") return <RoomLoading title="Подключение..." />;
  if (wsStatus === "disconnected")
    return <RoomError title="Соединение потеряно" />;
  if (wsStatus === "failed")
    return <RoomError title="Не удалось подключиться" />;

  return (
    <>
      {status === "lobby" && (
        <LobbyScreen onStartGame={handleStart} roomCode={roomCode} />
      )}
      {status === "writing" && (
        <WritingScreen
          onSubmit={handleSubmitSentence}
          onDraft={handleDraftSentence}
          onEdit={handleEdit}
        />
      )}
      {status === "reveal" && <RevealScreen onPlayMore={handlePlayMore} />}

      <AnimatePresence>
        {status === "round_starting" && <RoundTransitionOverlay />}
        {status === "revealing" && <RevealTransitionOverlay />}
      </AnimatePresence>
    </>
  );
}
