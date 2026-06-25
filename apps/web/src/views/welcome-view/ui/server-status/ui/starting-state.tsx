import { useTranslation } from "react-i18next";

export function StartingState() {
  const { t } = useTranslation();

  return (
    <div className="text-small text-warning-50 flex items-center gap-2">
      <span className="text-warning animate-pulse">•</span>
      <span>{t("welcome.serverStatus.starting")}</span>
    </div>
  );
}
