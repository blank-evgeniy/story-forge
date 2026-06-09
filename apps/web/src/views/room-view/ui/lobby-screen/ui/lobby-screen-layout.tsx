import { useTranslation } from "react-i18next";

import { useTwBreakpoints } from "@/shared/hooks/use-tw-breakpoints";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

function LobbyScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
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
    <Card className="min-h-0 w-full lg:w-1/3">
      <CardHeader className="hidden lg:flex">{headerSlot}</CardHeader>
      <CardContent className="min-h-0">{children}</CardContent>
    </Card>
  );
}

function MainSection({ children }: { children: React.ReactNode }) {
  const breakpoints = useTwBreakpoints();

  return (
    <Card
      className="flex min-h-0 w-full flex-1 flex-col"
      size={breakpoints.smaller("sm") ? "sm" : "default"}
    >
      {children}
    </Card>
  );
}

function MainSectionBody({
  rulesSlot,
  qrSlot,
  codeSlot,
}: {
  rulesSlot: React.ReactNode;
  qrSlot: React.ReactNode;
  codeSlot: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <ScrollArea className={"overflow-auto"}>
      <CardContent className="flex flex-1 flex-col gap-6">
        {rulesSlot}

        <Separator />

        <div className="flex flex-col items-center gap-6">
          {qrSlot}

          <div className="flex w-full items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">
              {t("lobby.qr.or")}
            </span>
            <Separator className="flex-1" />
          </div>

          {codeSlot}
        </div>
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
