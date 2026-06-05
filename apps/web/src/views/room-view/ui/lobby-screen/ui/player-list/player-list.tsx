import type { Player } from "@/views/room-view/model/types";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTwBreakpoints } from "@/lib/hooks/use-tw-breakpoints";
import { testIdAttr } from "@/lib/tests/test-id";
import { cn } from "@/lib/utils";

import { getTestId } from "../../../../utils/get-test-id";
import {
  PlayerCard,
  PlayerCardAvatar,
  PlayerCardTitle,
} from "../../../common/player-card";

type PlayerListProps = {
  players: Player[];
  className?: string;
};

export const PlayerList = ({ players, className }: PlayerListProps) => {
  const testId = getTestId("player-list");
  const breakpoints = useTwBreakpoints();

  return (
    <ScrollArea className={cn("w-full overflow-auto lg:h-full", className)}>
      <ul
        {...testIdAttr(testId("list"))}
        className="flex gap-3 pb-2.5 sm:grid sm:grid-cols-6 sm:items-start lg:flex lg:flex-col lg:pb-0"
      >
        {players.map((player) => (
          <li
            key={player.id}
            {...testIdAttr(testId("item", player.id))}
            className="flex shrink-0 items-center justify-center sm:w-full lg:justify-start"
          >
            <PlayerCard
              color={player.color}
              icon={player.icon}
              username={player.username}
              direction={breakpoints.smaller("lg") ? "vertical" : "horizontal"}
            >
              <PlayerCardAvatar />
              <PlayerCardTitle size={breakpoints.smaller("lg") ? "sm" : "md"} />
            </PlayerCard>
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" className="lg:hidden" />
      <ScrollBar orientation="vertical" className="hidden lg:flex" />
    </ScrollArea>
  );
};
