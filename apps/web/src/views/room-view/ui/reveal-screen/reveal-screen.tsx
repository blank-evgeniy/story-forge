import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useSaveStory } from "../../api/use-save-story";
import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { AiCommentCard } from "./ai-comment-card";
import { RevealReadyScreen } from "./reveal-ready-screen/index";
import { RevealScreenStory } from "./reveal-screen-story";
import {
  StoriesHistory,
  StoriesHistoryPicker,
  StoriesHistoryViewer,
} from "./stories-history";
import { StoryActions, type StoryActionsProps } from "./story-actions";
import { type StoryPlayerMode, useStoryPlayer } from "./use-story-player";

type RevealScreenProps = {
  roomCode: string;
};

export function RevealScreen({ roomCode }: RevealScreenProps) {
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
          toast.success("История опубликована");
        },
        onError: () => {
          toast.error("Не удалось опубликовать историю");
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
      <div className="flex-1 flex flex-col gap-6 lg:py-12 py-4">
        <div className="flex-1 relative overflow-hidden">
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
                className="absolute inset-0 overflow-y-auto"
              >
                <RevealScreenStory
                  shown={shown}
                  story={currentStory}
                  actionsSlot={
                    storyRevealed ? (
                      <StoryActions
                        {...commonStoryActionsProps(currentStory.id)}
                        showNextAction={storyIdx < allStories.length - 1}
                        onNext={nextStory}
                      />
                    ) : undefined
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {finished && (
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AiCommentCard status={aiCommentStatus} comment={aiComment} />
              <StoriesHistoryPicker />
              {isHost ? (
                <Button className="w-full" onClick={actions.restartGame}>
                  Играть еще
                </Button>
              ) : (
                <p className="text-muted-foreground flex gap-2 justify-center items-center">
                  Ждем, пока хост перезапустит игру <Spinner />
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StoriesHistory>
  );
}
