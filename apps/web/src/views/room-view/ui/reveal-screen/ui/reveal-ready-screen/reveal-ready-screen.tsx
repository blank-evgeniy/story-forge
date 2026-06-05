import { BookOpenIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { testIdAttr } from "@/lib/tests/test-id";

import { getTestId } from "../../../../utils/get-test-id";

const testId = getTestId("reveal-ready-screen");

function pluralizeStories(count: number): string {
  if (count === 1) return "история";
  if (count < 5) return "истории";
  return "историй";
}

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
          Истории написаны
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="text-muted-foreground text-sm"
        >
          {storiesCount} {pluralizeStories(storiesCount)}
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
            <FieldLabel htmlFor="player-mode">Включить озвучку</FieldLabel>
          </FieldContent>
        </Field>

        <Button {...testIdAttr(testId("start"))} onClick={onStart}>
          Смотреть результаты
        </Button>
      </motion.div>
    </div>
  );
}
