import { useState } from "react";

import { WritingScreenInput } from "./writing-screen-input";
import { WritingScreenTwistPicker } from "./writing-screen-twist-picker";

import type { TwistsSet } from "../../../model/types";

type WritingScreenSubmitProps = {
  onSubmit: (content: string, twistId?: string) => void;
  isFirstRound: boolean;
  twistsToChoose: TwistsSet | null;
};

export function WritingScreenSubmit({
  isFirstRound,
  twistsToChoose,
  onSubmit,
}: WritingScreenSubmitProps) {
  const [pickedTwistId, setPickedTwistId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (content: string) => {
    onSubmit(content, pickedTwistId ?? undefined);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {twistsToChoose && (
        <WritingScreenTwistPicker
          onPick={setPickedTwistId}
          pickedTwistId={pickedTwistId}
          twists={twistsToChoose}
          isSubmitted={isSubmitted}
        />
      )}
      <WritingScreenInput
        isFirstRound={isFirstRound}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
}
