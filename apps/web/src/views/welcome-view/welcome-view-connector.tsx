import { useNavigate } from "@tanstack/react-router";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { usePlayerStore } from "@/entities/player";
import {
  defaultRoomSettings,
  mapRoomSettingsToConfigDto,
} from "@/entities/room";

import { useCreateRoom } from "./api/use-create-room";
import { useGetRoom } from "./api/use-get-room";
import { CreateRoom } from "./ui/create-room";
import { JoinRoom } from "./ui/join-room";
import { ServerStatusConnector } from "./ui/server-status";
import { WelcomeView } from "./ui/welcome-view";

export function WelcomeViewConnector() {
  const { t } = useTranslation();

  const playerId = usePlayerStore((store) => store.player?.id);

  const createRoom = useCreateRoom();
  const getRoom = useGetRoom();

  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!playerId) return;

    createRoom.mutate(
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
    getRoom.mutate(
      { roomCode },
      {
        onSuccess: () => {
          navigate({ to: "/room/$roomCode", params: { roomCode } });
        },
        onError: () => {
          toast.error(t("room.common.errors.roomNotFound"));
        },
      },
    );
  };

  return (
    <WelcomeView>
      <CreateRoom
        onCreate={handleCreateRoom}
        isLoading={createRoom.isLoading}
        disabled={getRoom.isLoading}
        serverStatusSlot={<ServerStatusConnector />}
      />
      <JoinRoom
        onJoin={handleJoinRoom}
        isLoading={getRoom.isLoading}
        disabled={createRoom.isLoading}
      />
    </WelcomeView>
  );
}
