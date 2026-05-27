import { useState } from "react";

import type { Story } from "@/views/room-view/model/types";

import { StoriesHistoryContext } from "./stories-history-context";

type StoriesHistoryProps = {
  stories: Story[];
  onSelectedStoryChange?: (story: Story) => void;
  children: React.ReactNode;
};

export function StoriesHistory({
  stories,
  onSelectedStoryChange,
  children,
}: StoriesHistoryProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(
    stories[stories.length - 1] || null,
  );

  const handleSelect = (story: Story) => {
    if (story.id === selectedStory?.id) return;

    setSelectedStory(story);
    onSelectedStoryChange?.(story);
  };

  return (
    <StoriesHistoryContext.Provider
      value={{ stories, selectedStory, onSelectStory: handleSelect }}
    >
      {children}
    </StoriesHistoryContext.Provider>
  );
}
