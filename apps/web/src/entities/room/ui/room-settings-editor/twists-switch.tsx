import { useTranslation } from "react-i18next";

import { Field, FieldDescription } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

import { useRoomSettingsContext } from "../../model/context/room-settings-context";

type TwistsSwitchProps = {
  disabled: boolean;
};

export function TwistsSwitch({ disabled }: TwistsSwitchProps) {
  const { t } = useTranslation();

  const { roomSettings, updateRoomSettings } = useRoomSettingsContext();

  const checked = roomSettings.enableTwists;

  const onCheckedChange = (checked: boolean) => {
    updateRoomSettings({ enableTwists: checked });
  };

  return (
    <Field>
      <div className="flex items-center space-x-2">
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          id="enable-twists"
          disabled={disabled}
        />
        <Label htmlFor="enable-twists">
          {t("welcome.createRoom.twists.label")}
        </Label>
      </div>
      <FieldDescription>
        {t("welcome.createRoom.twists.description")}
      </FieldDescription>
    </Field>
  );
}
