import { useNavigate, useSearch } from "@tanstack/react-router";
import i18n from "i18next";
import { useEffect } from "react";

import { usePlayerStore } from "@/entities/player";
import { mapRoomSettingsToConfigDto, type RoomSettings } from "@/entities/room";

import { useCreateRoom } from "./api/use-create-room";
import { CreateRoom } from "./ui/create-room";
import { JoinRoom } from "./ui/join-room";
import { ServerStatusConnector } from "./ui/server-status";
import { WelcomeView } from "./ui/welcome-view";

export function WelcomeViewConnector() {
  const playerId = usePlayerStore((store) => store.player?.id);
  const { mutate, isLoading } = useCreateRoom();
  const navigate = useNavigate();
  const { tab } = useSearch({ from: "/app-layout/guarded/welcome" });

  useEffect(() => {
    if (tab) navigate({ to: "/", search: { tab: undefined }, replace: true });
  }, [tab, navigate]);

  const handleCreateRoom = (data: RoomSettings) => {
    if (!playerId) return;

    mutate(
      {
        playerId,
        locale: i18n.language,
        config: mapRoomSettingsToConfigDto(data),
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
    <WelcomeView
      createRoomSlot={
        <CreateRoom
          onCreate={handleCreateRoom}
          isLoading={isLoading}
          serverStatusSlot={<ServerStatusConnector />}
        />
      }
      joinRoomSlot={<JoinRoom onJoin={handleJoinRoom} />}
      defaultTab={tab}
    />
  );
}
