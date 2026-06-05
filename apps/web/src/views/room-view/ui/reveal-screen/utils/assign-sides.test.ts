import { describe, expect, it } from "vitest";

import type { StoryEntry } from "@/views/room-view/model/types";

import { assignSides } from "./assign-sides";

const playerEntry = (content = "text"): StoryEntry => ({
  type: "player",
  content,
  player: { username: "Alice", color: "blue", icon: "angel" },
});

const twistEntry = (id = "twist-1", content = "twist"): StoryEntry => ({
  type: "twist",
  id,
  content,
});

describe("assignSides", () => {
  it("returns empty array for empty input", () => {
    expect(assignSides([])).toEqual([]);
  });

  it("assigns left to the first player entry", () => {
    const [result] = assignSides([playerEntry()]);
    expect(result.side).toBe("left");
  });

  it("assigns alternating left/right to consecutive player entries", () => {
    const result = assignSides([playerEntry(), playerEntry(), playerEntry()]);

    expect(result[0].side).toBe("left");
    expect(result[1].side).toBe("right");
    expect(result[2].side).toBe("left");
  });

  it("does not assign side to twist entries", () => {
    const [result] = assignSides([twistEntry()]);
    expect(result.side).toBeUndefined();
  });

  it("twist entries do not increment the player side counter", () => {
    const result = assignSides([
      twistEntry("t1"),
      playerEntry("p1"),
      twistEntry("t2"),
      playerEntry("p2"),
    ]);

    expect(result[0].side).toBeUndefined();
    expect(result[1].side).toBe("left");
    expect(result[2].side).toBeUndefined();
    expect(result[3].side).toBe("right");
  });

  it("preserves the original entry reference in output", () => {
    const entry = playerEntry();
    const [result] = assignSides([entry]);
    expect(result.entry).toBe(entry);
  });

  it("handles mixed entries maintaining correct alternation across twists", () => {
    const entries: StoryEntry[] = [
      twistEntry("t1", "first twist"),
      playerEntry("p1"),
      playerEntry("p2"),
      twistEntry("t2", "second twist"),
      playerEntry("p3"),
    ];

    const result = assignSides(entries);

    expect(result[0]).toEqual({ entry: entries[0] });
    expect(result[1].side).toBe("left");
    expect(result[2].side).toBe("right");
    expect(result[3]).toEqual({ entry: entries[3] });
    expect(result[4].side).toBe("left");
  });
});
