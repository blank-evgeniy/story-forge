import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function NotFoundView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-muted-foreground/30 text-8xl font-bold">404</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">{t("notFound.heading")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("notFound.description")}
        </p>
      </div>
      <Button render={<Link to="/" />}>{t("notFound.backToHome")}</Button>
    </div>
  );
}
