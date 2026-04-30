import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

type WelcomeViewProps = {
  createRoomSlot: React.ReactNode;
  joinRoomSlot: React.ReactNode;
};

export function WelcomeView({
  createRoomSlot,
  joinRoomSlot,
}: WelcomeViewProps) {
  return (
    <Tabs
      defaultValue="account"
      className="w-full flex flex-col my-auto lg:mt-[10vh] mt-12"
      orientation="horizontal"
    >
      <TabsList className={"w-full"}>
        <TabsTrigger value="create">Новая игра</TabsTrigger>
        <TabsTrigger value="join">Присоединиться</TabsTrigger>
      </TabsList>
      <TabsContent value="create">{createRoomSlot}</TabsContent>
      <TabsContent value="join">{joinRoomSlot}</TabsContent>
    </Tabs>
  );
}
