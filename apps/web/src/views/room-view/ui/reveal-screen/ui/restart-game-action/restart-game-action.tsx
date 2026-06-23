import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

import { getTestId } from "../../../../utils/get-test-id";

type RestartGameActionProps = {
  onRestartGame: () => void;
  isHost: boolean;
};

const testId = getTestId("restart-game-action");
export function RestartGameAction({
  onRestartGame,
  isHost,
}: RestartGameActionProps) {
  const { t } = useTranslation();

  if (isHost) {
    return (
      <Button
        {...testIdAttr(testId("restart"))}
        className="w-full"
        onClick={onRestartGame}
      >
        {t("reveal.playAgain")}
      </Button>
    );
  }

  return (
    <p
      {...testIdAttr(testId("waiting"))}
      className="text-surface-2 sm:text-body text-small flex items-center justify-center gap-2"
    >
      {t("reveal.waitingForHost")} <Spinner />
    </p>
  );
}
