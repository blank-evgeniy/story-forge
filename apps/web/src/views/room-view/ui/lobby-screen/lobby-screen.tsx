import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { GameRules } from "./ui/game-rules";
import { LobbyQrCode } from "./ui/lobby-qr-code";
import { LobbyScreenLayout } from "./ui/lobby-screen-layout";
import { PlayerList } from "./ui/player-list";
import { PlayerListCounter } from "./ui/player-list-counter";
import { RoomCodeViewer } from "./ui/room-code-viewer";
import { StartGameAction } from "./ui/start-game-action";

type LobbyScreenProps = {
  roomCode: string;
};

export function LobbyScreen({ roomCode }: LobbyScreenProps) {
  const players = useRoomStore((store) => store.players);
  const isHost = useRoomStore((store) => store.isHost);

  const actions = useRoomActions();

  return (
    <LobbyScreenLayout>
      <LobbyScreenLayout.PlayersSidebar
        headerSlot={<PlayerListCounter count={players.length} />}
      >
        <PlayerList players={players} />
      </LobbyScreenLayout.PlayersSidebar>

      <LobbyScreenLayout.MainSection>
        <LobbyScreenLayout.MainSectionBody
          rulesSlot={<GameRules />}
          qrSlot={<LobbyQrCode />}
          codeSlot={<RoomCodeViewer roomCode={roomCode} />}
        />
        <LobbyScreenLayout.MainSectionFooter>
          <StartGameAction
            isHost={isHost}
            onStartGame={actions.startGame}
            disabled={players.length < 2}
          />
        </LobbyScreenLayout.MainSectionFooter>
      </LobbyScreenLayout.MainSection>
    </LobbyScreenLayout>
  );
}
