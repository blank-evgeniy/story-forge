import { useWebSocket } from "@siberiacancode/reactuse";

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
  const { status, open, send, close, client } = useWebSocket(
    "ws://localhost:3001/ws",
    {
      retry: 3,
      onConnected: (ws) => {
        const event = {
          type: "join_room",
          code: roomCode,
          username,
          playerId,
        };

        ws.send(JSON.stringify(event));
      },
      onMessage: (event) => {
        console.log(event);
      },
    },
  );

  return { status, send, close, open, client };
};
