import { createContext, type ReactNode, useContext, useMemo } from "react";

import type { ClientEvent } from "@/api/ws/types";

type RoomActions = {
  startGame: () => void;
  submitSentence: (content: string, twistId?: string) => void;
  draftSentence: (content?: string, twistId?: string) => void;
  editSentence: () => void;
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
      submitSentence: (content, twistId) =>
        send({ type: "submit_sentence", content, twistId }),
      draftSentence: (content, twistId) =>
        send({ type: "draft_sentence", content, twistId }),
      editSentence: () => send({ type: "edit_sentence" }),
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
