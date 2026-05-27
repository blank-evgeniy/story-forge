import { useDebounceCallback } from "@siberiacancode/reactuse";
import { CheckIcon, PencilIcon, SendHorizonalIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { PlayerMessage } from "../../common/player-message";

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
      <div className="flex flex-col gap-2 w-full">
        <PlayerMessage message={content} side="right" />
        <div className="flex items-center justify-between gap-2">
          <Button onClick={onEdit} variant="ghost" size="sm">
            <PencilIcon className="size-3" /> Редактировать
          </Button>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckIcon className="size-3 text-green-500" />
            <span>Ожидаем остальных...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Textarea
        maxLength={MAX_LENGTH}
        value={content}
        onChange={handleChangeContent}
        onKeyDown={handleKeyDown}
        placeholder={isFirstRound ? "Начни историю..." : "Продолжи историю..."}
        className="resize-none min-h-24"
        autoFocus
      />
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "text-xs text-muted-foreground transition-colors",
            isNearLimit && "text-amber-500",
            remaining === 0 && "text-destructive",
          )}
        >
          {remaining} символов
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">
            Ctrl+Enter для отправки
          </span>
          <Button onClick={handleSubmit} disabled={!content.trim()} size="sm">
            Отправить <SendHorizonalIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
