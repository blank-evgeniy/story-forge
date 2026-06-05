import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { WritingScreenPlayers } from "./ui/writing-screen-players";
import { WritingScreenStory } from "./ui/writing-screen-story";
import { WritingScreenSubmit } from "./ui/writing-screen-submit";
import { WritingScreenTimer } from "./ui/writing-screen-timer";

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
    <div className="flex min-h-0 flex-1 flex-col gap-4" key={round}>
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            Раунд {round} / {totalRounds}
          </span>
          <WritingScreenTimer time={secondsPerTurn} />
        </div>

        <WritingScreenPlayers players={players} submittedIds={submittedIds} />

        <WritingScreenStory story={prevEntry} className="overflow-y-auto" />
      </div>

      <div className="mt-auto">
        <WritingScreenSubmit
          isFirstRound={round === 1}
          twistsToChoose={twistsToChoose}
          onSubmit={actions.submitEntry}
          onDraft={actions.draftEntry}
          onEdit={actions.editEntry}
        />
      </div>
    </div>
  );
}
