import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  onRetry?: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="text-destructive flex items-center gap-2 text-sm">
      <span>{t("welcome.serverStatus.error.message")}</span>
      <Button onClick={onRetry} size={"xs"}>
        {t("welcome.serverStatus.error.retry")}
      </Button>
    </div>
  );
}
