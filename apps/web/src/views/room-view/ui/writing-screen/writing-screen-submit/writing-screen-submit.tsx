import { useState } from "react";

import { WritingScreenInput } from "./writing-screen-input";
import { WritingScreenTwistPicker } from "./writing-screen-twist-picker";

import type { TwistsSet } from "../../../model/types";

type WritingScreenSubmitProps = {
  onSubmit: (content: string, twistId?: string) => void;
  onDraft: (content?: string, twistId?: string) => void;
  onEdit: () => void;
  isFirstRound: boolean;
  twistsToChoose: TwistsSet | null;
};

export function WritingScreenSubmit({
  isFirstRound,
  twistsToChoose,
  onSubmit,
  onDraft,
  onEdit,
}: WritingScreenSubmitProps) {
  const [pickedTwistId, setPickedTwistId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [draftedContent, setDraftedContent] = useState<string>("");

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
    onDraft(draftedContent || undefined, twistId ?? undefined);
  };

  const handleDraftContent = (content: string) => {
    setDraftedContent(content);
    onDraft(content || undefined, pickedTwistId ?? undefined);
  };

  return (
    <div className="flex flex-col gap-6">
      {twistsToChoose && (
        <WritingScreenTwistPicker
          onPick={handlePickTwistId}
          pickedTwistId={pickedTwistId}
          twists={twistsToChoose}
          isSubmitted={isSubmitted}
        />
      )}
      <WritingScreenInput
        isFirstRound={isFirstRound}
        onSubmit={handleSubmit}
        onDraft={handleDraftContent}
        onEdit={handleEdit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
}
