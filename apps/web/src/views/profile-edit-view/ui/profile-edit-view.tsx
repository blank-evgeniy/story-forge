import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import type { PlayerColor, PlayerIcon } from "@/entities/player";

import { PlayerForm } from "@/entities/player";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";

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
  const { t } = useTranslation();

  useDocumentTitle(t("titles.profileEdit"));

  return (
    <div className="mt-4 flex flex-1 justify-center md:mt-[10vh]">
      <div className="w-full max-w-sm">
        <Card className="shadow-md">
          <CardHeader>
            <h1 className="text-h2">{t("profile.heading")}</h1>
            <p className="text-body text-surface-2">{t("profile.subtitle")}</p>
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

          <CardFooter className="border-t">
            <Button
              type="button"
              variant="danger"
              className={"w-full"}
              onClick={onLogout}
            >
              {t("profile.logout")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
