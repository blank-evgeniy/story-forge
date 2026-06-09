import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { RoundCounter } from "./ui/round-counter";
import { WritingScreenLayout } from "./ui/writing-screen-layout";
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
    <WritingScreenLayout key={round}>
      <WritingScreenLayout.Header>
        <WritingScreenLayout.HeaderMeta>
          <RoundCounter current={round} total={totalRounds} />
          <WritingScreenTimer time={secondsPerTurn} />
        </WritingScreenLayout.HeaderMeta>

        <WritingScreenPlayers players={players} submittedIds={submittedIds} />

        <WritingScreenStory story={prevEntry} />
      </WritingScreenLayout.Header>

      <WritingScreenLayout.InputSection>
        <WritingScreenSubmit
          isFirstRound={round === 1}
          twistsToChoose={twistsToChoose}
          onSubmit={actions.submitEntry}
          onDraft={actions.draftEntry}
          onEdit={actions.editEntry}
        />
      </WritingScreenLayout.InputSection>
    </WritingScreenLayout>
  );
}
