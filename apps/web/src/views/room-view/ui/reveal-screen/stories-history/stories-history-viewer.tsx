import type { ReactNode } from "react";

import { PlayerAvatar } from "@/components/player-customization";
import { cn } from "@/lib/utils";
import { isPlayerSentence } from "@/views/room-view/model/type-guards";

import { PlayerMessage } from "../../common/player-message";
import { StoryWrapper } from "../../common/story-wrapper";
import { TwistMessage } from "../../common/twist-message";
import { assignSides } from "../reveal-screen-story/utils/assignSides";
import { useStoriesHistory } from "./stories-history-context";

type StoriesHistoryViewerProps = {
  actionsSlot?: ReactNode | ((storyId: string) => ReactNode);
};

export function StoriesHistoryViewer({
  actionsSlot,
}: StoriesHistoryViewerProps) {
  const { selectedStory } = useStoriesHistory();

  if (!selectedStory) return null;

  const resolvedActionsSlot =
    typeof actionsSlot === "function"
      ? actionsSlot(selectedStory.id)
      : actionsSlot;

  return (
    <StoryWrapper storyOwner={selectedStory.playerName}>
      {assignSides(selectedStory.sentences).map(({ sentence, side }, index) =>
        isPlayerSentence(sentence) ? (
          <div
            key={`${sentence.player.username}-${index}`}
            className={cn(
              "flex flex-col items-start gap-1 w-full",
              side === "left" ? "self-start" : "self-end items-end",
            )}
          >
            <PlayerAvatar
              color={sentence.player.color}
              icon={sentence.player.icon}
            />
            <PlayerMessage
              message={sentence.content}
              side={side}
              color={sentence.player.color}
            />
          </div>
        ) : (
          <div key={sentence.id}>
            <TwistMessage message={sentence.content} className="my-4" />
          </div>
        ),
      )}
      {resolvedActionsSlot}
    </StoryWrapper>
  );
}
