import { useTranslation } from "react-i18next";

export function OnlineState() {
  const { t } = useTranslation();

  return (
    <div className="text-small text-surface-2 flex items-center gap-2">
      <span className="text-success">●</span>
      <span>{t("welcome.serverStatus.online")}</span>
    </div>
  );
}
