import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useSaveStory } from "../../api/use-save-story";
import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { AiCommentCard } from "./ui/ai-comment-card";
import { RestartGameAction } from "./ui/restart-game-action";
import { RevealReadyScreen } from "./ui/reveal-ready-screen";
import { RevealScreenLayout } from "./ui/reveal-screen-layout";
import { RevealScreenStory } from "./ui/reveal-screen-story";
import {
  StoriesHistory,
  StoriesHistoryPicker,
  StoriesHistoryViewer,
} from "./ui/stories-history";
import { StoryActions, type StoryActionsProps } from "./ui/story-actions";
import { type StoryPlayerMode, useStoryPlayer } from "./utils";

type RevealScreenProps = {
  roomCode: string;
};

export function RevealScreen({ roomCode }: RevealScreenProps) {
  const { t } = useTranslation();
  const [playerMode, setPlayerMode] = useState<StoryPlayerMode>("timer");
  const {
    allStories,
    currentStory,
    shown,
    finished,
    storyIdx,
    started,
    storyRevealed,
    start,
    nextStory,
  } = useStoryPlayer({
    mode: playerMode,
  });

  const isHost = useRoomStore((store) => store.isHost);
  const aiComment = useRoomStore((store) => store.aiComment);
  const aiCommentStatus = useRoomStore((store) => store.aiCommentStatus);
  const savedStories = useRoomStore((store) => store.savedStories);
  const addSavedStory = useRoomStore((store) => store.addSavedStory);

  const { mutate: saveStory, isLoading: isSaving } = useSaveStory();

  const handleSave = (storyId: string) =>
    saveStory(
      { roomCode, storyId },
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

  const commonStoryActionsProps: (storyId: string) => StoryActionsProps = (
    storyId,
  ) => ({
    onSave: () => handleSave(storyId),
    isSaved: savedStories.includes(storyId),
    saveIsLoading: isSaving,
    showSaveAction: isHost,
  });

  const [historyMode, setHistoryMode] = useState<boolean>(false);

  const actions = useRoomActions();

  if (!started) {
    return (
      <RevealReadyScreen
        storiesCount={allStories.length}
        onStart={start}
        onSwitchChange={(checked) =>
          setPlayerMode(checked ? "speech" : "timer")
        }
      />
    );
  }

  return (
    <StoriesHistory
      stories={allStories}
      onSelectedStoryChange={() => setHistoryMode(true)}
    >
      <RevealScreenLayout>
        <RevealScreenLayout.StorySection>
          {historyMode ? (
            <RevealScreenLayout.StoryHistoryAnimated key="history-mode">
              <StoriesHistoryViewer
                actionsSlot={(storyId) => (
                  <StoryActions {...commonStoryActionsProps(storyId)} />
                )}
              />
            </RevealScreenLayout.StoryHistoryAnimated>
          ) : (
            <RevealScreenLayout.StoryRevealAnimated key={storyIdx}>
              <RevealScreenStory shown={shown} story={currentStory} />
              {storyRevealed && (
                <StoryActions
                  {...commonStoryActionsProps(currentStory.id)}
                  showNextAction={storyIdx < allStories.length - 1}
                  onNext={nextStory}
                />
              )}
            </RevealScreenLayout.StoryRevealAnimated>
          )}
        </RevealScreenLayout.StorySection>

        <RevealScreenLayout.Footer isVisible={finished}>
          <AiCommentCard status={aiCommentStatus} comment={aiComment} />
          <StoriesHistoryPicker />
          <RestartGameAction
            isHost={isHost}
            onRestartGame={actions.restartGame}
          />
        </RevealScreenLayout.Footer>
      </RevealScreenLayout>
    </StoriesHistory>
  );
}
