import { expect, test, WebSocketRoute } from "@playwright/test";

import type {
  ClientEvent,
  PlayerDto,
  RoomDto,
  RoomStatusDto,
  ServerEvent,
  StoryThreadDto,
} from "../src/shared/api/ws/types";

import { getTestIdGenerator } from "../src/shared/lib/tests/test-id-generator";

// Player data
const ALICE_ID = "player-alice-id";
const BOB_ID = "player-bob-id";

const ALICE_BASE = {
  username: "Alice",
  color: "blue",
  icon: "angel",
} as const;
const ALICE_DTO: PlayerDto = {
  ...ALICE_BASE,
  id: ALICE_ID,
  connected: true,
  turnOrder: 1,
};

const BOB_BASE = {
  username: "Bob",
  id: BOB_ID,
  color: "red",
  icon: "evil",
} as const;

const ROOM_CODE = "ABCD";

const roomViewTestId = getTestIdGenerator("room-view");

const testIds = {
  lobbyStart: roomViewTestId("start-game-action")("start"),
  writingTextarea: roomViewTestId("writing-screen-input")("textarea"),
  writingSubmit: roomViewTestId("writing-screen-input")("submit"),
  revealReadyStart: roomViewTestId("reveal-ready-screen")("start"),
  storyActionsNext: roomViewTestId("story-actions")("next"),
  revealRestart: roomViewTestId("restart-game-action")("restart"),
  lobbyWaiting: roomViewTestId("start-game-action")("waiting-message"),
};

function wsSend(ws: WebSocketRoute, event: ServerEvent) {
  ws.send(JSON.stringify(event));
}

function makeRoomDto(
  overrides: {
    status?: RoomStatusDto;
    round?: number;
    totalRounds?: number;
  } = {},
): RoomDto {
  return {
    code: ROOM_CODE,
    status: overrides.status ?? "lobby",
    hostId: ALICE_ID,
    players: [ALICE_DTO],
    stories: [],
    round: overrides.round ?? 1,
    totalRounds: overrides.totalRounds ?? 2,
    submittedIds: [],
    config: {
      secondsPerTurn: 60,
      blindMode: false,
      enableTwists: false,
      aiComment: { enable: false },
    },
    aiComment: null,
  };
}

const MOCK_STORIES: StoryThreadDto[] = [
  {
    id: "story-1",
    ownerId: ALICE_ID,
    entries: [
      { playerId: ALICE_ID, content: "Hi", wasTimeout: false },
      {
        playerId: BOB_ID,
        content: "Hi",
        wasTimeout: false,
      },
    ],
  },
  {
    id: "story-2",
    ownerId: BOB_ID,
    entries: [
      { playerId: BOB_ID, content: "Hi", wasTimeout: false },
      {
        playerId: ALICE_ID,
        content: "Hi",
        wasTimeout: false,
      },
    ],
  },
];

// zustand persist
test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    (user) => {
      localStorage.setItem(
        "user-storage",
        JSON.stringify({ state: { user }, version: 1 }),
      );
    },
    { id: ALICE_ID, username: "Alice", color: "blue", icon: "angel" },
  );
});

test("full flow (host): lobby → writing → reveal → restart → lobby", async ({
  page,
}) => {
  const sentMessages: ClientEvent[] = [];

  // HTTP
  await page.route("http://localhost:3000/rooms/ABCD", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ code: ROOM_CODE, status: "lobby" }),
    }),
  );

  // WebSocket
  await page.routeWebSocket("ws://localhost:3000/ws", (ws) => {
    ws.onMessage(async (raw) => {
      sentMessages.push(JSON.parse(raw as string));
      const event = JSON.parse(raw as string);

      if (event.type === "join_room") {
        wsSend(ws, { type: "room_state", room: makeRoomDto() });
        await new Promise((r) => setTimeout(r, 200));
        wsSend(ws, {
          type: "player_joined",
          playerId: BOB_ID,
          username: BOB_BASE.username,
          color: BOB_BASE.color,
          icon: BOB_BASE.icon,
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
    await page.goto("/room/ABCD");

    const startBtn = page.getByTestId(testIds.lobbyStart);
    const waitingMessage = page.getByTestId(testIds.lobbyWaiting);

    await expect(startBtn).toBeVisible();
    await expect(waitingMessage).not.toBeVisible();

    await expect(startBtn).not.toBeDisabled();

    await startBtn.click();
  });

  await test.step("writing (1/2 round): fill textarea and submit entry", async () => {
    const textarea = page.getByTestId(testIds.writingTextarea);
    await expect(textarea).toBeVisible();

    await textarea.fill("Story Start");
    await page.getByTestId(testIds.writingSubmit).click();
  });

  await test.step("writing (2/2 round): fill textarea and submit entry", async () => {
    const textarea = page.getByTestId(testIds.writingTextarea);
    await expect(textarea).toBeVisible();

    await textarea.fill("Story End");
    await page.getByTestId(testIds.writingSubmit).click();
  });

  await test.step("reveal ready: start reveal", async () => {
    const revealStartBtn = page.getByTestId(testIds.revealReadyStart);
    await expect(revealStartBtn).toBeVisible();
    await revealStartBtn.click();
  });

  await test.step("reveal: story 1 — advance to next", async () => {
    const nextStoryBtn = page.getByTestId(testIds.storyActionsNext);
    await expect(nextStoryBtn).toBeVisible();
    await nextStoryBtn.click();
  });

  await test.step("reveal: story 2 — finish and restart", async () => {
    const restartBtn = page.getByTestId(testIds.revealRestart);
    await expect(restartBtn).toBeVisible();
    await restartBtn.click();
  });

  await test.step("lobby: verify returned after restart", async () => {
    await expect(page.getByTestId(testIds.lobbyStart)).toBeVisible();
  });

  await test.step("verify sent WS messages", async () => {
    expect(sentMessages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "join_room",
          code: ROOM_CODE,
          playerId: ALICE_ID,
          ...ALICE_BASE,
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
