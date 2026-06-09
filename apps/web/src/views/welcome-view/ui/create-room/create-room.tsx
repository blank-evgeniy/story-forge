import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

import type { CreateRoomSchema, RoundTime } from "../../model/types";

type CreateRoomProps = {
  onCreate: (data: CreateRoomSchema) => void;
  isLoading: boolean;
};

export function CreateRoom({ onCreate, isLoading }: CreateRoomProps) {
  const { t } = useTranslation();
  const [roundTime, setRoundTime] = useState<RoundTime>("60");
  const [enableBlind, setEnableBlind] = useState(true);
  const [enableTwists, setEnableTwists] = useState(true);

  const handleRoundTimeChange = (value: string[]) => {
    if (value.length === 0) return;
    setRoundTime(value[0] as RoundTime);
  };

  const handleSubmit = () => {
    onCreate({
      blindMode: enableBlind,
      roundTime,
      enableTwists,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("welcome.createRoom.heading")}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldLegend>{t("welcome.createRoom.settings")}</FieldLegend>
          <FieldDescription>
            {t("welcome.createRoom.settingsHint")}
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel>{t("welcome.createRoom.roundTime")}</FieldLabel>
              <ToggleGroup
                value={[roundTime]}
                onValueChange={handleRoundTimeChange}
                disabled={isLoading}
                variant={"outline"}
              >
                <ToggleGroupItem value="30">30</ToggleGroupItem>
                <ToggleGroupItem value="60">60</ToggleGroupItem>
                <ToggleGroupItem value="90">90</ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field>
              <FieldLabel>{t("welcome.createRoom.gameplay")}</FieldLabel>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableBlind}
                  onCheckedChange={setEnableBlind}
                  id="airplane-mode"
                  disabled={isLoading}
                />
                <Label htmlFor="airplane-mode">
                  {t("welcome.createRoom.blindMode.label")}
                </Label>
              </div>
              <FieldDescription>
                {t("welcome.createRoom.blindMode.description")}
              </FieldDescription>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableTwists}
                  onCheckedChange={setEnableTwists}
                  id="enable-twists"
                  disabled={isLoading}
                />
                <Label htmlFor="enable-twists">
                  {t("welcome.createRoom.twists.label")}
                </Label>
              </div>
              <FieldDescription>
                {t("welcome.createRoom.twists.description")}
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={handleSubmit} isLoading={isLoading}>
          {t("welcome.createRoom.submit")}
        </Button>
      </CardFooter>
    </Card>
  );
}
