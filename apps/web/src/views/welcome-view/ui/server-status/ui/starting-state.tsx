import { useTranslation } from "react-i18next";

export function StartingState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="animate-pulse text-yellow-500">•</span>
      <span>{t("welcome.serverStatus.starting")}</span>
    </div>
  );
}
