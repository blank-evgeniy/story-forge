import { CheckIcon, ShareIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type StoryActionsProps = {
  showNextAction?: boolean;
  showSaveAction?: boolean;
  onNext?: () => void;
  saveIsLoading?: boolean;
  isSaved?: boolean;
  onSave: () => void;
};

export function StoryActions({
  showNextAction = false,
  showSaveAction = false,
  onNext,
  saveIsLoading,
  isSaved,
  onSave,
}: StoryActionsProps) {
  if (!showNextAction && !showSaveAction) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex mt-4 justify-end gap-2"
    >
      {showSaveAction && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<span />}>
              <Button
                variant="outline"
                onClick={onSave}
                isLoading={saveIsLoading}
                disabled={saveIsLoading || isSaved}
              >
                {isSaved ? "Опубликовано" : "Опубликовать"}
                {isSaved ? <CheckIcon /> : <ShareIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              История станет видна всем в публичной ленте
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {showNextAction && (
        <Button onClick={onNext} disabled={saveIsLoading}>
          Следующая история
        </Button>
      )}
    </motion.div>
  );
}
