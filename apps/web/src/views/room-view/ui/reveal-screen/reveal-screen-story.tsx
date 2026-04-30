import { AnimatePresence, motion } from "motion/react";
import { BookOpenIcon } from "lucide-react";
import type { Story } from "../../model/types";

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
            {visibleSentences.map((sentence, index) => (
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
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {sentence.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
