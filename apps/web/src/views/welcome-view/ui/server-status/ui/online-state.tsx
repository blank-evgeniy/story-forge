import { useTranslation } from "react-i18next";

export function OnlineState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-green-500">●</span>
      <span>{t("welcome.serverStatus.online")}</span>
    </div>
  );
}
