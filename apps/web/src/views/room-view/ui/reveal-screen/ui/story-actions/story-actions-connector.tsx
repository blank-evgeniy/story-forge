import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useSaveStoryContext } from "@/views/room-view/model/context/save-story-context";
import { useRoomStore } from "@/views/room-view/model/store/use-room-store";

import { StoryActions } from "./story-actions";

type StoryActionsProps = {
  storyId: string;
  showNext?: boolean;
  onNext?: () => void;
};

export function StoryActionsConnector({
  storyId,
  showNext = false,
  onNext,
}: StoryActionsProps) {
  const { t } = useTranslation();

  const isHost = useRoomStore((store) => store.isHost);
  const savedStories = useRoomStore((store) => store.savedStories);
  const addSavedStory = useRoomStore((store) => store.addSavedStory);

  const { saveStoryHook } = useSaveStoryContext();
  const { mutate: saveStory, isLoading } = saveStoryHook;

  const handleSave = () =>
    saveStory(
      { storyId },
      {
        onSuccess: () => {
          addSavedStory(storyId);
          toast.success(t("reveal.toast.publishSuccess"));
        },
        onError: () => {
          toast.error(t("reveal.toast.publishError"));
        },
      },
    );

  return (
    <StoryActions
      onSave={handleSave}
      saveIsLoading={isLoading}
      isSaved={savedStories.includes(storyId)}
      showNextAction={showNext}
      onNext={onNext}
      showSaveAction={isHost}
    />
  );
}
