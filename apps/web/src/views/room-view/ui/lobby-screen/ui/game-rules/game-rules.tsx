import { BookOpenIcon, PenLineIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CardTitle } from "@/shared/ui/card";

export function GameRules() {
  const { t } = useTranslation();

  const rules = [
    {
      icon: PenLineIcon,
      title: t("lobby.rule1.title"),
      description: t("lobby.rule1.description"),
    },
    {
      icon: BookOpenIcon,
      title: t("lobby.rule2.title"),
      description: t("lobby.rule2.description"),
    },
  ];

  return (
    <>
      <CardTitle>{t("lobby.rules")}</CardTitle>

      <div className="grid grid-cols-2 gap-4">
        {rules.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-muted/50 flex flex-col gap-2 rounded-2xl p-4"
          >
            <Icon className="text-primary size-5" />
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
