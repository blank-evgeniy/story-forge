import { BookOpenIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

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
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/60 border border-border"
        >
          <BookOpenIcon className="w-8 h-8 text-muted-foreground" />
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
          className="text-sm text-muted-foreground"
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
        className="flex flex-col gap-4 items-center"
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

        <Button onClick={onStart}>Смотреть результаты</Button>
      </motion.div>
    </div>
  );
}
