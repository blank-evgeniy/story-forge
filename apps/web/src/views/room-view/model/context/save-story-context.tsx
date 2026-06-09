import { createContext, type ReactNode, useContext } from "react";

import type { MutationHook } from "@/shared/types";

import { useSaveStory } from "../../api/use-save-story";

type SaveStoryProps = {
  saveStoryHook: MutationHook<{ storyId: string }>;
};

const SaveStoryContext = createContext<SaveStoryProps | null>(null);

type SaveStoryProviderProps = {
  children: ReactNode;
  roomCode: string;
  saveStoryHook?: MutationHook<{ storyId: string }>;
};

export function SaveStoryProvider({
  children,
  roomCode,
  saveStoryHook,
}: SaveStoryProviderProps) {
  const defaultHook = useSaveStory(roomCode);
  return (
    <SaveStoryContext.Provider
      value={{ saveStoryHook: saveStoryHook ?? defaultHook }}
    >
      {children}
    </SaveStoryContext.Provider>
  );
}

export function useSaveStoryContext(): SaveStoryProps {
  const ctx = useContext(SaveStoryContext);
  if (!ctx)
    throw new Error("useSaveStoryContext must be used within SaveStoryProvider");
  return ctx;
}
