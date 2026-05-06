import { createContext, useContext } from "react";
import type { Story } from "@/views/room-view/model/types";

type StoriesHistoryContextValue = {
  stories: Story[];
  selectedStory: Story | null;
  onSelectStory: (story: Story) => void;
};

const StoriesHistoryContext = createContext<StoriesHistoryContextValue | null>(
  null,
);

export function useStoriesHistory() {
  const ctx = useContext(StoriesHistoryContext);
  if (!ctx) throw new Error("Must be used within <StoriesHistory>");
  return ctx;
}

export { StoriesHistoryContext };
