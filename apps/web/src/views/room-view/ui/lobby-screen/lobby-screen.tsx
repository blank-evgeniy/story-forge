import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon, PenLineIcon } from "lucide-react";
import { useRoomStore } from "../../model/use-room-store";
import { QRCodeSVG } from "qrcode.react";

type LobbyScreenProps = {
  onStartGame: () => void;
  roomCode: string;
};

const rules = [
  {
    icon: PenLineIcon,
    title: "Одно предложение",
    description: "Каждый игрок пишет только одну фразу в истории",
  },
  {
    icon: BookOpenIcon,
    title: "Развязка",
    description: "В финале читаем истории вместе",
  },
];

export function LobbyScreen({ onStartGame, roomCode }: LobbyScreenProps) {
  const players = useRoomStore((store) => store.players);
  return (
    <div className="flex-1 flex lg:flex-row flex-col-reverse items-start gap-6 lg:py-12 py-4">
      <Card className="lg:w-1/3 w-full">
        <CardHeader className="hidden lg:flex">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-lg font-semibold">Игроки</CardTitle>
            <span className="text-2xl font-bold text-primary">
              {players.length}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="lg:flex flex-col grid grid-cols-4 gap-3">
            {players.map((player) => (
              <li key={player.id} className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>
                    {player.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden lg:inline truncate">
                  {player.username}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Правила</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 flex-1">
          <div className="grid grid-cols-2 gap-4">
            {rules.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-2 rounded-2xl bg-muted/50 p-4"
              >
                <Icon className="size-5 text-primary" />
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <Separator />

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                отсканируйте код, чтобы присоединиться
              </p>
              <div className="bg-primary/80 p-3 flex items-center justify-center rounded-lg">
                <QRCodeSVG
                  value={window.location.href}
                  size={180}
                  bgColor="transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">или</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                введите код, чтобы присоединиться
              </p>
              <div className="flex items-center justify-center gap-2">
                {roomCode.split("").map((char, i) => (
                  <div
                    key={i}
                    className="w-12 h-14 flex items-center justify-center rounded-xl bg-muted text-2xl font-bold border border-border"
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />
          <Button
            className="w-full mt-auto"
            disabled={players.length < 2}
            onClick={onStartGame}
          >
            Начать игру
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
