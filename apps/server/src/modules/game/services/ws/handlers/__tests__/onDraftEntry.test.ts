import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    getContext: mock(),
  },
}));

import { roomManager } from "../../../rooms";
import { onDraftEntry } from "../onDraftEntry";
import { makeRoom, makeWs } from "./helpers";

describe("onDraftEntry handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    const room = makeRoom({ status: "writing" });
    onDraftEntry(makeWs(), { content: "hello" });

    expect(room.drafts.size).toBe(0);
  });

  test("does nothing if status is not writing", () => {
    const room = makeRoom({ status: "lobby" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onDraftEntry(makeWs(), { content: "hello" });

    expect(room.drafts.size).toBe(0);
  });

  test("does nothing if player already submitted", () => {
    const room = makeRoom({ status: "writing", submittedIds: new Set(["p1"]) });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onDraftEntry(makeWs(), { content: "hello" });

    expect(room.drafts.size).toBe(0);
  });

  test("saves draft with content and twistId", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onDraftEntry(makeWs(), { content: "my text", twistId: "twist-1" });

    expect(room.drafts.get("p1")).toEqual({ content: "my text", twistId: "twist-1" });
  });

  test("saves draft with content only", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onDraftEntry(makeWs(), { content: "my text" });

    expect(room.drafts.get("p1")).toEqual({ content: "my text", twistId: undefined });
  });

  test("overwrites an existing draft", () => {
    const room = makeRoom({ status: "writing" });
    room.drafts.set("p1", { content: "old", twistId: undefined });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onDraftEntry(makeWs(), { content: "new" });

    expect(room.drafts.get("p1")).toEqual({ content: "new", twistId: undefined });
  });
});
