import { BookOpenIcon, PenLineIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useTwBreakpoints } from "@/lib/hooks/use-tw-breakpoints";

import { useRoomActions } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { PlayerList } from "./ui/player-list";

type LobbyScreenProps = {
  roomCode: string;
};

const rules = [
  {
    icon: PenLineIcon,
    title: "Одно предложение",
    description: "Каждый пишет только одну фразу за раунд",
  },
  {
    icon: BookOpenIcon,
    title: "Развязка",
    description: "В финале все читают истории вместе",
  },
];

export function LobbyScreen({ roomCode }: LobbyScreenProps) {
  const breakpoints = useTwBreakpoints();

  const players = useRoomStore((store) => store.players);
  const isHost = useRoomStore((store) => store.isHost);

  const actions = useRoomActions();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
      {breakpoints.smaller("sm") ? (
        <PlayerList players={players} />
      ) : (
        <Card className="min-h-0 w-full lg:w-1/3">
          <CardHeader className="hidden lg:flex">
            <div className="flex w-full items-center justify-between">
              <CardTitle>Игроки</CardTitle>
              <span className="text-primary text-2xl font-bold">
                {players.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="min-h-0">
            <PlayerList players={players} />
          </CardContent>
        </Card>
      )}

      <Card
        className="flex min-h-0 w-full flex-1 flex-col"
        size={breakpoints.smaller("sm") ? "sm" : "default"}
      >
        <ScrollArea className={"overflow-auto"}>
          <CardContent className="flex flex-1 flex-col gap-6">
            <CardTitle>Правила</CardTitle>

            <div className="grid grid-cols-2 gap-4">
              {rules.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-muted/50 flex flex-col gap-2 rounded-2xl p-4"
                >
                  <Icon className="text-primary size-5" />
                  <p className="text-muted-foreground text-xs">{description}</p>
                </div>
              ))}
            </div>
            <Separator />

            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  отсканируйте код, чтобы присоединиться
                </p>
                <div className="bg-primary/80 flex items-center justify-center rounded-lg p-3">
                  <QRCodeSVG
                    value={window.location.href}
                    size={180}
                    bgColor="transparent"
                  />
                </div>
              </div>

              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground text-xs">или</span>
                <Separator className="flex-1" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  введите код, чтобы присоединиться
                </p>
                <div className="flex items-center justify-center gap-2">
                  {roomCode.split("").map((char, i) => (
                    <div
                      key={i}
                      className="bg-muted border-border flex h-14 w-12 items-center justify-center rounded-xl border text-2xl font-bold"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </ScrollArea>
        <Separator />
        <CardFooter className="mt-auto flex justify-center">
          {isHost ? (
            <Button
              className="mt-auto w-full"
              disabled={players.length < 2}
              onClick={actions.startGame}
            >
              Начать игру
            </Button>
          ) : (
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              Ждем, пока хост начнет игру <Spinner />
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
