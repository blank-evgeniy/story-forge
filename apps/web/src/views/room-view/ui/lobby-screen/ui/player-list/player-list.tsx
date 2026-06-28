import type { RoomPlayer } from "@/views/room-view/model/types";

import { useTwBreakpoints } from "@/shared/hooks/use-tw-breakpoints";
import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { cn } from "@/shared/lib/utils";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

import { getTestId } from "../../../../utils/get-test-id";
import {
  PlayerCard,
  PlayerCardAvatar,
  PlayerCardTitle,
} from "../../../common/player-card";

type PlayerListProps = {
  players: RoomPlayer[];
  className?: string;
};

export const PlayerList = ({ players, className }: PlayerListProps) => {
  const testId = getTestId("player-list");
  const breakpoints = useTwBreakpoints();

  return (
    <ScrollArea className={cn("w-full overflow-auto md:h-full", className)}>
      <ul
        {...testIdAttr(testId("list"))}
        className="flex gap-3 pb-2.5 sm:grid sm:grid-cols-6 sm:items-start md:flex md:flex-col md:pb-0"
      >
        {players.map((player) => (
          <li
            key={player.id}
            {...testIdAttr(testId("item", player.id))}
            className="flex shrink-0 items-center justify-center sm:w-full md:justify-start"
          >
            <PlayerCard
              color={player.color}
              icon={player.icon}
              username={player.username}
              direction={breakpoints.smaller("md") ? "vertical" : "horizontal"}
            >
              <PlayerCardAvatar />
              <PlayerCardTitle size={breakpoints.smaller("md") ? "sm" : "md"} />
            </PlayerCard>
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" className="md:hidden" />
      <ScrollBar orientation="vertical" className="hidden md:flex" />
    </ScrollArea>
  );
};
