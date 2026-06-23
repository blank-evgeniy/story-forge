import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";

type ErrorStateProps = {
  onRetry?: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="text-small text-danger-50 flex items-center gap-2">
      <span>{t("welcome.serverStatus.error.message")}</span>
      <Button onClick={onRetry} variant="ghost-white" size="sm">
        {t("welcome.serverStatus.error.retry")}
      </Button>
    </div>
  );
}
