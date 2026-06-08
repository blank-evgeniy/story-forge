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

  useDocumentTitle(t("titles.error"));

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <CircleAlertIcon className="text-destructive size-16" />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">{t("error.heading")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("error.description")}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={reset}>
          {t("error.retry")}
        </Button>
        <Button render={<Link to="/" />}>{t("error.backToHome")}</Button>
      </div>
    </div>
  );
}
