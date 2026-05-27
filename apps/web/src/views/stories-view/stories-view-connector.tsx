import { useState } from "react";

import { useGetStories } from "./api/use-get-stories";
import { useGetStory } from "./api/use-get-story";
import { StoriesView } from "./ui/stories-view";

export function StoriesViewConnector() {
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: stories, isLoading: isListLoading } = useGetStories();
  const { data: openedStory, isLoading: isStoryLoading } = useGetStory(openId);

  return (
    <StoriesView
      stories={stories}
      isLoading={isListLoading}
      isModalOpen={openId !== null}
      openedStory={openedStory}
      isStoryLoading={isStoryLoading}
      onOpen={setOpenId}
      onClose={() => setOpenId(null)}
    />
  );
}
