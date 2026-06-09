import { useState } from "react";

import { useRoomActions } from "../../model/context/room-actions-context";
import { useRoomStore } from "../../model/store/use-room-store";
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
import { StoryActionsConnector } from "./ui/story-actions";
import { type StoryPlayerMode, useStoryPlayer } from "./utils";

export function RevealScreen() {
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

  const [historyMode, setHistoryMode] = useState<boolean>(false);
  const isRevealMode = !historyMode;

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
          {isRevealMode ? (
            <RevealScreenLayout.StoryRevealAnimated key={storyIdx}>
              <RevealScreenStory shown={shown} story={currentStory} />
              {storyRevealed && (
                <StoryActionsConnector
                  storyId={currentStory.id}
                  showNext={storyIdx < allStories.length - 1}
                  onNext={nextStory}
                />
              )}
            </RevealScreenLayout.StoryRevealAnimated>
          ) : (
            <RevealScreenLayout.StoryHistoryAnimated key="history-mode">
              <StoriesHistoryViewer
                actionsSlot={(storyId) => (
                  <StoryActionsConnector storyId={storyId} />
                )}
              />
            </RevealScreenLayout.StoryHistoryAnimated>
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
