import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/lib/tests/test-id";

import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { getTestId } from "../../utils/get-test-id";
import { WritingScreenPlayers } from "./ui/writing-screen-players";
import { WritingScreenStory } from "./ui/writing-screen-story";
import { WritingScreenSubmit } from "./ui/writing-screen-submit";
import { WritingScreenTimer } from "./ui/writing-screen-timer";

const testId = getTestId("writing-screen");

export function WritingScreen() {
  const { t } = useTranslation();
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
          <span
            {...testIdAttr(testId("round"))}
            className="text-muted-foreground text-sm font-medium"
          >
            {t("writing.round", { round, totalRounds })}
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
