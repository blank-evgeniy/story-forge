import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shared/ui/field";

function CreateRoomLayoutRoot({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("welcome.createRoom.heading")}</CardTitle>
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
        <FieldLegend>{t("welcome.createRoom.settings")}</FieldLegend>
        <FieldDescription>
          {t("welcome.createRoom.settingsHint")}
        </FieldDescription>
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
