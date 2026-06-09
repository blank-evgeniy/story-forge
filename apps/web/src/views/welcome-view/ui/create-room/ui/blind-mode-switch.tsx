import { useTranslation } from "react-i18next";

import { FieldDescription } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

type BlindModeSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled: boolean;
};

export function BlindModeSwitch({
  checked,
  disabled,
  onCheckedChange,
}: BlindModeSwitchProps) {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}
