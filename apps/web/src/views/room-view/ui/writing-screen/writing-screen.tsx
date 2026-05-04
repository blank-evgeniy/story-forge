import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenTimer } from "./writing-screen-timer";
import { WritingScreenStory } from "./writing-screen-story";
import { WritingScreenPlayers } from "./writing-screen-players";
import { WritingScreenSubmit } from "./writing-screen-submit";

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

  return (
    <div className="flex-1 flex flex-col gap-5 lg:py-12 py-4" key={round}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          Раунд {round} / {totalRounds}
        </span>
        <WritingScreenTimer time={secondsPerTurn} />
      </div>

      <WritingScreenStory story={prevSentence} />

      <WritingScreenSubmit
        isFirstRound={round === 1}
        twistsToChoose={twistsToChoose}
        onSubmit={onSubmit}
      />

      <WritingScreenPlayers players={players} submitted={submitted} />
    </div>
  );
}
