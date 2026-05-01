import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

type WelcomeViewProps = {
  createRoomSlot: React.ReactNode;
  joinRoomSlot: React.ReactNode;
  children?: React.ReactNode;
};

export function WelcomeView({
  createRoomSlot,
  joinRoomSlot,
  children,
}: WelcomeViewProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:mt-[10vh] mt-4">
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col"
        orientation="horizontal"
      >
        <TabsList className={"w-full"}>
          <TabsTrigger value="create">Новая игра</TabsTrigger>
          <TabsTrigger value="join">Присоединиться</TabsTrigger>
        </TabsList>
        <TabsContent value="create">{createRoomSlot}</TabsContent>
        <TabsContent value="join">{joinRoomSlot}</TabsContent>
      </Tabs>

      <div className="mt-auto">{children}</div>
    </div>
  );
}
