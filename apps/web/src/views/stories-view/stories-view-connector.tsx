import { useNavigate } from "@tanstack/react-router";

import { storiesRoute } from "@/app/routes/routes";

import { useGetStories } from "./api/use-get-stories";
import { StoriesView } from "./ui/stories-view";
import { StoryModalConnector } from "./ui/story-modal";

export function StoriesViewConnector() {
  const { data: stories, isLoading } = useGetStories();
  const { storyId } = storiesRoute.useSearch();
  const navigate = useNavigate({ from: "/stories" });

  const handleOpen = (id: number) =>
    navigate({
      search: (prev) => ({ ...prev, storyId: id }),
      viewTransition: false,
    });

  const handleClose = () =>
    navigate({
      search: (prev) => ({ ...prev, storyId: undefined }),
      viewTransition: false,
    });

  return (
    <StoriesView
      stories={stories}
      isLoading={isLoading}
      onOpen={handleOpen}
      modalSlot={
        <StoryModalConnector storyId={storyId ?? null} onClose={handleClose} />
      }
    />
  );
}
