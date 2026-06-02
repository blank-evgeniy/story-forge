import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WelcomeViewProps = {
  createRoomSlot: React.ReactNode;
  joinRoomSlot: React.ReactNode;
  serverStatusSlot?: React.ReactNode;
  defaultTab?: "create" | "join";
};

export function WelcomeView({
  createRoomSlot,
  joinRoomSlot,
  serverStatusSlot,
  defaultTab = "create",
}: WelcomeViewProps) {
  return (
    <div className="mt-4 flex flex-1 flex-col gap-4 lg:mt-[10vh]">
      <Tabs
        defaultValue={defaultTab}
        className="flex w-full flex-col"
        orientation="horizontal"
      >
        <TabsList className={"w-full"}>
          <TabsTrigger value="create">Новая игра</TabsTrigger>
          <TabsTrigger value="join">Присоединиться</TabsTrigger>
        </TabsList>
        <TabsContent value="create">{createRoomSlot}</TabsContent>
        <TabsContent value="join">{joinRoomSlot}</TabsContent>
      </Tabs>

      <div className="mt-auto">{serverStatusSlot}</div>
    </div>
  );
}
