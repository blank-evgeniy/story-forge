import { useTranslation } from "react-i18next";

import { Field, FieldLabel } from "@/shared/ui/field";
import { NativeSelect, NativeSelectOption } from "@/shared/ui/native-select";

import { roundTimeOptions } from "../../model/consts";
import { useRoomSettingsContext } from "../../model/context/room-settings-context";

type RoundTimeSelectProps = {
  disabled: boolean;
};

export function RoundTimeSelect({ disabled }: RoundTimeSelectProps) {
  const { t } = useTranslation();

  const { roomSettings, updateRoomSettings } = useRoomSettingsContext();

  const selectedRoundTime = roomSettings.roundTime;

  const onValueChange = (value: string) => {
    updateRoomSettings({ roundTime: Number(value) });
  };

  return (
    <Field>
      <FieldLabel htmlFor="round-time">
        {t("room.lobby.gameSettings.roundTimeSelect.label")}
      </FieldLabel>

      <NativeSelect
        id="round-time"
        disabled={disabled}
        onChange={(e) => onValueChange(e.target.value)}
        value={selectedRoundTime}
      >
        {roundTimeOptions.map((value) => (
          <NativeSelectOption
            key={value}
            value={value}
            selected={value === selectedRoundTime}
            disabled={disabled}
          >
            {value}s
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </Field>
  );
}
