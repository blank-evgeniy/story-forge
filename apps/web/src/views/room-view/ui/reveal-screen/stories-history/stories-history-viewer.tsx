import { cn } from "@/lib/utils";
import { isPlayerSentence } from "@/views/room-view/model/type-guards";

import { PlayerMessage } from "../../common/player-message";
import { StoryWrapper } from "../../common/story-wrapper";
import { TwistMessage } from "../../common/twist-message";
import { assignSides } from "../reveal-screen-story/utils/assignSides";
import { useStoriesHistory } from "./stories-history-context";

export function StoriesHistoryViewer() {
  const { selectedStory } = useStoriesHistory();

  if (!selectedStory) return null;

  return (
    <StoryWrapper storyOwner={selectedStory.playerName}>
      {assignSides(selectedStory.sentences).map(({ sentence, side }, index) =>
        isPlayerSentence(sentence) ? (
          <div
            key={`${sentence.playerName}-${index}`}
            className={cn(
              "flex flex-col items-start gap-0.5 w-full",
              side === "left" ? "self-start" : "self-end items-end",
            )}
          >
            <span className="text-xs text-muted-foreground px-1">
              {sentence.playerName}
            </span>
            <PlayerMessage message={sentence.content} side={side} />
          </div>
        ) : (
          <div key={sentence.id}>
            <TwistMessage message={sentence.content} className="my-4" />
          </div>
        ),
      )}
    </StoryWrapper>
  );
}
