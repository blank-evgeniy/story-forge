import { useTranslation } from "react-i18next";

export function CheckingState() {
  const { t } = useTranslation();

  return (
    <div className="text-small text-surface-2 flex items-center gap-2">
      <span className="animate-pulse">•</span>
      <span>{t("welcome.serverStatus.checking")}</span>
    </div>
  );
}
