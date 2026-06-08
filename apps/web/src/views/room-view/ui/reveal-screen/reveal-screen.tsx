import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { testIdAttr } from "@/lib/tests/test-id";

import { useSaveStory } from "../../api/use-save-story";
import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { getTestId } from "../../utils/get-test-id";

const testId = getTestId("reveal-screen");
import { AiCommentCard } from "./ui/ai-comment-card";
import { RevealReadyScreen } from "./ui/reveal-ready-screen";
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
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {historyMode ? (
              <motion.div
                key="history-viewer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 overflow-y-auto"
              >
                <StoriesHistoryViewer
                  actionsSlot={(storyId) => (
                    <StoryActions {...commonStoryActionsProps(storyId)} />
                  )}
                />
              </motion.div>
            ) : (
              <motion.div
                key={storyIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 flex min-h-0 flex-col gap-2"
              >
                <RevealScreenStory
                  shown={shown}
                  story={currentStory}
                  className="overflow-y-auto"
                />
                {storyRevealed && (
                  <StoryActions
                    {...commonStoryActionsProps(currentStory.id)}
                    showNextAction={storyIdx < allStories.length - 1}
                    onNext={nextStory}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {finished && (
            <motion.div
              className="flex min-h-0 flex-col gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AiCommentCard status={aiCommentStatus} comment={aiComment} />
              <StoriesHistoryPicker />
              {isHost ? (
                <Button
                  {...testIdAttr(testId("restart"))}
                  className="w-full"
                  onClick={actions.restartGame}
                >
                  {t("reveal.playAgain")}
                </Button>
              ) : (
                <p
                  {...testIdAttr(testId("waiting"))}
                  className="text-muted-foreground flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {t("reveal.waitingForHost")} <Spinner />
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StoriesHistory>
  );
}
