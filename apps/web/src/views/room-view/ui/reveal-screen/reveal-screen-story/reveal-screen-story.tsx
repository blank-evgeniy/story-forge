import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

import type { Story } from "../../../model/types";
import { PlayerMessage } from "../../common/player-message";
import { isPlayerSentence } from "../../../model/type-guards";
import { TwistMessage } from "../../common/twist-message";
import { StoryWrapper } from "../../common/story-wrapper";
import { assignSides } from "./utils/assignSides";

type RevealScreenStoryProps = {
  story: Story;
  shown: number;
};

export function RevealScreenStory({ shown, story }: RevealScreenStoryProps) {
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
                "flex flex-col items-start gap-0.5 max-w-full",
                side === "left" ? "self-start" : "self-end items-end",
              )}
            >
              <span className="text-xs text-muted-foreground px-1">
                {sentence.playerName}
              </span>
              <PlayerMessage message={sentence.content} side={side} />
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
      </AnimatePresence>
    </StoryWrapper>
  );
}
