import { useTranslation } from "react-i18next";

export function StartingState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm text-yellow-500">
      <span>{t("welcome.serverStatus.starting")}</span>
      <span className="animate-pulse">•</span>
    </div>
  );
}
