import type { StoryThreadDto } from "@/shared/api/ws/types";

import { DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_ICON } from "@/entities/player";

import type { RoomPlayer, Story, StoryEntry } from "../types";

import { PLAYER_NAME_PLACEHOLDER } from "../consts";

export const mapStories = (
  players: RoomPlayer[],
  storyThreads: StoryThreadDto[],
): Story[] => {
  const stories: Story[] = storyThreads.map((thread) => ({
    entries: thread.entries.flatMap((s) => {
      const player = players.find((player) => player.id === s.playerId) ?? {
        username: PLAYER_NAME_PLACEHOLDER,
        color: DEFAULT_PLAYER_COLOR,
        icon: DEFAULT_PLAYER_ICON,
      };

      const playerEntry: StoryEntry = {
        content: s.content,
        player,
        type: "player" as const,
      };

      if (s.twist) {
        const twistEntry: StoryEntry = {
          id: s.twist.id,
          content: s.twist.content,
          type: "twist" as const,
        };

        return [twistEntry, playerEntry];
      }

      return [playerEntry];
    }),
    playerName:
      players.find((player) => player.id === thread.ownerId)?.username ??
      PLAYER_NAME_PLACEHOLDER,
    id: thread.id,
  }));

  return stories;
};
