import { useRoomActions } from "../../model/context/room-actions-context";
import { useRoomStore } from "../../model/store/use-room-store";
import { EditSettingsAction } from "./ui/edit-settings-action/edit-settings-action";
import { LobbyScreenLayout } from "./ui/lobby-screen-layout";
import { PlayerList } from "./ui/player-list";
import { PlayerListCounter } from "./ui/player-list-counter";
import { RoomJoinPanel } from "./ui/room-join-panel";
import { RoomSettingsViewer } from "./ui/room-settings-viewer";
import { StartGameAction } from "./ui/start-game-action";

type LobbyScreenProps = {
  roomCode: string;
};

export function LobbyScreen({ roomCode }: LobbyScreenProps) {
  const settings = useRoomStore((store) => store.settings);
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
          settingsSlot={
            <RoomSettingsViewer
              data={settings}
              editActionSlot={
                <EditSettingsAction
                  isHost={isHost}
                  currentSettings={settings}
                  onEdit={actions.editRoomSettings}
                />
              }
            />
          }
          joinSlot={<RoomJoinPanel roomCode={roomCode} />}
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
