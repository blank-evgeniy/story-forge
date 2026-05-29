import type { ReactNode } from "react";

import { AnimatePresence, motion } from "motion/react";

import { PlayerAvatar } from "@/components/player-customization";
import { cn } from "@/lib/utils";

import type { Story } from "../../../model/types";

import { isPlayerSentence } from "../../../model/type-guards";
import { PlayerMessage } from "../../common/player-message";
import { StoryWrapper } from "../../common/story-wrapper";
import { TwistMessage } from "../../common/twist-message";
import { assignSides } from "./utils/assignSides";

type RevealScreenStoryProps = {
  story: Story;
  shown: number;
  actionsSlot?: ReactNode;
};

export function RevealScreenStory({
  shown,
  story,
  actionsSlot,
}: RevealScreenStoryProps) {
  const visibleSentences = story.sentences.slice(0, shown);
  const sentencesWithSides = assignSides(visibleSentences);

  return (
    <StoryWrapper storyOwner={story.playerName}>
      <AnimatePresence initial={false}>
        {sentencesWithSides.map(({ sentence, side }, index) =>
          isPlayerSentence(sentence) ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
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
            </motion.div>
          ) : (
            <motion.div
              key={sentence.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <TwistMessage message={sentence.content} className="my-4" />
            </motion.div>
          ),
        )}

        {actionsSlot}
      </AnimatePresence>
    </StoryWrapper>
  );
}
