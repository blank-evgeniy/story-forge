import { AnimatePresence, motion } from "motion/react";
import { BookOpenIcon } from "lucide-react";
import type { Story } from "../../model/types";
import { PlayerMessage } from "../common/player-message";
import { isPlayerSentence } from "../../model/type-guards";
import { TwistMessage } from "../common/twist-message";

type RevealScreenStoryProps = {
  story: Story;
  shown: number;
};

export function RevealScreenStory({ shown, story }: RevealScreenStoryProps) {
  const visibleSentences = story.sentences.slice(0, shown);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-muted-foreground font-medium">История</p>
        <h2 className="text-lg font-semibold">{story.playerName}</h2>
      </div>

      <div className="w-full rounded-xl border border-border bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
          <BookOpenIcon className="size-4" />
          <span className="text-xs font-medium uppercase tracking-wide">
            История
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {visibleSentences.map((sentence, index) =>
              isPlayerSentence(sentence) ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-start gap-0.5"
                >
                  <span className="text-xs text-muted-foreground px-1">
                    {sentence.playerName}
                  </span>
                  <PlayerMessage message={sentence.content} />
                </motion.div>
              ) : (
                <motion.div
                  key={sentence.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <TwistMessage message={sentence.content} />
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
