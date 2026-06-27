import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

import { getTestId } from "../../../../utils/get-test-id";

type StartGameActionProps = {
  disabled: boolean;
  isHost: boolean;
  onStartGame: () => void;
};

const testId = getTestId("start-game-action");

export function StartGameAction({
  disabled,
  isHost,
  onStartGame,
}: StartGameActionProps) {
  const { t } = useTranslation();

  if (isHost) {
    return (
      <Button
        {...testIdAttr(testId("start"))}
        className="mt-auto w-full"
        disabled={disabled}
        onClick={onStartGame}
      >
        {t("room.lobby.startGame")}
      </Button>
    );
  }

  return (
    <p
      {...testIdAttr(testId("waiting-message"))}
      className="text-surface-2 text-body flex items-center justify-center gap-2"
    >
      {t("room.lobby.waitingForHost")} <Spinner />
    </p>
  );
}
