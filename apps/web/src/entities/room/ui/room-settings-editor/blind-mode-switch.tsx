import { useTranslation } from "react-i18next";

import { Field, FieldDescription } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
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
        <Label htmlFor="enable-blind">
          {t("welcome.createRoom.blindMode.label")}
        </Label>
      </div>
      <FieldDescription>
        {t("welcome.createRoom.blindMode.description")}
      </FieldDescription>
    </Field>
  );
}
