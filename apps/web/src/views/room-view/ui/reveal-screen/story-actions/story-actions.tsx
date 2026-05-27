import { toast } from "sonner";

import { gameRoute } from "@/app/routes/routes";
import { useRoomStore } from "@/views/room-view/model/use-room-store";

import { useSaveStory } from "./api/use-save-story";
import { StoryActionsContent } from "./ui/story-actions-content";

type StoryActionsProps = {
  showNextAction?: boolean;
  onNext?: () => void;
  currentStoryId: string;
};

export function StoryActions({
  showNextAction = false,
  onNext,
  currentStoryId,
}: StoryActionsProps) {
  const { roomCode } = gameRoute.useParams();
  const isHost = useRoomStore((store) => store.isHost);
  const savedStories = useRoomStore((store) => store.savedStories);
  const addSavedStory = useRoomStore((store) => store.addSavedStory);

  const { mutate, isLoading } = useSaveStory();

  const handleSave = () => {
    mutate(
      {
        roomCode,
        storyId: currentStoryId,
      },
      {
        onSuccess: () => {
          addSavedStory(currentStoryId);
          toast.success("История опубликована");
        },
        onError: () => {
          toast.error("Не удалось опубликовать историю");
        },
      },
    );
  };

  return (
    <StoryActionsContent
      showNextAction={showNextAction}
      onNext={onNext}
      onSave={handleSave}
      saveIsLoading={isLoading}
      isSaved={savedStories.includes(currentStoryId)}
      showSaveAction={isHost}
    />
  );
}
