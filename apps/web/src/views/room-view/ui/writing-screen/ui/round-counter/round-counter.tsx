import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";

import { getTestId } from "../../../../utils/get-test-id";

type RoundCounterProps = {
  current: number;
  total: number;
};

const testId = getTestId("round-counter");

export function RoundCounter({ current, total }: RoundCounterProps) {
  const { t } = useTranslation();

  return (
    <span
      {...testIdAttr(testId("round"))}
      className="text-surface-2 text-small"
    >
      {t("writing.round", { round: current, totalRounds: total })}
    </span>
  );
}
