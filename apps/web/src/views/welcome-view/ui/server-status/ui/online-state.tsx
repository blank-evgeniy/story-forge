import { useTranslation } from "react-i18next";

export function OnlineState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm text-green-500">
      <span>{t("welcome.serverStatus.online")}</span>
      <span>●</span>
    </div>
  );
}
