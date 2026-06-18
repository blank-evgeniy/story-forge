import { useTranslation } from "react-i18next";

export function CheckingState() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground animate-pulse">•</span>
      <span>{t("welcome.serverStatus.checking")}</span>
    </div>
  );
}
