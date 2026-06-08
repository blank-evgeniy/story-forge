import { useTranslation } from "react-i18next";

export function CheckingState() {
  const { t } = useTranslation();

  return (
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      <span>{t("welcome.serverStatus.checking")}</span>
      <span className="animate-pulse">•</span>
    </div>
  );
}
