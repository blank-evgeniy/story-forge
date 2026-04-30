import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { RevealScreenStory } from "./reveal-screen-story";
import { useStoryPlayer } from "./use-story-player";

type RevealScreenProps = {
  onPlayMore: () => void;
};

export function RevealScreen({ onPlayMore }: RevealScreenProps) {
  const { currentStory, shown, finished, storyIdx } = useStoryPlayer();

  return (
    <div className="flex-1 flex flex-col gap-6 lg:py-12 py-4">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={storyIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            <RevealScreenStory shown={shown} story={currentStory} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button className="w-full" onClick={onPlayMore}>
              Играть еще
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
