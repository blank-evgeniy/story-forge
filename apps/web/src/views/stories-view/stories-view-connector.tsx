import { useState } from "react";

import { useGetStories } from "./api/use-get-stories";
import { useGetStory } from "./api/use-get-story";
import { StoriesView } from "./ui/stories-view";

export function StoriesViewConnector() {
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: stories, isLoading: isListLoading } = useGetStories();
  const { data: openedStory, isLoading: isStoryLoading } = useGetStory(openId);

  const isStoryReady = !isStoryLoading && openedStory?.id === openId;

  return (
    <StoriesView
      stories={stories}
      isLoading={isListLoading}
      isModalOpen={openId !== null}
      openedStory={isStoryReady ? openedStory : undefined}
      isStoryLoading={!isStoryReady}
      onOpen={setOpenId}
      onClose={() => setOpenId(null)}
    />
  );
}
