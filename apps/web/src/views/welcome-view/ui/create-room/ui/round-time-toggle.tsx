import { useTranslation } from "react-i18next";

import { Field, FieldLabel } from "@/shared/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

type RoundTimeToggleProps = {
  value: string;
  onValueChange: (value: string[]) => void;
  disabled: boolean;
};

export function RoundTimeToggle({
  disabled,
  onValueChange,
  value,
}: RoundTimeToggleProps) {
  const { t } = useTranslation();
  return (
    <Field>
      <FieldLabel>{t("welcome.createRoom.roundTime")}</FieldLabel>
      <ToggleGroup
        value={[value]}
        onValueChange={onValueChange}
        disabled={disabled}
        variant={"outline"}
      >
        <ToggleGroupItem value="30">30</ToggleGroupItem>
        <ToggleGroupItem value="60">60</ToggleGroupItem>
        <ToggleGroupItem value="90">90</ToggleGroupItem>
      </ToggleGroup>
    </Field>
  );
}
