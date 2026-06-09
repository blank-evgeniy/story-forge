import { useTranslation } from "react-i18next";

import { FieldDescription } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

type TwistsSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled: boolean;
};

export function TwistsSwitch({
  checked,
  disabled,
  onCheckedChange,
}: TwistsSwitchProps) {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}
