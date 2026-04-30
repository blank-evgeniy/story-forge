import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenTimer } from "./writing-screen-timer";
import { WritingScreenStory } from "./writing-screen-story";
import { WritingScreenInput } from "./writing-screen-input";
import { WritingScreenPlayers } from "./writing-screen-players";

type WritingScreenProps = {
  onSubmit: (content: string) => void;
};

export function WritingScreen({ onSubmit }: WritingScreenProps) {
  const {
    round,
    totalRounds,
    submitted,
    players,
    prevSentence,
    secondsPerTurn,
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

      <WritingScreenInput onSubmit={onSubmit} isFirstRound={round === 1} />

      <WritingScreenPlayers players={players} submitted={submitted} />
    </div>
  );
}
