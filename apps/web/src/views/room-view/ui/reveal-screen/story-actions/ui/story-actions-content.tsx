import { CheckIcon, SaveIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

type StoryActionsContentProps = {
  showNextAction?: boolean;
  showSaveAction?: boolean;
  onNext?: () => void;
  saveIsLoading?: boolean;
  isSaved?: boolean;
  onSave: () => void;
};

export function StoryActionsContent({
  showNextAction = false,
  showSaveAction = false,
  onNext,
  saveIsLoading,
  isSaved,
  onSave,
}: StoryActionsContentProps) {
  if (!showNextAction && !showSaveAction) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex mt-4 justify-end gap-2"
    >
      {showSaveAction && (
        <Button
          variant={"outline"}
          onClick={onSave}
          isLoading={saveIsLoading}
          disabled={saveIsLoading || isSaved}
        >
          Сохранить {isSaved ? <CheckIcon /> : <SaveIcon />}
        </Button>
      )}
      {showNextAction && (
        <Button onClick={onNext} disabled={saveIsLoading}>
          Следующая история
        </Button>
      )}
    </motion.div>
  );
}
