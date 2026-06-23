import { useTranslation } from "react-i18next";

export function PlayerListCounter({ count }: { count: number }) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-h3">{t("lobby.players")}</span>
      <span className="text-brand-400 text-2xl font-bold">{count}</span>
    </div>
  );
}
