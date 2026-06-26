import { useDebounceCallback } from "@siberiacancode/reactuse";
import { CheckIcon, PencilIcon, SendHorizonalIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

import { getTestId } from "../../../../utils/get-test-id";
import { PlayerMessage } from "../../../common/player-message";

const testId = getTestId("writing-screen-input");

const MAX_LENGTH = 200;

type WritingScreenInputProps = {
  onSubmit: (content: string) => void;
  onDraft: (content: string) => void;
  onEdit: () => void;
  isFirstRound: boolean;
  isSubmitted?: boolean;
};

export function WritingScreenInput({
  onSubmit,
  onDraft,
  onEdit,
  isFirstRound,
  isSubmitted,
}: WritingScreenInputProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");

  const debouncedDraft = useDebounceCallback(
    (content: string) => onDraft(content.trim()),
    1000,
  );

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    debouncedDraft(value);
  };

  const handleSubmit = () => {
    if (isSubmitted || !content.trim()) return;

    onSubmit(content.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const remaining = MAX_LENGTH - content.length;
  const isNearLimit = remaining <= 30;

  if (isSubmitted) {
    return (
      <div className="flex w-full flex-col gap-2">
        <PlayerMessage message={content} side="right" />
        <div className="flex items-center justify-between gap-2">
          <Button
            {...testIdAttr(testId("edit"))}
            onClick={onEdit}
            variant="outline"
            size="sm"
          >
            <PencilIcon className="size-3" /> {t("writing.input.edit")}
          </Button>
          <div className="text-surface-2 text-small flex items-center gap-1.5">
            <CheckIcon className="text-success size-3" />
            <span>{t("writing.input.waitingForOthers")}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Textarea
        {...testIdAttr(testId("textarea"))}
        maxLength={MAX_LENGTH}
        value={content}
        onChange={handleChangeContent}
        onKeyDown={handleKeyDown}
        placeholder={
          isFirstRound
            ? t("writing.input.placeholderFirst")
            : t("writing.input.placeholderContinue")
        }
        className="max-h-48 min-h-24 resize-none scrollbar-thin"
        autoFocus
      />
      <div className="flex items-center justify-between gap-2">
        <Badge
          variant={"secondary"}
          className={cn(
            "text-surface-2 text-caption transition-colors",
            isNearLimit && "text-warning",
            remaining === 0 && "text-danger",
          )}
        >
          {t("writing.input.remaining", { count: remaining })}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="text-caption hidden sm:block">
            {t("writing.input.shortcut")}
          </span>
          <Button
            {...testIdAttr(testId("submit"))}
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            {t("writing.input.submit")} <SendHorizonalIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
