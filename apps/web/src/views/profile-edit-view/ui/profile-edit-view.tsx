import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import type { PlayerColor, PlayerIcon } from "@/entities/player";
import type { ThemeName } from "@/entities/theme";

import { PlayerForm } from "@/entities/player";
import { ThemeSwitcher } from "@/entities/theme";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { PageTransition } from "@/shared/ui/page-transition";

type ProfileEditViewProps = {
  initialUsername: string;
  initialColor: PlayerColor;
  initialIcon: PlayerIcon;
  theme: ThemeName;
  onSave: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
  onThemeChange: (theme: ThemeName) => void;
  onLogout: () => void;
};

export function ProfileEditView({
  initialUsername,
  initialColor,
  initialIcon,
  theme,
  onSave,
  onThemeChange,
  onLogout,
}: ProfileEditViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("common.metadata.titles.profileEdit"));

  return (
    <PageTransition>
      <div className="flex flex-1 justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Card variant="glass-strong">
            <CardHeader>
              <h1 className="text-h2">{t("profile.editProfile.heading")}</h1>
              <p className="text-body text-surface-2">
                {t("profile.editProfile.subtitle")}
              </p>
            </CardHeader>

            <CardContent>
              <PlayerForm
                mode="edit"
                onSubmit={onSave}
                initialData={{
                  color: initialColor,
                  icon: initialIcon,
                  username: initialUsername,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-h3">{t("profile.settings.heading")}</h2>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <span className="text-small font-medium">
                {t("profile.settings.theme")}
              </span>
              <ThemeSwitcher value={theme} onChange={onThemeChange} />
            </CardContent>

            <CardFooter className="border-t">
              <Button
                type="button"
                variant="danger"
                className={"w-full"}
                onClick={onLogout}
              >
                {t("profile.settings.logout")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
