import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    getContext: mock(),
    send: mock(),
  },
}));

mock.module("../../round/onRoundStart", () => ({
  onRoundStart: mock(),
}));

import { roomManager } from "../../../rooms";
import { onStartGame } from "../onStartGame";
import { makeRoom, makeWs } from "./helpers";

describe("onStartGame handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.send as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onStartGame(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if the room is already started", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onStartGame(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("sends NOT_HOST error if the sender is not the host", () => {
    const room = makeRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p2",
      room,
    });

    onStartGame(makeWs());

    expect(roomManager.send).toHaveBeenCalledWith(
      room,
      "p2",
      expect.objectContaining({ code: "NOT_HOST_START", type: "error" }),
    );
    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("sends NOT_ENOUGH_PLAYERS error with only one player", () => {
    const room = makeRoom();
    room.players = new Map([["p1", room.players.get("p1")!]]);
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onStartGame(makeWs());

    expect(roomManager.send).toHaveBeenCalledWith(
      room,
      "p1",
      expect.objectContaining({ code: "NOT_ENOUGH_PLAYERS", type: "error" }),
    );
  });

  test("transitions room to writing and broadcasts game_started", () => {
    const room = makeRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onStartGame(makeWs());

    expect(room.status).toBe("writing");
    expect(room.round).toBe(1);
    expect(room.totalRounds).toBe(2);
    expect(roomManager.broadcast).toHaveBeenCalledWith(
      room,
      expect.objectContaining({ totalRounds: 2, type: "game_started" }),
    );
  });

  test("creates one story thread per player", () => {
    const room = makeRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onStartGame(makeWs());

    expect(room.stories).toHaveLength(2);
    const ownerIds = room.stories.map((s) => s.ownerId);
    expect(ownerIds).toContain("p1");
    expect(ownerIds).toContain("p2");
    room.stories.forEach((s) => expect(s.entries).toEqual([]));
  });
});
