import { describe, expect, it } from "vitest";

import type { StoryThreadDto } from "@/shared/api/ws/types";

import { DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_ICON } from "@/entities/player";

import type { RoomPlayer } from "../types";

import { PLAYER_NAME_PLACEHOLDER } from "../consts";
import { mapStories } from "./map-stories";

const makePlayer = (overrides?: Partial<RoomPlayer>): RoomPlayer => ({
  id: "player-1",
  username: "Alice",
  color: "blue",
  icon: "angel",
  connected: true,
  ...overrides,
});

const makeThread = (overrides?: Partial<StoryThreadDto>): StoryThreadDto => ({
  id: "thread-1",
  ownerId: "player-1",
  entries: [],
  ...overrides,
});

describe("mapStories", () => {
  it("returns empty array when there are no threads", () => {
    expect(mapStories([], [])).toEqual([]);
  });

  it("maps thread id and playerName from ownerId lookup", () => {
    const players = [makePlayer()];
    const threads = [makeThread()];

    const [story] = mapStories(players, threads);

    expect(story.id).toBe("thread-1");
    expect(story.playerName).toBe("Alice");
  });

  it("uses placeholder playerName when owner is not in players list", () => {
    const players = [makePlayer({ id: "other" })];
    const threads = [makeThread({ ownerId: "unknown" })];

    const [story] = mapStories(players, threads);

    expect(story.playerName).toBe(PLAYER_NAME_PLACEHOLDER);
  });

  it("maps a plain entry to a single player-type entry", () => {
    const players = [makePlayer()];
    const threads = [
      makeThread({
        entries: [
          { playerId: "player-1", content: "Hello", wasTimeout: false },
        ],
      }),
    ];

    const [story] = mapStories(players, threads);

    expect(story.entries).toHaveLength(1);
    expect(story.entries[0]).toMatchObject({
      type: "player",
      content: "Hello",
      player: { username: "Alice", color: "blue", icon: "angel" },
    });
  });

  it("uses fallback player data when playerId is not in players list", () => {
    const threads = [
      makeThread({
        entries: [{ playerId: "ghost", content: "Boo", wasTimeout: false }],
      }),
    ];

    const [story] = mapStories([], threads);
    const entry = story.entries[0];

    expect(entry.type).toBe("player");
    if (entry.type === "player") {
      expect(entry.player.username).toBe(PLAYER_NAME_PLACEHOLDER);
      expect(entry.player.color).toBe(DEFAULT_PLAYER_COLOR);
      expect(entry.player.icon).toBe(DEFAULT_PLAYER_ICON);
    }
  });

  it("prepends twist entry before player entry when twist is present", () => {
    const players = [makePlayer()];
    const threads = [
      makeThread({
        entries: [
          {
            playerId: "player-1",
            content: "My text",
            wasTimeout: false,
            twist: { id: "twist-1", content: "Suddenly..." },
          },
        ],
      }),
    ];

    const [story] = mapStories(players, threads);

    expect(story.entries).toHaveLength(2);
    expect(story.entries[0]).toMatchObject({
      type: "twist",
      id: "twist-1",
      content: "Suddenly...",
    });
    expect(story.entries[1]).toMatchObject({
      type: "player",
      content: "My text",
    });
  });

  it("flattens multiple entries with and without twists in correct order", () => {
    const players = [makePlayer()];
    const threads = [
      makeThread({
        entries: [
          { playerId: "player-1", content: "First", wasTimeout: false },
          {
            playerId: "player-1",
            content: "Second",
            wasTimeout: false,
            twist: { id: "t-1", content: "Twist!" },
          },
        ],
      }),
    ];

    const [story] = mapStories(players, threads);

    expect(story.entries).toHaveLength(3);
    expect(story.entries[0].type).toBe("player");
    expect(story.entries[1].type).toBe("twist");
    expect(story.entries[2].type).toBe("player");
  });

  it("maps multiple threads independently with correct owners", () => {
    const players = [
      makePlayer({ id: "p1", username: "Alice" }),
      makePlayer({ id: "p2", username: "Bob" }),
    ];
    const threads = [
      makeThread({ id: "t1", ownerId: "p1" }),
      makeThread({ id: "t2", ownerId: "p2" }),
    ];

    const result = mapStories(players, threads);

    expect(result).toHaveLength(2);
    expect(result[0].playerName).toBe("Alice");
    expect(result[1].playerName).toBe("Bob");
  });
});
