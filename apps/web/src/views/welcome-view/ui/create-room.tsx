import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CreateRoomSchema, RoundTime } from "../model/types";
import { useState } from "react";

type CreateRoomProps = {
  onCreate: (data: CreateRoomSchema) => void;
  isLoading: boolean;
};

export function CreateRoom({ onCreate, isLoading }: CreateRoomProps) {
  const [roundTime, setRoundTime] = useState<RoundTime>("60");
  const [enableBlind, setEnableBlind] = useState(true);
  const [enableTwists, setEnableTwists] = useState(true);

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
        <CardTitle className="text-lg font-semibold">
          Создать новую игру
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldLegend>Настройки игры</FieldLegend>
          <FieldDescription>
            Вы можете изменить стандартные настройки игры или создать сразу
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel>Время раунда (сек.)</FieldLabel>
              <ToggleGroup
                value={[roundTime]}
                onValueChange={(value) => setRoundTime(value[0] as RoundTime)}
              >
                <ToggleGroupItem value="30">30</ToggleGroupItem>
                <ToggleGroupItem value="60">60</ToggleGroupItem>
                <ToggleGroupItem value="90">90</ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field>
              <FieldLabel>Геймплей</FieldLabel>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableBlind}
                  onCheckedChange={setEnableBlind}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">Blind Mode</Label>
              </div>
              <FieldDescription>
                Blind Mode - режим, в котором игрокам видно только последнее
                сообщение при написании истории.
              </FieldDescription>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableTwists}
                  onCheckedChange={setEnableTwists}
                  id="enable-twists"
                />
                <Label htmlFor="enable-twists">Твисты</Label>
              </div>
              <FieldDescription>
                Твисты - это неожиданные события, которые могут произойти в
                середине игры и изменить ход истории.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={handleSubmit} isLoading={isLoading}>
          Создать
        </Button>
      </CardFooter>
    </Card>
  );
}
