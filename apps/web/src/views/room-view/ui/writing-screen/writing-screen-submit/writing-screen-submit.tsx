import { Activity, useState } from "react";

import { cn } from "@/lib/utils";

import type { TwistsSet } from "../../../model/types";

import { WritingScreenInput } from "./writing-screen-input";
import { WritingScreenTwistPicker } from "./writing-screen-twist-picker";

type WritingScreenSubmitProps = {
  onSubmit: (content: string, twistId?: string) => void;
  onDraft: (content?: string, twistId?: string) => void;
  onEdit: () => void;
  isFirstRound: boolean;
  twistsToChoose: TwistsSet | null;
  className?: string;
};

export function WritingScreenSubmit({
  isFirstRound,
  twistsToChoose,
  onSubmit,
  onDraft,
  onEdit,
  className,
}: WritingScreenSubmitProps) {
  const [pickedTwistId, setPickedTwistId] = useState<string | null>(null);
  const [twistSkipped, setTwistSkipped] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (content: string) => {
    onSubmit(content, pickedTwistId ?? undefined);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    onEdit();
    setIsSubmitted(false);
  };

  const handlePickTwistId = (twistId: string | null) => {
    setPickedTwistId(twistId);
    if (twistId === null) setTwistSkipped(false);
    onDraft(undefined, twistId ?? undefined);
  };

  const handleSkipTwist = (skipped: boolean) => {
    setTwistSkipped(skipped);
  };

  const handleDraftContent = (content: string) => {
    onDraft(content || undefined, pickedTwistId ?? undefined);
  };

  const twistDecided =
    !twistsToChoose || pickedTwistId !== null || twistSkipped;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {twistsToChoose && (
        <WritingScreenTwistPicker
          onPick={handlePickTwistId}
          onSkip={handleSkipTwist}
          pickedTwistId={pickedTwistId}
          twists={twistsToChoose}
          isSubmitted={isSubmitted}
          isSkipped={twistSkipped}
        />
      )}
      <Activity mode={twistDecided ? "visible" : "hidden"}>
        <WritingScreenInput
          isFirstRound={isFirstRound}
          onSubmit={handleSubmit}
          onDraft={handleDraftContent}
          onEdit={handleEdit}
          isSubmitted={isSubmitted}
        />
      </Activity>
    </div>
  );
}
