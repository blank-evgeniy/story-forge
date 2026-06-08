import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [color, setColor] = useState<PlayerColor>(DEFAULT_PLAYER_COLOR);
  const [icon, setIcon] = useState<PlayerIcon>(DEFAULT_PLAYER_ICON);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || trimmedUsername.length < 2) {
      toast.error(t("login.error.nicknameMinLength"));
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
            {t("login.tagline")}
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>{t("login.heading")}</CardTitle>
            <CardDescription>{t("login.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>{t("login.nickname.label")}</FieldLabel>
                <Input
                  {...testIdAttr(testId("input-username"))}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("login.nickname.placeholder")}
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
                <FieldLabel>{t("login.color")}</FieldLabel>
                <PlayerColorPicker
                  value={color}
                  onChange={setColor}
                  namespace={MODULE_NAMESPACE}
                />
              </Field>

              <Field>
                <FieldLabel>{t("login.icon")}</FieldLabel>
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
                {t("login.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
