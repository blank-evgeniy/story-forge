import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    getContext: mock(),
  },
}));

import { roomManager } from "../../../rooms";
import { onRequestState } from "../onRequestState";
import { makeRoom, makeWs } from "./helpers";

describe("onRequestState handler", () => {
  beforeEach(() => {
    (roomManager.getContext as ReturnType<typeof mock>).mockReset();
  });

  test("does nothing if context is not found", () => {
    const ws = makeWs();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue(null);

    onRequestState(ws);

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).not.toHaveBeenCalled();
  });

  test("sends room_state with serialized room", () => {
    const ws = makeWs();
    const room = makeRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      room,
    });

    onRequestState(ws);

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(
      (
        (ws as unknown as { send: ReturnType<typeof mock> }).send as ReturnType<
          typeof mock
        >
      ).mock.calls[0][0] as string,
    );
    expect(payload.type).toBe("room_state");
    expect(payload.room).toMatchObject({ code: "1234", status: "lobby" });
  });

  test("serialized room omits ws and timer fields", () => {
    const ws = makeWs();
    const room = makeRoom();
    (roomManager.getContext as ReturnType<typeof mock>).mockReturnValue({
      room,
    });

    onRequestState(ws);

    const payload = JSON.parse(
      (
        (ws as unknown as { send: ReturnType<typeof mock> }).send as ReturnType<
          typeof mock
        >
      ).mock.calls[0][0] as string,
    );
    expect(payload.room.timer).toBeUndefined();
    payload.room.players.forEach((p: Record<string, unknown>) => {
      expect(p.ws).toBeUndefined();
    });
  });
});
