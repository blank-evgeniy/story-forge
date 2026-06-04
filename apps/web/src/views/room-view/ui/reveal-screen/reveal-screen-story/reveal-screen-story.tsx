import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

import { PlayerAvatar } from "@/components/player-customization";

import type { Story } from "../../../model/types";

import { isPlayerEntry } from "../../../model/type-guards";
import { MessageRow } from "../../common/message-row";
import { PlayerMessage } from "../../common/player-message";
import { StoryWrapper } from "../../common/story-wrapper";
import { TwistMessage } from "../../common/twist-message";
import { assignSides } from "./utils/assignSides";

type RevealScreenStoryProps = {
  story: Story;
  shown: number;
  className?: string;
};

export function RevealScreenStory({
  shown,
  story,
  className,
}: RevealScreenStoryProps) {
  const visibleEntries = story.entries.slice(0, shown);
  const entriesWithSides = assignSides(visibleEntries);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shown]);

  return (
    <StoryWrapper storyOwner={story.playerName} className={className}>
      <AnimatePresence initial={false}>
        {entriesWithSides.map(({ entry, side }, index) =>
          isPlayerEntry(entry) ? (
            <MessageRow key={index} side={side ?? "right"}>
              <PlayerAvatar
                color={entry.player.color}
                icon={entry.player.icon}
              />
              <PlayerMessage
                className="flex-1"
                message={entry.content}
                side={side}
                color={entry.player.color}
              />
            </MessageRow>
          ) : (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <TwistMessage message={entry.content} className="my-4" />
            </motion.div>
          ),
        )}
      </AnimatePresence>
      <div ref={bottomRef} />
    </StoryWrapper>
  );
}
