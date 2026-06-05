import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    getContext: mock(),
  },
}));

import { roomManager } from "../../../rooms";
import { onEditEntry } from "../onEditEntry";
import { makeRoom, makeWs } from "./helpers";

// With 2 players (p1 turnOrder=1, p2 turnOrder=2) and round=1:
// getPlayerStoryIndex(room, "p1") = (1 - 1 + 2) % 2 = 0
// getPlayerStoryIndex(room, "p2") = (2 - 1 + 2) % 2 = 1
function makeWritingRoom() {
  return makeRoom({
    status: "writing",
    stories: [
      {
        entries: [{ content: "original", playerId: "p1", wasTimeout: false }],
        id: "s1",
        ownerId: "p1",
      },
      { entries: [], id: "s2", ownerId: "p2" },
    ],
    submittedIds: new Set(["p1"]),
  });
}

describe("onEditEntry handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onEditEntry(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if status is not writing", () => {
    const room = makeRoom({ status: "reveal", submittedIds: new Set(["p1"]) });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if player has not submitted", () => {
    const room = makeWritingRoom();
    room.submittedIds.delete("p1");
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if story has no entries", () => {
    const room = makeWritingRoom();
    room.stories[0].entries = [];
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if last entry is not by this player", () => {
    const room = makeWritingRoom();
    room.stories[0].entries = [
      { content: "other", playerId: "p2", wasTimeout: false },
    ];
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("pops last entry and restores it to drafts", () => {
    const room = makeWritingRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(room.stories[0].entries).toHaveLength(0);
    expect(room.drafts.get("p1")).toEqual({
      content: "original",
      twistId: undefined,
    });
    expect(room.submittedIds.has("p1")).toBe(false);
  });

  test("broadcasts player_unsubmitted", () => {
    const room = makeWritingRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_unsubmitted",
    });
  });

  test("restores twistId from the removed entry's twist", () => {
    const room = makeWritingRoom();
    room.stories[0].entries = [
      {
        content: "twisted",
        playerId: "p1",
        twist: { content: "Do the opposite", id: "twist-42" },
        wasTimeout: false,
      },
    ];
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditEntry(makeWs());

    expect(room.drafts.get("p1")).toEqual({
      content: "twisted",
      twistId: "twist-42",
    });
  });
});
