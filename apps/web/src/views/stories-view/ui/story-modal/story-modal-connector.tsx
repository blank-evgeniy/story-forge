import { useGetStory } from "../../api/use-get-story";
import { StoryModal } from "./story-modal";

type StoryModalConnectorProps = {
  storyId: number | null;
  onClose: () => void;
};

export function StoryModalConnector({
  storyId,
  onClose,
}: StoryModalConnectorProps) {
  const { data, isLoading } = useGetStory(storyId);
  const isReady = !isLoading && data?.id === storyId;

  return (
    <StoryModal
      isOpen={storyId !== null}
      openedStory={isReady ? data : undefined}
      isStoryLoading={storyId !== null && !isReady}
      onClose={onClose}
    />
  );
}
