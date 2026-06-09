import { useTranslation } from "react-i18next";

import { CardTitle } from "@/shared/ui/card";

export function PlayerListCounter({ count }: { count: number }) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between">
      <CardTitle>{t("lobby.players")}</CardTitle>
      <span className="text-primary text-2xl font-bold">{count}</span>
    </div>
  );
}
