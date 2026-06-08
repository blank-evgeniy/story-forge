import { useTranslation } from "react-i18next";

import {
  type PlayerColor,
  type PlayerIcon,
} from "@/shared/consts/player-customization";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { ProfileFormBase } from "../../common/profile-form-base";

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

  return (
    <div className="mt-4 flex flex-1 justify-center lg:mt-[10vh]">
      <div className="w-full max-w-sm">
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>{t("profile.heading")}</CardTitle>
            <CardDescription>{t("profile.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileFormBase
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
              variant="destructive"
              className="w-full"
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
