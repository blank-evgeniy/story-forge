import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenPlayers } from "./writing-screen-players";
import { WritingScreenStory } from "./writing-screen-story";
import { WritingScreenSubmit } from "./writing-screen-submit";
import { WritingScreenTimer } from "./writing-screen-timer";

export function WritingScreen() {
  const {
    round,
    totalRounds,
    submittedIds,
    players,
    prevEntry,
    secondsPerTurn,
    twistsToChoose,
  } = useRoomStore();

  const actions = useRoomActions();

  return (
    <div className="flex flex-1 flex-col gap-5 py-4 lg:py-12" key={round}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          Раунд {round} / {totalRounds}
        </span>
        <WritingScreenTimer time={secondsPerTurn} />
      </div>

      <WritingScreenStory story={prevEntry} />

      <WritingScreenSubmit
        isFirstRound={round === 1}
        twistsToChoose={twistsToChoose}
        onSubmit={actions.submitEntry}
        onDraft={actions.draftEntry}
        onEdit={actions.editEntry}
      />

      <WritingScreenPlayers players={players} submittedIds={submittedIds} />
    </div>
  );
}
