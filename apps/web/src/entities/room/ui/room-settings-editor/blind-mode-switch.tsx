import { useTranslation } from "react-i18next";

import { Field, FieldDescription } from "@/shared/ui/field";
import { FieldLabel } from "@/shared/ui/field";
import { Switch } from "@/shared/ui/switch";

import { useRoomSettingsContext } from "../../model/context/room-settings-context";

type BlindModeSwitchProps = {
  disabled: boolean;
};

export function BlindModeSwitch({ disabled }: BlindModeSwitchProps) {
  const { t } = useTranslation();

  const { roomSettings, updateRoomSettings } = useRoomSettingsContext();

  const checked = roomSettings.blindMode;

  const onCheckedChange = (checked: boolean) => {
    updateRoomSettings({ blindMode: checked });
  };

  return (
    <Field>
      <div className="flex items-center space-x-2">
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          id="enable-blind"
          disabled={disabled}
        />
        <FieldLabel htmlFor="enable-blind">
          {t("room.lobby.gameSettings.blindModeSwitch.label")}
        </FieldLabel>
      </div>
      <FieldDescription>
        {t(
          "room.lobby.gameSettings.blindModeSwitch.description",
        )}
      </FieldDescription>
    </Field>
  );
}
