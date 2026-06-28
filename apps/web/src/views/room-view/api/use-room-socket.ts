import { useWebSocket } from "@siberiacancode/reactuse";
import { useEffect } from "react";

import type { Player } from "@/entities/player";
import type { ClientEvent } from "@/shared/api/ws/types";

import { env } from "@/shared/lib/config/env";

import { useRoomStore } from "../model/store/use-room-store";

export type UseRoomSocketOptions = {
  player: Player | null;
  roomCode: string;
};

export const useRoomSocket = ({ player, roomCode }: UseRoomSocketOptions) => {
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
        if (!player) return;

        const event: ClientEvent = {
          type: "join_room",
          code: roomCode,
          username: player.username,
          color: player.color,
          icon: player.icon,
          playerId: player.id,
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
