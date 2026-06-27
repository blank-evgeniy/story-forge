import { useDocumentTitle } from "@siberiacancode/reactuse";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";

export function NotFoundView() {
  const { t } = useTranslation();

  useDocumentTitle(t("common.metadata.titles.notFound"));

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-surface-2/70 text-8xl font-bold">404</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-h1">{t("common.notFoundView.heading")}</h1>
        <p className="text-surface-2 text-body">
          {t("common.notFoundView.description")}
        </p>
      </div>
      <Button render={<Link to="/" />} nativeButton={false} variant={"primary"}>
        {t("common.notFoundView.backToHome")}
      </Button>
    </div>
  );
}
