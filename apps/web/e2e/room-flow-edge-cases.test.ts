import { expect, test } from "@playwright/test";

import {
  makePlayerDto,
  makeRoomDto,
  makeStoryThread,
  RoomViewPage,
  setupHttpRoom,
  setupUser,
  wsSend,
} from "./pages/room-view.page";

const ALICE_ID = "player-alice-id";
const BOB_ID = "player-bob-id";

const ALICE = makePlayerDto({
  id: ALICE_ID,
  username: "Alice",
  color: "blue",
  icon: "angel",
  turnOrder: 1,
});

const BOB = makePlayerDto({
  id: BOB_ID,
  username: "Bob",
  color: "red",
  icon: "evil",
  turnOrder: 2,
});

const ROOM_CODE = "ABCD";

const MOCK_STORIES = [
  makeStoryThread("story-1", ALICE_ID, [
    { playerId: ALICE_ID, content: "Once upon a time" },
    { playerId: BOB_ID, content: "the end" },
  ]),
  makeStoryThread("story-2", BOB_ID, [
    { playerId: BOB_ID, content: "In a land far away" },
    { playerId: ALICE_ID, content: "fin" },
  ]),
];

test.describe("non-host player (Bob)", () => {
  test.beforeEach(async ({ page }) => {
    await setupUser(page, {
      id: BOB_ID,
      username: "Bob",
      color: "red",
      icon: "evil",
    });
  });

  test("sees waiting message instead of start button", async ({ page }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({ players: [ALICE, BOB], hostId: ALICE_ID }),
          });
        }
      });
    });

    await room.goto(ROOM_CODE);

    await expect(room.waitingMessage).toBeVisible();
    await expect(room.startGameBtn).not.toBeVisible();
  });

  test("transitions to writing screen when host starts the game", async ({
    page,
  }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({ players: [ALICE, BOB], hostId: ALICE_ID }),
          });
          // host starts the game from another client
          await new Promise((r) => setTimeout(r, 100));
          wsSend(ws, { type: "game_started", totalRounds: 2 });
          wsSend(ws, { type: "your_turn", prevEntry: null });
          wsSend(ws, { type: "round_started", timer: 60 });
        }
      });
    });

    await room.goto(ROOM_CODE);

    await expect(room.textarea).toBeVisible();
  });

  test("sees waiting on restart button after reveal", async ({ page }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({
              status: "reveal",
              players: [ALICE, BOB],
              hostId: ALICE_ID,
              stories: MOCK_STORIES,
            }),
          });
        }
      });
    });

    await room.goto(ROOM_CODE);
    await room.revealStartBtn.click();
    await room.nextStoryBtn.click();

    await expect(room.restartWaiting).toBeVisible();
    await expect(room.restartBtn).not.toBeVisible();
  });
});

test.describe("lobby player list", () => {
  test.beforeEach(async ({ page }) => {
    await setupUser(page, {
      id: ALICE_ID,
      username: "Alice",
      color: "blue",
      icon: "angel",
    });
  });

  test("shows new player after player_joined event", async ({ page }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({ players: [ALICE], hostId: ALICE_ID }),
          });
          await new Promise((r) => setTimeout(r, 100));
          wsSend(ws, {
            type: "player_joined",
            playerId: BOB_ID,
            username: BOB.username,
            color: BOB.color,
            icon: BOB.icon,
          });
        }
      });
    });

    await room.goto(ROOM_CODE);

    await expect(room.playerItem(BOB_ID)).toBeVisible();
  });

  test("removes player after player_left event", async ({ page }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({ players: [ALICE, BOB], hostId: ALICE_ID }),
          });
          await new Promise((r) => setTimeout(r, 100));
          wsSend(ws, { type: "player_left", playerId: BOB_ID });
        }
      });
    });

    await room.goto(ROOM_CODE);

    await expect(room.playerItem(BOB_ID)).not.toBeVisible();
  });

  test("marks player as disconnected then reconnected", async ({ page }) => {
    const room = new RoomViewPage(page);
    await setupHttpRoom(page, ROOM_CODE);

    await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
      ws.onMessage(async (raw) => {
        const event = JSON.parse(raw as string);
        if (event.type === "join_room") {
          wsSend(ws, {
            type: "room_state",
            room: makeRoomDto({ players: [ALICE, BOB], hostId: ALICE_ID }),
          });
          await new Promise((r) => setTimeout(r, 100));
          wsSend(ws, { type: "player_disconnected", playerId: BOB_ID });
          await new Promise((r) => setTimeout(r, 100));
          wsSend(ws, { type: "player_reconnected", playerId: BOB_ID });
        }
      });
    });

    await room.goto(ROOM_CODE);

    await expect(room.playerItem(BOB_ID)).toBeVisible();
  });
});
