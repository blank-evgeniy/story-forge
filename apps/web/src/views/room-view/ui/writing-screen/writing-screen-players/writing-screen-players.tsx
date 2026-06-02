import type { Player } from "../../../model/types";

import {
  PlayerCard,
  PlayerCardAvatar,
  PlayerCardTitle,
} from "../../common/player-card";

type WritingScreenPlayersProps = {
  players: Player[];
  submittedIds: Set<string>;
};

export function WritingScreenPlayers({
  players,
  submittedIds,
}: WritingScreenPlayersProps) {
  return (
    <ul className="flex items-center gap-4 flex-wrap">
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
