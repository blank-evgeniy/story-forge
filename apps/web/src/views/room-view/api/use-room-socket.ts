import type { ClientEvent } from "@/api/ws/types";
import { useWebSocket } from "@siberiacancode/reactuse";
import { useRoomStore } from "../model/use-room-store";

export type UseRoomSocketOptions = {
  roomCode: string;
  username: string;
  playerId: string;
};

export const useRoomSocket = ({
  roomCode,
  username,
  playerId,
}: UseRoomSocketOptions) => {
  const handleEvent = useRoomStore((store) => store.handleEvent);

  const { status, open, send, close, client } = useWebSocket(
    "ws://localhost:3001/ws",
    {
      retry: 3,
      onConnected: (ws) => {
        const event: ClientEvent = {
          type: "join_room",
          code: roomCode,
          username,
          playerId,
        };

        ws.send(JSON.stringify(event));
      },
      onMessage: (event) => {
        const serverEvent = JSON.parse(event.data);
        handleEvent(serverEvent);
      },
      onError: (event) => {
        console.error("ws error", event);
      },
    },
  );

  return { status, send, close, open, client };
};
