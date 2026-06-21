import { useTranslation } from "react-i18next";

import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { FieldGroup, FieldSet } from "@/shared/ui/field";

function CreateRoomLayoutRoot({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <Card variant="glass-strong">
      <CardHeader>
        <h2 className="text-h2">{t("welcome.createRoom.heading")}</h2>
      </CardHeader>
      {children}
    </Card>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <CardContent>
      <FieldSet>
        <div className="space-y-2">
          <h3 className="text-h3">{t("welcome.createRoom.settings")}</h3>
          <p className="text-caption text-surface-2">
            {t("welcome.createRoom.settingsHint")}
          </p>
        </div>
        <FieldGroup>{children}</FieldGroup>
      </FieldSet>
    </CardContent>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="mt-auto flex flex-col items-start gap-2">
      {children}
    </CardFooter>
  );
}

export const CreateRoomLayout = Object.assign(CreateRoomLayoutRoot, {
  Content,
  Footer,
});
