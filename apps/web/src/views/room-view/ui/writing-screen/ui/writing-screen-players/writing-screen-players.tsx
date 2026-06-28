import type { RoomPlayer } from "../../../../model/types";

import {
  PlayerCard,
  PlayerCardAvatar,
  PlayerCardTitle,
} from "../../../common/player-card";

type WritingScreenPlayersProps = {
  players: RoomPlayer[];
  submittedIds: Set<string>;
};

export function WritingScreenPlayers({
  players,
  submittedIds,
}: WritingScreenPlayersProps) {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {players.map((player) => {
        const hasSubmitted = submittedIds.has(player.id);

        return (
          <li key={player.id}>
            <PlayerCard
              color={player.color}
              icon={player.icon}
              username={player.username}
              disconnected={!player.connected}
              direction="vertical"
            >
              <PlayerCardAvatar dimmed={!hasSubmitted} />
              <PlayerCardTitle size="sm" />
            </PlayerCard>
          </li>
        );
      })}
    </ul>
  );
}
