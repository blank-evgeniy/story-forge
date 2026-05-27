import type { Player } from "../../../model/types";

import {
  PlayerCard,
  PlayerCardAvatar,
  PlayerCardTitle,
} from "../../common/player-card";

type WritingScreenPlayersProps = {
  players: Player[];
  submitted: Set<string>;
};

export function WritingScreenPlayers({
  players,
  submitted,
}: WritingScreenPlayersProps) {
  return (
    <ul className="flex items-center gap-4 flex-wrap">
      {players.map((player) => {
        const hasSubmitted = submitted.has(player.id);

        return (
          <li key={player.id}>
            <PlayerCard
              playerName={player.username}
              disconnected={!player.connected}
              direction="vertical"
            >
              <PlayerCardAvatar variant={hasSubmitted ? "accent" : "default"} />
              <PlayerCardTitle size="sm" />
            </PlayerCard>
          </li>
        );
      })}
    </ul>
  );
}
