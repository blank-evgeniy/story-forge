import { mock } from "bun:test";

import type { RoomState } from "../../../../model/state";

export function makeRoom(overrides: Partial<RoomState> = {}): RoomState {
  return {
    code: "1234",
    config: {
      aiComment: {
        enable: false,
      },
      blindMode: false,
      enableTwists: false,
      secondsPerTurn: 60,
    },
    drafts: new Map(),
    hostId: "p1",
    locale: "ru",
    nextTurnOrder: 3,
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
      [
        "p2",
        {
          color: "blue",
          connected: true,
          icon: "B",
          id: "p2",
          turnOrder: 2,
          username: "Bob",
          ws: makeWs(),
        },
      ],
    ]),
    round: 1,
    status: "lobby",
    stories: [],
    submittedIds: new Set(),
    timer: null,
    ...overrides,
  };
}

export function makeWs(id = "ws-host") {
  return { id, send: mock() } as never;
}
