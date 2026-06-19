import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    getContext: mock(),
    send: mock(),
  },
}));

import { RoomConfig } from "../../../../model/state";
import { roomManager } from "../../../rooms";
import { onEditConfig } from "../onEditConfig";
import { makeRoom, makeWs } from "./helpers";

describe("onEditConfig handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
    (roomManager.send as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onEditConfig(makeWs(), { config: makeRoom().config });

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("does nothing if the room is already started", () => {
    const room = makeRoom({ status: "writing" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    onEditConfig(makeWs(), { config: makeRoom().config });

    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("sends NOT_HOST error if the sender is not the host", () => {
    const room = makeRoom({ hostId: "p1" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p2",
      room,
    });

    onEditConfig(makeWs("p2"), { config: makeRoom().config });

    expect(roomManager.send).toHaveBeenCalledWith(
      room,
      "p2",
      expect.objectContaining({ code: "NOT_HOST_EDIT", type: "error" }),
    );
    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("broadcasts config_edited with new config", () => {
    const room = makeRoom({ hostId: "p1" });
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      playerId: "p1",
      room,
    });

    const newConfig: RoomConfig = {
      ...room.config,
      aiComment: {
        enable: true,
        mood: "comedian",
      },
    };

    onEditConfig(makeWs("p1"), { config: newConfig });

    expect(roomManager.broadcast).toHaveBeenCalledWith(
      room,
      expect.objectContaining({ type: "config_edited", config: newConfig }),
    );
  });
});
