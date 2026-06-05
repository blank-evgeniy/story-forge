import { beforeEach, describe, expect, jest, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    delete: mock(),
    getContext: mock(),
    send: mock(),
    unregisterSocket: mock(),
  },
}));

mock.module("../../round/tryFinishRound", () => ({
  tryFinishRound: mock(),
}));

import { EMPTY_ROOM_CLEANUP_DELAY_MS } from "../../../../model/consts";
import { roomManager } from "../../../rooms";
import { tryFinishRound } from "../../round/tryFinishRound";
import { onClose } from "../onClose";
import { makeRoom, makeWs } from "./helpers";

describe("onClose handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.send as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
    (tryFinishRound as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onClose(makeWs());

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("deletes player from room if status is lobby", () => {
    const room = makeRoom({ status: "lobby" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onClose(makeWs());

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_left",
    });
  });

  test("sets player status to disconnected and calls tryFinishRound if status is writing", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player: room.players.get("p1")!,
      playerId: "p1",
      room,
    });

    onClose(makeWs());

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_disconnected",
    });
    expect(room.players.get("p1")?.connected).toBe(false);

    expect(tryFinishRound).toHaveBeenCalledWith(room);
  });

  test("sets player status to disconnected and does not call tryFinishRound if status is reveal", () => {
    const room = makeRoom({ status: "reveal" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player: room.players.get("p1")!,
      playerId: "p1",
      room,
    });

    onClose(makeWs());

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_disconnected",
    });
    expect(room.players.get("p1")?.connected).toBe(false);

    expect(tryFinishRound).not.toHaveBeenCalled();
  });

  test("deletes room if there are no players", () => {
    jest.useFakeTimers();

    const room = makeRoom({
      players: new Map([
        [
          "p1",
          {
            color: "red",
            connected: true,
            icon: "A",
            id: "p1",
            turnOrder: 1,
            username: "Alice",
            ws: makeWs(),
          },
        ],
      ]),
    });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      player: room.players.get("p1")!,
      playerId: "p1",
      room,
      roomCode: "1234",
    });

    onClose(makeWs());
    jest.advanceTimersByTime(EMPTY_ROOM_CLEANUP_DELAY_MS);

    expect(roomManager.delete).toHaveBeenCalledWith("1234");

    jest.useRealTimers();
  });

  test("unregisters socket", () => {
    const room = makeRoom({ status: "lobby" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onClose(makeWs());

    expect(roomManager.unregisterSocket).toHaveBeenCalledWith("ws-host");
  });
});
