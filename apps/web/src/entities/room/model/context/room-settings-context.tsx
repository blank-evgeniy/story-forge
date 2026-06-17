import { createContext, type ReactNode, useContext, useState } from "react";

import type { RoomSettings } from "../types";

import { defaultRoomSettings } from "../consts";

type RoomSettingsContext = {
  roomSettings: RoomSettings;
  updateRoomSettings: (roomSettings: Partial<RoomSettings>) => void;
};

const RoomSettingsContextContext = createContext<RoomSettingsContext | null>(
  null,
);

type RoomSettingsContextProviderProps = {
  children: ReactNode;
};

export function RoomSettingsContextProvider({
  children,
}: RoomSettingsContextProviderProps) {
  const [roundTime, setRoundTime] = useState(defaultRoomSettings.roundTime);
  const [blindMode, setBlindMode] = useState(defaultRoomSettings.blindMode);
  const [enableTwists, setEnableTwists] = useState(
    defaultRoomSettings.enableTwists,
  );
  const [aiMood, setAiMood] = useState(defaultRoomSettings.aiMood);

  const roomSettings = {
    roundTime,
    blindMode,
    enableTwists,
    aiMood,
  };

  const updateRoomSettings = (roomSettings: Partial<RoomSettings>) => {
    setRoundTime(roomSettings.roundTime ?? roundTime);
    setBlindMode(roomSettings.blindMode ?? blindMode);
    setEnableTwists(roomSettings.enableTwists ?? enableTwists);
    setAiMood(roomSettings.aiMood ?? aiMood);
  };

  return (
    <RoomSettingsContextContext.Provider
      value={{ roomSettings, updateRoomSettings }}
    >
      {children}
    </RoomSettingsContextContext.Provider>
  );
}

export function useRoomSettingsContext(): RoomSettingsContext {
  const ctx = useContext(RoomSettingsContextContext);
  if (!ctx)
    throw new Error(
      "useRoomSettingsContext must be used within RoomSettingsContextProvider",
    );
  return ctx;
}
