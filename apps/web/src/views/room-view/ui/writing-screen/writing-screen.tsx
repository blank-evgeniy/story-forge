import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenPlayers } from "./writing-screen-players";
import { WritingScreenStory } from "./writing-screen-story";
import { WritingScreenSubmit } from "./writing-screen-submit";
import { WritingScreenTimer } from "./writing-screen-timer";

type WritingScreenProps = {
  onSubmit: (content: string, twistId?: string) => void;
  onDraft: (content?: string, twistId?: string) => void;
  onEdit: () => void;
};

export function WritingScreen({
  onSubmit,
  onDraft,
  onEdit,
}: WritingScreenProps) {
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
        onDraft={onDraft}
        onEdit={onEdit}
      />

      <WritingScreenPlayers players={players} submitted={submitted} />
    </div>
  );
}
