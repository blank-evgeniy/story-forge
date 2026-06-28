import { useTranslation } from "react-i18next";

import { Field, FieldDescription, FieldLabel } from "@/shared/ui/field";
import { Switch } from "@/shared/ui/switch";

type TwistsSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
};

export function TwistsSwitch({ value, onChange, disabled }: TwistsSwitchProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex items-center space-x-2">
        <Switch
          checked={value}
          onCheckedChange={onChange}
          id="enable-twists"
          disabled={disabled}
        />
        <FieldLabel htmlFor="enable-twists">
          {t("room.lobby.gameSettings.twistsSwitch.label")}
        </FieldLabel>
      </div>
      <FieldDescription>
        {t("room.lobby.gameSettings.twistsSwitch.description")}
      </FieldDescription>
    </Field>
  );
}
