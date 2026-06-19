import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    getContext: mock(),
    send: mock(),
  },
}));

import { roomManager } from "../../../rooms";
import { onRestartGame } from "../onRestartGame";
import { makeRoom, makeWs } from "./helpers";

describe("onRestartGame handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.send as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onRestartGame(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if status is not reveal", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onRestartGame(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("sends NOT_HOST error if sender is not the host", () => {
    const room = makeRoom({ status: "reveal" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p2",
      room,
    });

    onRestartGame(makeWs());

    expect(roomManager.send).toHaveBeenCalledWith(
      room,
      "p2",
      expect.objectContaining({ code: "NOT_HOST_RESTART", type: "error" }),
    );
    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("removes disconnected players before restart", () => {
    const room = makeRoom({ status: "reveal" });
    room.players.get("p2")!.connected = false;
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onRestartGame(makeWs());

    expect(room.players.has("p2")).toBe(false);
    expect(room.players.has("p1")).toBe(true);
  });

  test("resets room state", () => {
    const room = makeRoom({
      drafts: new Map([["p1", { content: "draft" }]]),
      round: 3,
      status: "reveal",
      stories: [{ entries: [], id: "s1", ownerId: "p1" }],
      submittedIds: new Set(["p1", "p2"]),
    });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onRestartGame(makeWs());

    expect(room.status).toBe("lobby");
    expect(room.round).toBe(1);
    expect(room.stories).toEqual([]);
    expect(room.submittedIds.size).toBe(0);
    expect(room.drafts.size).toBe(0);
  });

  test("broadcasts game_restarted with serialized room", () => {
    const room = makeRoom({ status: "reveal" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onRestartGame(makeWs());

    expect(roomManager.broadcast).toHaveBeenCalledWith(
      room,
      expect.objectContaining({ type: "game_restarted" }),
    );
    const broadcastArg = (roomManager.broadcast as ReturnType<typeof mock>).mock.calls[0][1];
    expect(broadcastArg.room).toBeDefined();
    expect(broadcastArg.room.status).toBe("lobby");
  });
});
