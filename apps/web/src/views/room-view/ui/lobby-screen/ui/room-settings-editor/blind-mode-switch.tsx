import { useTranslation } from "react-i18next";

import { Field, FieldDescription } from "@/shared/ui/field";
import { FieldLabel } from "@/shared/ui/field";
import { Switch } from "@/shared/ui/switch";

type BlindModeSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
};

export function BlindModeSwitch({
  value,
  onChange,
  disabled,
}: BlindModeSwitchProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex items-center space-x-2">
        <Switch
          checked={value}
          onCheckedChange={onChange}
          id="enable-blind"
          disabled={disabled}
        />
        <FieldLabel htmlFor="enable-blind">
          {t("room.lobby.gameSettings.blindModeSwitch.label")}
        </FieldLabel>
      </div>
      <FieldDescription>
        {t("room.lobby.gameSettings.blindModeSwitch.description")}
      </FieldDescription>
    </Field>
  );
}
