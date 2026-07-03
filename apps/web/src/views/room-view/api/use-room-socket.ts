import { useEffect } from "react";

import type { Player } from "@/entities/player";

import { useRoomStore } from "../model/store/use-room-store";
import { useRoomSocketStore } from "./use-room-socket-store";

export type UseRoomSocketOptions = {
  player: Player | null;
  roomCode: string;
};

export const useRoomSocket = ({ player, roomCode }: UseRoomSocketOptions) => {
  const connect = useRoomSocketStore((store) => store.connect);
  const disconnect = useRoomSocketStore((store) => store.disconnect);
  const resetRoom = useRoomStore((store) => store.reset);

  useEffect(() => {
    if (!player) return;

    resetRoom();
    connect({ roomCode, player });

    return () => {
      disconnect();
      resetRoom();
    };
  }, [roomCode, player, connect, disconnect, resetRoom]);
};
