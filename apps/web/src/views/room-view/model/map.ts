import type { StoryThreadDto } from "@/api/ws/types";

import type { Player, Story } from "./types";
import { PLAYER_NAME_PLACEHOLDER } from "./consts";

export const mapStories = (
  players: Player[],
  storyThreads: StoryThreadDto[],
): Story[] => {
  const stories: Story[] = storyThreads.map((thread) => ({
    sentences: thread.sentences.map((s) => ({
      content: s.content,
      playerName:
        players.find((player) => player.id === s.playerId)?.username ??
        PLAYER_NAME_PLACEHOLDER,
    })),
    playerName:
      players.find((player) => player.id === thread.ownerId)?.username ??
      PLAYER_NAME_PLACEHOLDER,
    id: thread.id,
  }));

  return stories;
};
