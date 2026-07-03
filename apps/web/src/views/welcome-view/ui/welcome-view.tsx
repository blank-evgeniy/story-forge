import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

type WelcomeViewProps = {
  children: React.ReactNode;
};

export function WelcomeView({ children }: WelcomeViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("common.metadata.titles.welcome"));

  return (
    <div className="mx-auto mt-4 flex w-full max-w-lg flex-1 flex-col justify-center gap-4">
      {children}
    </div>
  );
}
