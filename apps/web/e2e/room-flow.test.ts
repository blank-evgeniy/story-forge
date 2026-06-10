import { expect, test } from "@playwright/test";

import type { ClientEvent } from "../src/shared/api/ws/types";

import {
  makePlayerDto,
  makeRoomDto,
  makeStoryThread,
  RoomViewPage,
  setupHttpRoom,
  setupUser,
  wsSend,
} from "./pages/room-view.page";

// Player data
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
    { playerId: ALICE_ID, content: "Hi" },
    { playerId: BOB_ID, content: "Hi" },
  ]),
  makeStoryThread("story-2", BOB_ID, [
    { playerId: BOB_ID, content: "Hi" },
    { playerId: ALICE_ID, content: "Hi" },
  ]),
];

test.beforeEach(async ({ page }) => {
  await setupUser(page, {
    id: ALICE_ID,
    username: ALICE.username,
    color: ALICE.color,
    icon: ALICE.icon,
  });
});

test("full flow (host): lobby → writing → reveal → restart → lobby", async ({
  page,
}) => {
  const room = new RoomViewPage(page);
  const sentMessages: ClientEvent[] = [];

  // HTTP
  await setupHttpRoom(page, ROOM_CODE);

  // WebSocket
  await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
    ws.onMessage(async (raw) => {
      sentMessages.push(JSON.parse(raw as string));
      const event = JSON.parse(raw as string);

      if (event.type === "join_room") {
        wsSend(ws, {
          type: "room_state",
          room: makeRoomDto({ players: [ALICE] }),
        });
        await new Promise((r) => setTimeout(r, 200));
        wsSend(ws, {
          type: "player_joined",
          playerId: BOB_ID,
          username: BOB.username,
          color: BOB.color,
          icon: BOB.icon,
        });
      }

      if (event.type === "start_game") {
        wsSend(ws, { type: "game_started", totalRounds: 2 });
        wsSend(ws, { type: "your_turn", prevEntry: null });
        wsSend(ws, { type: "round_started", timer: 60 });
      }

      if (event.type === "submit_entry") {
        wsSend(ws, { type: "player_submitted", playerId: ALICE_ID });
        wsSend(ws, { type: "player_submitted", playerId: BOB_ID });

        if (event.content === "Story End") {
          wsSend(ws, { type: "all_revealed", stories: MOCK_STORIES });
        } else if (event.content === "Story Start") {
          wsSend(ws, { type: "round_ended", nextRound: 2 });
          await new Promise((r) => setTimeout(r, 200));
          wsSend(ws, { type: "round_started", timer: 60 });
          wsSend(ws, { type: "your_turn", prevEntry: null });
        }
      }

      if (event.type === "restart_game") {
        wsSend(ws, { type: "game_restarted", room: makeRoomDto() });
      }
    });
  });

  await test.step("lobby: connect and start game", async () => {
    await room.goto(ROOM_CODE);

    await expect(room.startGameBtn).toBeVisible();
    await expect(room.waitingMessage).not.toBeVisible();

    await expect(room.startGameBtn).not.toBeDisabled();

    await room.startGameBtn.click();
  });

  await test.step("writing (1/2 round): fill textarea and submit entry", async () => {
    await expect(room.textarea).toBeVisible();

    await room.submitEntry("Story Start");
  });

  await test.step("writing (2/2 round): fill textarea and submit entry", async () => {
    await expect(room.textarea).toBeVisible();

    await room.submitEntry("Story End");
  });

  await test.step("reveal ready: start reveal", async () => {
    await expect(room.revealStartBtn).toBeVisible();
    await room.revealStartBtn.click();
  });

  await test.step("reveal: story 1 — advance to next", async () => {
    await expect(room.nextStoryBtn).toBeVisible();
    await room.nextStoryBtn.click();
  });

  await test.step("reveal: story 2 — finish and restart", async () => {
    await expect(room.restartBtn).toBeVisible();
    await room.restartBtn.click();
  });

  await test.step("lobby: verify returned after restart", async () => {
    await expect(room.startGameBtn).toBeVisible();
  });

  await test.step("verify sent WS messages", async () => {
    expect(sentMessages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "join_room",
          code: ROOM_CODE,
          playerId: ALICE_ID,
        }),
        expect.objectContaining({
          type: "start_game",
        }),
        expect.objectContaining({
          type: "submit_entry",
          content: "Story Start",
        }),
        expect.objectContaining({
          type: "submit_entry",
          content: "Story End",
        }),
      ]),
    );
  });
});
