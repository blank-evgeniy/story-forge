import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

type WelcomeViewProps = {
  createRoomSlot: React.ReactNode;
  joinRoomSlot: React.ReactNode;
  defaultTab?: "create" | "join";
};

export function WelcomeView({
  createRoomSlot,
  joinRoomSlot,
  defaultTab = "create",
}: WelcomeViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("titles.welcome"));

  return (
    <Tabs
      defaultValue={defaultTab}
      className="mt-4 flex w-full flex-1 flex-col lg:mt-10"
      orientation="horizontal"
    >
      <TabsList className={"w-full"}>
        <TabsTrigger value="create">{t("welcome.tabs.newGame")}</TabsTrigger>
        <TabsTrigger value="join">{t("welcome.tabs.join")}</TabsTrigger>
      </TabsList>
      <TabsContent value="create">{createRoomSlot}</TabsContent>
      <TabsContent value="join">{joinRoomSlot}</TabsContent>
    </Tabs>
  );
}
