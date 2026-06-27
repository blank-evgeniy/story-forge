import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import type { PlayerColor, PlayerIcon } from "@/entities/player";

import { PlayerForm } from "@/entities/player";
import { AppLogo } from "@/shared/ui/app-logo";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";

import { MODULE_NAMESPACE } from "../utils/get-test-id";

type LoginViewProps = {
  onLogin: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
};

export function LoginView({ onLogin }: LoginViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("common.metadata.titles.login"));

  return (
    <div className="mt-4 flex flex-1 justify-center md:mt-[10vh]">
      <div className="w-full max-w-sm">
        <div className="text-surface mb-8 flex flex-col items-center justify-center text-center">
          <AppLogo className="scale-150" />
          <p className="text-surface-2 text-h2 mt-2">{t("login.tagline")}</p>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h1 className="text-h3">{t("login.heading")}</h1>
            <p className="text-body text-surface-2">{t("login.subtitle")}</p>
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
