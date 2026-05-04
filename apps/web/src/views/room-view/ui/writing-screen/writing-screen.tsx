import { useState } from "react";

import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenTimer } from "./writing-screen-timer";
import { WritingScreenStory } from "./writing-screen-story";
import { WritingScreenInput } from "./writing-screen-input";
import { WritingScreenPlayers } from "./writing-screen-players";
import { WritingScreenTwistPicker } from "./writing-screen-twist-picker";

type WritingScreenProps = {
  onSubmit: (content: string, twistId?: string) => void;
};

export function WritingScreen({ onSubmit }: WritingScreenProps) {
  const {
    round,
    totalRounds,
    submitted,
    players,
    prevSentence,
    secondsPerTurn,
    twistsToChoose,
  } = useRoomStore();

  const [pickedTwist, setPickedTwist] = useState<{
    round: number;
    twistId: string;
  } | null>(null);

  const pickedTwistId =
    pickedTwist?.round === round ? pickedTwist.twistId : null;

  const handlePickTwist = (twistId: string) => {
    setPickedTwist({ round, twistId });
  };

  const handleSubmit = (content: string) => {
    onSubmit(content, pickedTwistId ?? undefined);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 lg:py-12 py-4" key={round}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          Раунд {round} / {totalRounds}
        </span>
        <WritingScreenTimer time={secondsPerTurn} />
      </div>

      <WritingScreenStory story={prevSentence} />

      {twistsToChoose && (
        <WritingScreenTwistPicker
          twists={twistsToChoose}
          pickedTwistId={pickedTwistId}
          onPick={handlePickTwist}
        />
      )}

      <WritingScreenInput onSubmit={handleSubmit} isFirstRound={round === 1} />

      <WritingScreenPlayers players={players} submitted={submitted} />
    </div>
  );
}
