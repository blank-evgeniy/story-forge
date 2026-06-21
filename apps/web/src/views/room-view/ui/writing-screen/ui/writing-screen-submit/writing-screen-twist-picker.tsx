import { CheckIcon, XIcon, ZapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";

import type { TwistsSet } from "../../../../model/types";

import { getTestId } from "../../../../utils/get-test-id";

const testId = getTestId("writing-screen-twist-picker");

interface WritingScreenTwistPickerProps {
  twists: TwistsSet;
  onPick: (twistId: string | null) => void;
  onSkip: (skipped: boolean) => void;
  pickedTwistId: string | null;
  isSkipped: boolean;
  isSubmitted?: boolean;
}

export function WritingScreenTwistPicker({
  twists,
  onPick,
  onSkip,
  pickedTwistId,
  isSkipped,
  isSubmitted,
}: WritingScreenTwistPickerProps) {
  const { t } = useTranslation();

  if (twists.length === 0) return null;

  const pickedTwist = twists.find((tw) => tw.id === pickedTwistId) ?? null;

  if (pickedTwist) {
    return (
      <div className="border-line bg-surface/10 text-small flex items-center gap-2 rounded-lg border px-4 py-2">
        <ZapIcon className="text-surface size-3.5 shrink-0" />
        <span className="flex-1">{pickedTwist.content}</span>
        {isSubmitted ? (
          <CheckIcon className="text-surface size-4 shrink-0" />
        ) : (
          <Button
            {...testIdAttr(testId("unset"))}
            type="button"
            variant="danger"
            size="icon-sm"
            className={"-my-1"}
            onClick={() => onPick(null)}
          >
            <XIcon />
          </Button>
        )}
      </div>
    );
  }

  if (isSkipped) {
    return (
      <div className="border-surface-2 text-surface-2 text-small flex items-center gap-2 rounded-lg border px-4 py-2">
        <ZapIcon className="size-3.5 shrink-0" />
        <span className="flex-1">{t("writing.twist.none")}</span>
        {!isSubmitted && (
          <Button
            {...testIdAttr(testId("unset"))}
            type="button"
            variant="danger"
            size="icon-sm"
            className="-my-1"
            onClick={() => onSkip(false)}
          >
            <XIcon />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ZapIcon className="text-surface size-3.5" />
          <h3 className="text-surface-2 text-small font-medium">
            {t("writing.twist.choose")}
          </h3>
        </div>
        <Button
          {...testIdAttr(testId("skip"))}
          type="button"
          variant="ghost-white"
          size="sm"
          onClick={() => onSkip(true)}
        >
          {t("writing.twist.skip")}
        </Button>
      </div>

      <ul className="flex flex-col gap-2">
        {twists.map((twist) => (
          <li key={twist.id}>
            <button
              {...testIdAttr(testId("item", twist.id))}
              type="button"
              className="border-surface-2 hover:bg-surface/30 text-small flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4 py-2 transition-colors"
              onClick={() => onPick(twist.id)}
            >
              {twist.content}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
