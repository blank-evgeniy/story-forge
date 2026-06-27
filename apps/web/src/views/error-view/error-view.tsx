import { useDocumentTitle } from "@siberiacancode/reactuse";
import { Link } from "@tanstack/react-router";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";

type ErrorViewProps = {
  reset?: () => void;
};

export function ErrorView({ reset }: ErrorViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("common.metadata.titles.error"));

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <CircleAlertIcon className="text-danger size-16" />
      <div className="flex flex-col gap-1">
        <h1 className="text-h1">{t("common.errorView.heading")}</h1>
        <p className="text-surface-2 text-body">
          {t("common.errorView.description")}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={reset}>
          {t("common.errorView.retry")}
        </Button>
        <Button render={<Link to="/" />} nativeButton={false}>
          {t("common.errorView.backToHome")}
        </Button>
      </div>
    </div>
  );
}
