import { createContext, type ReactNode, useContext, useMemo } from "react";

import type { RoomSettings } from "../types";

import { useRoomSocketStore } from "../../api/use-room-socket-store";
import { mapRoomSettingsToConfigDto } from "../map";

type RoomActions = {
  startGame: () => void;
  submitEntry: (content: string, twistId?: string) => void;
  draftEntry: (content?: string, twistId?: string) => void;
  editRoomSettings: (data: RoomSettings) => void;
  editEntry: () => void;
  restartGame: () => void;
};

const RoomActionsContext = createContext<RoomActions | null>(null);

type RoomActionsProviderProps = {
  children: ReactNode;
};

export function RoomActionsProvider({ children }: RoomActionsProviderProps) {
  const send = useRoomSocketStore((store) => store.send);

  const actions = useMemo<RoomActions>(() => {
    return {
      startGame: () => send({ type: "start_game" }),
      submitEntry: (content, twistId) =>
        send({ type: "submit_entry", content, twistId }),
      draftEntry: (content, twistId) =>
        send({ type: "draft_entry", content, twistId }),
      editEntry: () => send({ type: "edit_entry" }),
      restartGame: () => send({ type: "restart_game" }),
      editRoomSettings: (data) =>
        send({ type: "edit_config", config: mapRoomSettingsToConfigDto(data) }),
    };
  }, [send]);

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
