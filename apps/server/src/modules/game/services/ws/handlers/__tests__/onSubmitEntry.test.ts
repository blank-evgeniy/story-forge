import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    getContext: mock(),
  },
}));

mock.module("../../round/tryFinishRound", () => ({
  tryFinishRound: mock(),
}));

mock.module("../../round/twist", () => ({
  getTwistById: mock(),
}));

import { roomManager } from "../../../rooms";
import { tryFinishRound } from "../../round/tryFinishRound";
import { getTwistById } from "../../round/twist";
import { onSubmitEntry } from "../onSubmitEntry";
import { makeRoom, makeWs } from "./helpers";

function makeWritingRoom() {
  return makeRoom({
    status: "writing",
    stories: [
      { entries: [], id: "s1", ownerId: "p1" },
      { entries: [], id: "s2", ownerId: "p2" },
    ],
  });
}

describe("onSubmitEntry handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
    (tryFinishRound as ReturnType<typeof mock>).mockReset();
    (getTwistById as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onSubmitEntry(makeWs(), { content: "hello" });

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if status is not writing", () => {
    const room = makeRoom({ status: "reveal" });
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "hello" });

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if player already submitted", () => {
    const room = makeWritingRoom();
    room.submittedIds.add("p1");
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "hello" });

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("pushes entry to the correct story and marks player as submitted", () => {
    const room = makeWritingRoom();
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "my entry" });

    expect(room.stories[0].entries).toHaveLength(1);
    expect(room.stories[0].entries[0]).toMatchObject({
      content: "my entry",
      playerId: "p1",
      wasTimeout: false,
    });
    expect(room.submittedIds.has("p1")).toBe(true);
  });

  test("broadcasts player_submitted", () => {
    const room = makeWritingRoom();
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "my entry" });

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_submitted",
    });
  });

  test("calls tryFinishRound", () => {
    const room = makeWritingRoom();
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "my entry" });

    expect(tryFinishRound).toHaveBeenCalledWith(room);
  });

  test("attaches twist to entry when enableTwists is true and twistId is provided", () => {
    const room = makeWritingRoom();
    room.config.enableTwists = true;
    const player = room.players.get("p1")!;
    const twist = { content: "Write from the villain's POV", id: "twist-1" };
    (getTwistById as ReturnType<typeof mock>).mockReturnValue(twist);
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "villain text", twistId: "twist-1" });

    expect(getTwistById).toHaveBeenCalledWith("twist-1");
    expect(room.stories[0].entries[0].twist).toEqual(twist);
  });

  test("does not attach twist when enableTwists is false", () => {
    const room = makeWritingRoom();
    room.config.enableTwists = false;
    const player = room.players.get("p1")!;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player,
      playerId: "p1",
      room,
    });

    onSubmitEntry(makeWs(), { content: "text", twistId: "twist-1" });

    expect(getTwistById).not.toHaveBeenCalled();
    expect(room.stories[0].entries[0].twist).toBeUndefined();
  });
});
