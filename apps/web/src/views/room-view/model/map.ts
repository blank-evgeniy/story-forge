import type { StoryThreadDto } from "@/api/ws/types";

import type { Player, Story } from "./types";
import { PLAYER_NAME_PLACEHOLDER } from "./consts";

export const mapStories = (
  players: Player[],
  storyThreads: StoryThreadDto[],
): Story[] => {
  const stories: Story[] = storyThreads.map((thread) => ({
    sentences: thread.sentences.flatMap((s) => {
      const sentence = {
        content: s.content,
        playerName:
          players.find((player) => player.id === s.playerId)?.username ??
          PLAYER_NAME_PLACEHOLDER,
        type: "player" as const,
      };

      if (s.twist) {
        return [
          { type: "twist" as const, content: s.twist.content, id: s.twist.id },
          sentence,
        ];
      }

      return [sentence];
    }),
    playerName:
      players.find((player) => player.id === thread.ownerId)?.username ??
      PLAYER_NAME_PLACEHOLDER,
    id: thread.id,
  }));

  return stories;
};
