import { useTranslation } from "react-i18next";

import { Field, FieldLabel } from "@/shared/ui/field";
import { NativeSelect, NativeSelectOption } from "@/shared/ui/native-select";

import { roundTimeOptions } from "../../../../model/consts";

type RoundTimeSelectProps = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export function RoundTimeSelect({
  value,
  onChange,
  disabled,
}: RoundTimeSelectProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <FieldLabel htmlFor="round-time">
        {t("room.lobby.gameSettings.roundTimeSelect.label")}
      </FieldLabel>

      <NativeSelect
        id="round-time"
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        value={value}
      >
        {roundTimeOptions.map((option) => (
          <NativeSelectOption
            key={option}
            value={option}
            selected={option === value}
            disabled={disabled}
          >
            {option}s
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </Field>
  );
}
