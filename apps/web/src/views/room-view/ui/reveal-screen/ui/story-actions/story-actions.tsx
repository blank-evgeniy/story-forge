import { CheckIcon, ShareIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

import { getTestId } from "../../../../utils/get-test-id";

const testId = getTestId("story-actions");

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
  const { t } = useTranslation();

  if (!showNextAction && !showSaveAction) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-4 flex flex-wrap justify-end gap-2"
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
                {isSaved
                  ? t("room.reveal.storyActions.publish.submitted")
                  : t("room.reveal.storyActions.publish.submit")}
                {isSaved ? <CheckIcon /> : <ShareIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t("room.reveal.storyActions.publish.tooltip")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {showNextAction && (
        <Button
          {...testIdAttr(testId("next"))}
          onClick={onNext}
          disabled={saveIsLoading}
        >
          {t("room.reveal.storyActions.nextAction")}
        </Button>
      )}
    </motion.div>
  );
}
