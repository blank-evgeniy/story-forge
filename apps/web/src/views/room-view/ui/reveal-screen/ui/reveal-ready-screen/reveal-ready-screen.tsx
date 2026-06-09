import { BookOpenIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";
import { Field, FieldContent, FieldLabel } from "@/shared/ui/field";
import { Separator } from "@/shared/ui/separator";
import { Switch } from "@/shared/ui/switch";

import { getTestId } from "../../../../utils/get-test-id";

const testId = getTestId("reveal-ready-screen");

type RevealReadyScreenProps = {
  storiesCount: number;
  onStart: () => void;
  onSwitchChange: (checked: boolean) => void;
};

export function RevealReadyScreen({
  storiesCount,
  onStart,
  onSwitchChange,
}: RevealReadyScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-muted/60 border-border flex h-16 w-16 items-center justify-center rounded-2xl border"
        >
          <BookOpenIcon className="text-muted-foreground h-8 w-8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="text-2xl font-semibold tracking-tight"
        >
          {t("reveal.ready.heading")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="text-muted-foreground text-sm"
        >
          {t("reveal.ready.storiesCount", { count: storiesCount })}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
        className="w-48"
      >
        <Separator />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
        className="flex flex-col items-center gap-4"
      >
        <Field orientation="horizontal">
          <Switch
            id="player-mode"
            defaultChecked={false}
            onCheckedChange={onSwitchChange}
          />
          <FieldContent>
            <FieldLabel htmlFor="player-mode">
              {t("reveal.ready.enableNarration")}
            </FieldLabel>
          </FieldContent>
        </Field>

        <Button {...testIdAttr(testId("start"))} onClick={onStart}>
          {t("reveal.ready.viewResults")}
        </Button>
      </motion.div>
    </div>
  );
}
