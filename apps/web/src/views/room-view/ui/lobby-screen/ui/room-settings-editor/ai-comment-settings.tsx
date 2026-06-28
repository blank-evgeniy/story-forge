import { useTranslation } from "react-i18next";

import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { NativeSelect, NativeSelectOption } from "@/shared/ui/native-select";

import type { AiMood } from "../../../../model/types";

import { aiMoodOptions } from "../../../../model/consts";

type AiCommentSettingsProps = {
  value: AiMood;
  onChange: (value: AiMood) => void;
  disabled: boolean;
};

export function AiCommentSettings({
  value,
  onChange,
  disabled,
}: AiCommentSettingsProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <FieldLabel htmlFor="enable-ai-comment">
        {t("room.lobby.gameSettings.aiCommentSelect.label")}
      </FieldLabel>

      <NativeSelect
        id="enable-ai-comment"
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as AiMood)}
        value={value}
      >
        {aiMoodOptions.map((option) => (
          <NativeSelectOption
            key={option.value}
            value={option.value}
            selected={option.value === value}
            disabled={disabled}
          >
            {t(option.label)}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <FieldDescription>
        {t("room.lobby.gameSettings.aiCommentSelect.description")}
      </FieldDescription>
    </Field>
  );
}
