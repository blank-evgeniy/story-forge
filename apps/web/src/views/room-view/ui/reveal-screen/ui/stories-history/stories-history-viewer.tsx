import type { ReactNode } from "react";

import { PlayerAvatar } from "@/entities/player";
import { isPlayerEntry } from "@/views/room-view/model/types";

import { MessageRow } from "../../../common/message-row";
import { PlayerMessage } from "../../../common/player-message";
import { StoryWrapper } from "../../../common/story-wrapper";
import { TwistMessage } from "../../../common/twist-message";
import { assignSides } from "../../utils";
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
      {assignSides(selectedStory.entries).map(({ entry, side }, index) =>
        isPlayerEntry(entry) ? (
          <MessageRow
            side={side ?? "right"}
            key={`${entry.player.username}-${index}`}
          >
            <PlayerAvatar color={entry.player.color} icon={entry.player.icon} />
            <PlayerMessage
              message={entry.content}
              side={side}
              color={entry.player.color}
            />
          </MessageRow>
        ) : (
          <div key={entry.id}>
            <TwistMessage message={entry.content} className="my-4" />
          </div>
        ),
      )}
      {resolvedActionsSlot}
    </StoryWrapper>
  );
}
