import { useTranslation } from "react-i18next";

import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { NativeSelect, NativeSelectOption } from "@/shared/ui/native-select";

import { type AiMood, aiMoodOptions } from "../../../room";
import { useRoomSettingsContext } from "../../model/context/room-settings-context";

type AiCommentSettingsProps = {
  disabled: boolean;
};

export function AiCommentSettings({ disabled }: AiCommentSettingsProps) {
  const { t } = useTranslation();

  const { roomSettings, updateRoomSettings } = useRoomSettingsContext();

  const selectedMood = roomSettings.aiMood;

  const onValueChange = (value: string) => {
    updateRoomSettings({ aiMood: value as AiMood });
  };

  return (
    <Field>
      <FieldLabel htmlFor="enable-ai-comment">
        {t("room.lobby.gameSettings.aiCommentSelect.label")}
      </FieldLabel>

      <NativeSelect
        id="enable-ai-comment"
        disabled={disabled}
        onChange={(e) => onValueChange(e.target.value)}
        value={selectedMood}
      >
        {aiMoodOptions.map(({ value, label }) => (
          <NativeSelectOption
            key={value}
            value={value}
            selected={value === selectedMood}
            disabled={disabled}
          >
            {t(label)}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <FieldDescription>
        {t(
          "room.lobby.gameSettings.aiCommentSelect.description",
        )}
      </FieldDescription>
    </Field>
  );
}
