import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonalIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 200;

type WritingScreenInputProps = {
  onSubmit: (content: string) => void;
  isFirstRound: boolean;
};

export function WritingScreenInput({
  onSubmit,
  isFirstRound,
}: WritingScreenInputProps) {
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (isSubmitted || !content.trim()) return;

    setIsSubmitted(true);
    onSubmit(content);
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
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5">
            <p className="text-sm text-primary-foreground leading-relaxed">
              {content}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 justify-end text-xs text-muted-foreground">
          <CheckIcon className="size-3 text-green-500" />
          <span>Ожидаем остальных...</span>
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
      <div className="flex items-center justify-between">
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
