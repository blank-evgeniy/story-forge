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
import { Separator } from "@/components/ui/separator";
import { type PlayerColor, type PlayerIcon } from "@/lib/player-customization";

type ProfileEditViewProps = {
  initialUsername: string;
  initialColor: PlayerColor;
  initialIcon: PlayerIcon;
  onSave: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
  onLogout: () => void;
};

export function ProfileEditView({
  initialUsername,
  initialColor,
  initialIcon,
  onSave,
  onLogout,
}: ProfileEditViewProps) {
  const [username, setUsername] = useState(initialUsername);
  const [color, setColor] = useState<PlayerColor>(initialColor);
  const [icon, setIcon] = useState<PlayerIcon>(initialIcon);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || trimmedUsername.length < 2) {
      toast.error("Введите никнейм из минимум 2 символов");
      return;
    }

    onSave(trimmedUsername, color, icon);
  };

  return (
    <div className="mt-4 flex flex-1 justify-center lg:mt-[10vh]">
      <div className="w-full max-w-sm">
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Профиль</CardTitle>
            <CardDescription>Измените никнейм или внешний вид</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Никнейм</FieldLabel>
                <Input
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
              />

              <Field>
                <FieldLabel>Цвет</FieldLabel>
                <PlayerColorPicker value={color} onChange={setColor} />
              </Field>

              <Field>
                <FieldLabel>Иконка</FieldLabel>
                <PlayerIconPicker
                  value={icon}
                  color={color}
                  onChange={setIcon}
                />
              </Field>

              <Button type="submit" className="w-full">
                Сохранить
              </Button>

              <Separator />

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={onLogout}
              >
                Выйти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
