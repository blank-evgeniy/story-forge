import { create } from "zustand";

import type { Player } from "@/entities/player";
import type { ClientEvent, ServerEvent } from "@/shared/api/ws/types";

import { env } from "@/shared/lib/config/env";

import { useRoomStore } from "../model/store/use-room-store";

export type SocketStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export const MAX_RECONNECT_ATTEMPTS = 5;
const BASE_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 15000;

type ConnectParams = {
  roomCode: string;
  player: Player;
};

type RoomSocketState = {
  status: SocketStatus;
  reconnectAttempt: number;
  connect: (params: ConnectParams) => void;
  disconnect: () => void;
  reconnect: () => void;
  send: (event: ClientEvent) => void;
};

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let teardownTimer: ReturnType<typeof setTimeout> | null = null;
let params: ConnectParams | null = null;
let intentionalClose = false;

const clearReconnectTimer = () => {
  if (reconnectTimer !== null) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

const isSocketAlive = () =>
  socket !== null &&
  (socket.readyState === WebSocket.OPEN ||
    socket.readyState === WebSocket.CONNECTING);

export const useRoomSocketStore = create<RoomSocketState>((set, get) => {
  const scheduleReconnect = () => {
    const attempt = get().reconnectAttempt;

    if (attempt >= MAX_RECONNECT_ATTEMPTS) {
      set({ status: "disconnected" });
      return;
    }

    const delay = Math.min(
      BASE_RECONNECT_DELAY * 2 ** attempt,
      MAX_RECONNECT_DELAY,
    );

    set({ status: "reconnecting", reconnectAttempt: attempt + 1 });
    reconnectTimer = setTimeout(openSocket, delay);
  };

  function openSocket() {
    clearReconnectTimer();
    intentionalClose = false;

    const ws = new WebSocket(env.VITE_WS_BASE_URL);
    socket = ws;

    ws.onopen = () => {
      set({ status: "connected", reconnectAttempt: 0 });

      const current = params;
      if (!current?.player) return;

      const event: ClientEvent = {
        type: "join_room",
        code: current.roomCode,
        username: current.player.username,
        color: current.player.color,
        icon: current.player.icon,
        playerId: current.player.id,
      };
      ws.send(JSON.stringify(event));
    };

    ws.onmessage = (event) => {
      try {
        const serverEvent = JSON.parse(event.data) as ServerEvent;
        useRoomStore.getState().handleEvent(serverEvent);
      } catch (error) {
        console.error("ws message parse error", error);
      }
    };

    ws.onerror = (event) => {
      console.error("ws error", event);
    };

    ws.onclose = () => {
      if (socket !== ws) return;
      socket = null;

      if (intentionalClose) return;

      scheduleReconnect();
    };
  }

  return {
    status: "connecting",
    reconnectAttempt: 0,

    connect: (nextParams) => {
      if (teardownTimer !== null) {
        clearTimeout(teardownTimer);
        teardownTimer = null;
      }

      params = nextParams;

      if (isSocketAlive()) return;

      set({ status: "connecting", reconnectAttempt: 0 });
      openSocket();
    },

    disconnect: () => {
      teardownTimer = setTimeout(() => {
        teardownTimer = null;
        intentionalClose = true;
        clearReconnectTimer();
        socket?.close();
        socket = null;
        params = null;
        set({ status: "connecting", reconnectAttempt: 0 });
      }, 0);
    },

    reconnect: () => {
      clearReconnectTimer();
      set({ status: "connecting", reconnectAttempt: 0 });
      openSocket();
    },

    send: (event) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(event));
      }
    },
  };
});
