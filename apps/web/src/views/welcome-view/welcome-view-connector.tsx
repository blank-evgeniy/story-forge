import { useNavigate } from "@tanstack/react-router";
import i18n from "i18next";

import { usePlayerStore } from "@/entities/player";
import {
  defaultRoomSettings,
  mapRoomSettingsToConfigDto,
} from "@/entities/room";

import { useCreateRoom } from "./api/use-create-room";
import { CreateRoom } from "./ui/create-room";
import { JoinRoom } from "./ui/join-room";
import { ServerStatusConnector } from "./ui/server-status";
import { WelcomeView } from "./ui/welcome-view";

export function WelcomeViewConnector() {
  const playerId = usePlayerStore((store) => store.player?.id);
  const { mutate, isLoading } = useCreateRoom();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!playerId) return;

    mutate(
      {
        playerId,
        locale: i18n.language,
        config: mapRoomSettingsToConfigDto(defaultRoomSettings),
      },
      {
        onSuccess: (data) => {
          navigate({ to: "/room/$roomCode", params: { roomCode: data.code } });
        },
      },
    );
  };

  const handleJoinRoom = (roomCode: string) => {
    navigate({ to: "/room/$roomCode", params: { roomCode } });
  };

  return (
    <WelcomeView>
      <CreateRoom
        onCreate={handleCreateRoom}
        isLoading={isLoading}
        serverStatusSlot={<ServerStatusConnector />}
      />
      <JoinRoom onJoin={handleJoinRoom} />
    </WelcomeView>
  );
}
