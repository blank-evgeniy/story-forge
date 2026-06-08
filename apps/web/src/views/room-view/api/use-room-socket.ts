import { useWebSocket } from "@siberiacancode/reactuse";
import { useEffect } from "react";

import type {
  ClientEvent,
  PlayerColorDto,
  PlayerIconDto,
} from "@/api/ws/types";

import { env } from "@/lib/config/env";

import { useRoomStore } from "../model/use-room-store";

export type UseRoomSocketOptions = {
  color: PlayerColorDto;
  icon: PlayerIconDto;
  playerId: string;
  roomCode: string;
  username: string;
};

export const useRoomSocket = ({
  color,
  icon,
  playerId,
  roomCode,
  username,
}: UseRoomSocketOptions) => {
  const handleEvent = useRoomStore((store) => store.handleEvent);
  const resetStore = useRoomStore((store) => store.reset);

  useEffect(() => {
    resetStore();
    return () => resetStore();
  }, [resetStore, roomCode]);

  const { status, open, send, close, client } = useWebSocket(
    env.VITE_WS_BASE_URL,
    {
      onConnected: (ws) => {
        const event: ClientEvent = {
          type: "join_room",
          code: roomCode,
          color,
          icon,
          playerId,
          username,
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
