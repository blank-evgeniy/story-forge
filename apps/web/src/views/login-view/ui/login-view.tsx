import { useState } from "react";
import { toast } from "sonner";

import {
  PlayerAvatar,
  PlayerColorPicker,
  PlayerIconPicker,
} from "@/components/player-customization";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
  type PlayerColor,
  type PlayerIcon,
} from "@/lib/player-customization";
import { testIdAttr } from "@/lib/tests/test-id";

import { getTestId, MODULE_NAMESPACE } from "../utils/get-test-id";

type LoginViewProps = {
  onLogin: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
};

const testId = getTestId();

export function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState<PlayerColor>(DEFAULT_PLAYER_COLOR);
  const [icon, setIcon] = useState<PlayerIcon>(DEFAULT_PLAYER_ICON);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || trimmedUsername.length < 2) {
      toast.error("Введите никнейм из минимум 2 символов");
      return;
    }

    onLogin(trimmedUsername, color, icon);
  };

  return (
    <div className="mt-4 flex flex-1 justify-center lg:mt-[10vh]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-muted-foreground">Story</span>
            <span className="text-primary">Forge</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Совместное создание историй в реальном времени
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Добро пожаловать!</CardTitle>
            <CardDescription>Введите никнейм, чтобы начать</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Никнейм</FieldLabel>
                <Input
                  {...testIdAttr(testId("input-username"))}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ваше имя..."
                  autoFocus
                  autoComplete="off"
                />
              </Field>

              <PlayerAvatar
                color={color}
                icon={icon}
                size={"xl"}
                className="mx-auto"
                namespace={MODULE_NAMESPACE}
              />

              <Field>
                <FieldLabel>Цвет</FieldLabel>
                <PlayerColorPicker
                  value={color}
                  onChange={setColor}
                  namespace={MODULE_NAMESPACE}
                />
              </Field>

              <Field>
                <FieldLabel>Иконка</FieldLabel>
                <PlayerIconPicker
                  value={icon}
                  color={color}
                  onChange={setIcon}
                  namespace={MODULE_NAMESPACE}
                />
              </Field>

              <Button
                {...testIdAttr(testId("submit"))}
                type="submit"
                className="w-full"
              >
                Вперёд!
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
