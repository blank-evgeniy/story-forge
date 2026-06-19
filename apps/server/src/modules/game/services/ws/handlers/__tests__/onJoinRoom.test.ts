import { beforeEach, describe, expect, mock, test } from "bun:test";

mock.module("../../../rooms", () => ({
  roomManager: {
    broadcast: mock(),
    get: mock(),
    registerSocket: mock(),
    send: mock(),
  },
}));

mock.module("../../round/sendYourTurn", () => ({
  sendYourTurn: mock(),
}));

import { MAX_PLAYERS } from "../../../../model/consts";
import { roomManager } from "../../../rooms";
import { sendYourTurn } from "../../round/sendYourTurn";
import { onJoinRoom } from "../onJoinRoom";
import { makeRoom, makeWs } from "./helpers";

function makeEvent(overrides: Partial<Parameters<typeof onJoinRoom>[1]> = {}) {
  return {
    code: "1234",
    color: "green",
    icon: "C",
    playerId: "p3",
    username: "Charlie",
    ...overrides,
  };
}

describe("onJoinRoom handler", () => {
  beforeEach(() => {
    (roomManager.get as ReturnType<typeof mock>).mockReset();
    (roomManager.broadcast as ReturnType<typeof mock>).mockReset();
    (roomManager.registerSocket as ReturnType<typeof mock>).mockReset();
    (roomManager.send as ReturnType<typeof mock>).mockReset();
    (sendYourTurn as ReturnType<typeof mock>).mockReset();
  });

  test("sends ROOM_NOT_FOUND error if room does not exist", () => {
    const ws = makeWs();
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(null);

    onJoinRoom(ws, makeEvent());

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).toHaveBeenCalledWith(
      JSON.stringify({
        code: "ROOM_NOT_FOUND",
        message: "Room not found",
        type: "error",
      }),
    );
    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("sends ROOM_FULL error if the room is at max capacity", () => {
    const ws = makeWs();
    const room = makeRoom();
    for (let i = 3; i <= MAX_PLAYERS; i++) {
      room.players.set(`p${i}`, {
        color: "red",
        connected: true,
        icon: "X",
        id: `p${i}`,
        turnOrder: i,
        username: `Player${i}`,
        ws: makeWs(),
      });
    }
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent({ playerId: "p99" }));

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).toHaveBeenCalledWith(
      JSON.stringify({
        code: "ROOM_FULL",
        message: "Room is full",
        type: "error",
      }),
    );
  });

  test("sends GAME_ALREADY_STARTED error if room is not in lobby and player is new", () => {
    const ws = makeWs();
    const room = makeRoom({ status: "writing" });
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent());

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).toHaveBeenCalledWith(
      JSON.stringify({
        code: "GAME_ALREADY_STARTED",
        message: "Game has already started",
        type: "error",
      }),
    );
    expect(roomManager.broadcast).not.toHaveBeenCalled();
  });

  test("adds new player to lobby, broadcasts player_joined, sends room_state", () => {
    const ws = makeWs();
    const room = makeRoom({ status: "lobby" });
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(
      ws,
      makeEvent({
        color: "green",
        icon: "C",
        playerId: "p3",
        username: "Charlie",
      }),
    );

    expect(room.players.has("p3")).toBe(true);
    expect(room.players.get("p3")?.username).toBe("Charlie");
    expect(room.nextTurnOrder).toBe(4);

    expect(roomManager.broadcast).toHaveBeenCalledWith(
      room,
      expect.objectContaining({
        playerId: "p3",
        type: "player_joined",
        username: "Charlie",
      }),
    );

    expect(
      (ws as unknown as { send: ReturnType<typeof mock> }).send,
    ).toHaveBeenCalledWith(expect.stringContaining('"room_state"'));
  });

  test("reconnects existing player", () => {
    const ws = makeWs("ws-new");
    const room = makeRoom({ status: "lobby" });
    const existing = room.players.get("p1")!;
    existing.connected = false;
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent({ playerId: "p1" }));

    expect(existing.ws).toBe(ws);
    expect(existing.connected).toBe(true);

    expect(roomManager.broadcast).toHaveBeenCalledWith(room, {
      playerId: "p1",
      type: "player_reconnected",
    });
  });

  test("calls sendYourTurn for reconnecting player when room is in writing status", () => {
    const ws = makeWs();
    const room = makeRoom({ status: "writing" });
    const existing = room.players.get("p1")!;
    existing.connected = false;
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent({ playerId: "p1" }));

    expect(sendYourTurn).toHaveBeenCalledWith(room, existing);
  });

  test("does not call sendYourTurn for reconnecting player when room is not writing", () => {
    const ws = makeWs();
    const room = makeRoom({ status: "reveal" });
    room.players.get("p1")!.connected = false;
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent({ playerId: "p1" }));

    expect(sendYourTurn).not.toHaveBeenCalled();
  });

  test("registers socket after successful join", () => {
    const ws = makeWs("ws-new");
    const room = makeRoom({ status: "lobby" });
    (roomManager.get as ReturnType<typeof mock>).mockReturnValue(room);

    onJoinRoom(ws, makeEvent({ code: "1234", playerId: "p3" }));

    expect(roomManager.registerSocket).toHaveBeenCalledWith(
      "ws-new",
      "p3",
      "1234",
    );
  });
});
