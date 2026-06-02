import { createContext, type ReactNode, useContext, useMemo } from "react";

import type { ClientEvent } from "@/api/ws/types";

type RoomActions = {
  startGame: () => void;
  submitEntry: (content: string, twistId?: string) => void;
  draftEntry: (content?: string, twistId?: string) => void;
  editEntry: () => void;
  restartGame: () => void;
};

const RoomActionsContext = createContext<RoomActions | null>(null);

type RoomActionsProviderProps = {
  client: WebSocket | null | undefined;
  children: ReactNode;
};

export function RoomActionsProvider({
  client,
  children,
}: RoomActionsProviderProps) {
  const actions = useMemo<RoomActions>(() => {
    const send = (event: ClientEvent) => {
      client?.send(JSON.stringify(event));
    };

    return {
      startGame: () => send({ type: "start_game" }),
      submitEntry: (content, twistId) =>
        send({ type: "submit_entry", content, twistId }),
      draftEntry: (content, twistId) =>
        send({ type: "draft_entry", content, twistId }),
      editEntry: () => send({ type: "edit_entry" }),
      restartGame: () => send({ type: "restart_game" }),
    };
  }, [client]);

  return (
    <RoomActionsContext.Provider value={actions}>
      {children}
    </RoomActionsContext.Provider>
  );
}

export function useRoomActions(): RoomActions {
  const ctx = useContext(RoomActionsContext);
  if (!ctx)
    throw new Error("useRoomActions must be used within RoomActionsProvider");
  return ctx;
}
