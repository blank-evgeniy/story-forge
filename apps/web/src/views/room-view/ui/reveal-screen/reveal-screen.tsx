import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRoomStore } from "../../model/use-room-store";
import { RevealReadyScreen } from "./reveal-ready-screen/index";
import { RevealScreenStory } from "./reveal-screen-story";
import {
  StoriesHistory,
  StoriesHistoryPicker,
  StoriesHistoryViewer,
} from "./stories-history";
import { StoryActions } from "./story-actions";
import { type StoryPlayerMode, useStoryPlayer } from "./use-story-player";

type RevealScreenProps = {
  onPlayMore: () => void;
};

export function RevealScreen({ onPlayMore }: RevealScreenProps) {
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

  const [historyMode, setHistoryMode] = useState<boolean>(false);

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
                    <StoryActions currentStoryId={storyId} />
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
                        currentStoryId={currentStory.id}
                        onNext={nextStory}
                        showNextAction={storyIdx < allStories.length - 1}
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
              <StoriesHistoryPicker />
              {isHost ? (
                <Button className="w-full" onClick={onPlayMore}>
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
