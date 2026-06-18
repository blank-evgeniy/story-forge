import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import type { PlayerColor, PlayerIcon } from "@/entities/player";

import { PlayerForm } from "@/entities/player";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { MODULE_NAMESPACE } from "../utils/get-test-id";

type LoginViewProps = {
  onLogin: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
};

export function LoginView({ onLogin }: LoginViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("titles.login"));

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
            <PlayerForm
              onSubmit={onLogin}
              mode="create"
              namespace={MODULE_NAMESPACE}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
