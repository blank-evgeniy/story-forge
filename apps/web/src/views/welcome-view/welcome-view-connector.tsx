import { useUserStore } from "@/store/user";
import { useCreateRoom } from "./api/use-create-room";
import type { CreateRoomSchema } from "./model/types";
import { CreateRoom } from "./ui/create-room";
import { WelcomeView } from "./ui/welcome-view";
import { useNavigate } from "@tanstack/react-router";
import { JoinRoom } from "./ui/join-room";
import { ServerHealthCheck } from "./ui/server-health-check";

export function WelcomeViewConnector() {
  const playerId = useUserStore((store) => store.user?.id);
  const { mutate, isLoading } = useCreateRoom();
  const navigate = useNavigate();

  const handleCreateRoom = (data: CreateRoomSchema) => {
    if (!playerId) return;

    mutate(
      {
        playerId,
        config: {
          secondsPerTurn: Number(data.roundTime),
          blindMode: data.blindMode,
          enableTwists: data.enableTwists,
        },
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
        <CreateRoom onCreate={handleCreateRoom} isLoading={isLoading} />
      }
      joinRoomSlot={<JoinRoom onJoin={handleJoinRoom} />}
    >
      <ServerHealthCheck />
    </WelcomeView>
  );
}
