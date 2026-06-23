import { useTwBreakpoints } from "@/shared/hooks/use-tw-breakpoints";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

function LobbyScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
      {children}
    </div>
  );
}

function PlayersSidebar({
  children,
  headerSlot,
}: {
  children: React.ReactNode;
  headerSlot: React.ReactNode;
}) {
  const breakpoints = useTwBreakpoints();

  if (breakpoints.smaller("sm")) {
    return children;
  }

  return (
    <Card className="min-h-0 w-full md:w-1/3">
      <CardHeader className="hidden md:flex">{headerSlot}</CardHeader>
      <CardContent className="min-h-0">{children}</CardContent>
    </Card>
  );
}

function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex min-h-0 w-full flex-1 flex-col">{children}</Card>
  );
}

function MainSectionBody({
  rulesSlot,
  settingsSlot,
  joinSlot,
}: {
  rulesSlot?: React.ReactNode;
  settingsSlot: React.ReactNode;
  joinSlot: React.ReactNode;
}) {
  return (
    <ScrollArea className={"overflow-auto"}>
      <CardContent className="flex flex-1 flex-col gap-6">
        {rulesSlot}

        {settingsSlot}

        <Separator />

        {joinSlot}
      </CardContent>
    </ScrollArea>
  );
}

function MainSectionFooter({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="mt-auto flex justify-center border-t">
      {children}
    </CardFooter>
  );
}

export const LobbyScreenLayout = Object.assign(LobbyScreenLayoutRoot, {
  PlayersSidebar,
  MainSection,
  MainSectionBody,
  MainSectionFooter,
});
