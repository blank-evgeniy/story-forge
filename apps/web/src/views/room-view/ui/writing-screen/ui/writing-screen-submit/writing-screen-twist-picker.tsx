import { CheckIcon, XIcon, ZapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { testIdAttr } from "@/lib/tests/test-id";

import type { TwistsSet } from "../../../../model/types";

import { getTestId } from "../../../../utils/get-test-id";

const testId = getTestId("writing-screen-twist-picker");

interface WritingScreenTwistPickerProps {
  twists: TwistsSet;
  onPick: (twistId: string | null) => void;
  onSkip: (skipped: boolean) => void;
  pickedTwistId: string | null;
  isSkipped: boolean;
  isSubmitted?: boolean;
}

export function WritingScreenTwistPicker({
  twists,
  onPick,
  onSkip,
  pickedTwistId,
  isSkipped,
  isSubmitted,
}: WritingScreenTwistPickerProps) {
  if (twists.length === 0) return null;

  const pickedTwist = twists.find((t) => t.id === pickedTwistId) ?? null;

  if (pickedTwist) {
    return (
      <div className="border-primary bg-primary/10 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
        <ZapIcon className="text-primary size-3.5 shrink-0" />
        <span className="flex-1">{pickedTwist.content}</span>
        {isSubmitted ? (
          <CheckIcon className="text-primary size-4 shrink-0" />
        ) : (
          <Button
            {...testIdAttr(testId("unset"))}
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-destructive -my-4"
            onClick={() => onPick(null)}
          >
            <XIcon />
          </Button>
        )}
      </div>
    );
  }

  if (isSkipped) {
    return (
      <div className="border-muted text-muted-foreground flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
        <ZapIcon className="size-3.5 shrink-0" />
        <span className="flex-1">Без твиста</span>
        {!isSubmitted && (
          <Button
            {...testIdAttr(testId("unset"))}
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-destructive -my-4"
            onClick={() => onSkip(false)}
          >
            <XIcon />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ZapIcon className="text-primary size-3.5" />
          <h3 className="text-muted-foreground text-sm font-medium">
            Выберите твист
          </h3>
        </div>
        <Button
          {...testIdAttr(testId("skip"))}
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onSkip(true)}
        >
          Пропустить
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {twists.map((twist) => (
          <li key={twist.id}>
            <button
              {...testIdAttr(testId("item", twist.id))}
              type="button"
              className="border-muted hover:bg-muted/50 flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4 py-2 text-sm transition-colors"
              onClick={() => onPick(twist.id)}
            >
              {twist.content}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
