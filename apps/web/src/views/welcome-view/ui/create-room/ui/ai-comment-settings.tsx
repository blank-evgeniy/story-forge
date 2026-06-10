import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

import type { AiMood } from "../../../model/types";

import { aiMoodOptions } from "../../../model/consts";

type AiCommentSettingsProps = {
  onChangeEnable: (value: boolean) => void;
  enable: boolean;
  onSelectedMood: (mood: AiMood) => void;
  selectedMood: AiMood;
};

export function AiCommentSettings({
  enable,
  onChangeEnable,
  selectedMood,
  onSelectedMood,
}: AiCommentSettingsProps) {
  const { t } = useTranslation();

  const selectedMoodOption = aiMoodOptions.find(
    ({ value }) => value === selectedMood,
  );

  return (
    <Field>
      <FieldLabel>{t("welcome.createRoom.aiComment.title")}</FieldLabel>
      <div className="flex items-center space-x-2">
        <Switch
          id="enable-ai-comment"
          checked={enable}
          onCheckedChange={onChangeEnable}
        />
        <Label htmlFor="enable-ai-comment">
          {t("welcome.createRoom.aiComment.label")}
        </Label>
      </div>

      <FieldDescription>
        {t("welcome.createRoom.aiComment.description")}
      </FieldDescription>

      {enable && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {aiMoodOptions.map(({ value }) => (
              <Button
                key={value}
                variant={selectedMood === value ? "default" : "outline"}
                onClick={() => onSelectedMood(value)}
                size="sm"
                className="capitalize"
              >
                {t(`common.aiMood.${value}`)}
              </Button>
            ))}
          </div>

          {selectedMoodOption?.description && (
            <p className="text-sm">{t(selectedMoodOption.description)}</p>
          )}
        </div>
      )}
    </Field>
  );
}
