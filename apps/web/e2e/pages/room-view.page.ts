import type { Locator, Page, WebSocketRoute } from "@playwright/test";

import type {
  PlayerDto,
  RoomDto,
  ServerEvent,
  StoryThreadDto,
} from "../../src/shared/api/ws/types";

import { getTestIdGenerator } from "../../src/shared/lib/tests/test-id-generator";

const tid = getTestIdGenerator("room-view");

// Test IDs

export const testIds = {
  lobby: {
    start: tid("start-game-action")("start"),
    waitingMessage: tid("start-game-action")("waiting-message"),
    roomCode: tid("room-code-viewer")("room-code"),
    playerList: tid("player-list")("list"),
    playerItem: (playerId: string) => tid("player-list")("item", playerId),
  },
  writing: {
    textarea: tid("writing-screen-input")("textarea"),
    submit: tid("writing-screen-input")("submit"),
    edit: tid("writing-screen-input")("edit"),
    round: tid("round-counter")("round"),
    twistSkip: tid("writing-screen-twist-picker")("skip"),
    twistUnset: tid("writing-screen-twist-picker")("unset"),
    twistItem: (twistId: string) =>
      tid("writing-screen-twist-picker")("item", twistId),
  },
  reveal: {
    readyStart: tid("reveal-ready-screen")("start"),
    nextStory: tid("story-actions")("next"),
    restart: tid("restart-game-action")("restart"),
    restartWaiting: tid("restart-game-action")("waiting"),
  },
} as const;

// POM

export class RoomViewPage {
  // Lobby
  readonly startGameBtn: Locator;
  readonly waitingMessage: Locator;
  readonly roomCode: Locator;
  readonly playerList: Locator;

  // Writing
  readonly textarea: Locator;
  readonly submitBtn: Locator;
  readonly editBtn: Locator;
  readonly roundCounter: Locator;
  readonly twistSkipBtn: Locator;
  readonly twistUnsetBtn: Locator;

  // Reveal
  readonly revealStartBtn: Locator;
  readonly nextStoryBtn: Locator;
  readonly restartBtn: Locator;
  readonly restartWaiting: Locator;

  constructor(readonly page: Page) {
    this.startGameBtn = page.getByTestId(testIds.lobby.start);
    this.waitingMessage = page.getByTestId(testIds.lobby.waitingMessage);
    this.roomCode = page.getByTestId(testIds.lobby.roomCode);
    this.playerList = page.getByTestId(testIds.lobby.playerList);

    this.textarea = page.getByTestId(testIds.writing.textarea);
    this.submitBtn = page.getByTestId(testIds.writing.submit);
    this.editBtn = page.getByTestId(testIds.writing.edit);
    this.roundCounter = page.getByTestId(testIds.writing.round);
    this.twistSkipBtn = page.getByTestId(testIds.writing.twistSkip);
    this.twistUnsetBtn = page.getByTestId(testIds.writing.twistUnset);

    this.revealStartBtn = page.getByTestId(testIds.reveal.readyStart);
    this.nextStoryBtn = page.getByTestId(testIds.reveal.nextStory);
    this.restartBtn = page.getByTestId(testIds.reveal.restart);
    this.restartWaiting = page.getByTestId(testIds.reveal.restartWaiting);
  }

  playerItem(playerId: string): Locator {
    return this.page.getByTestId(testIds.lobby.playerItem(playerId));
  }

  twistItem(twistId: string): Locator {
    return this.page.getByTestId(testIds.writing.twistItem(twistId));
  }

  async goto(roomCode: string) {
    await this.page.goto(`/room/${roomCode}`);
  }

  async submitEntry(content: string) {
    await this.textarea.fill(content);
    await this.submitBtn.click();
  }
}

// WS helpers

export function wsSend(ws: WebSocketRoute, event: ServerEvent) {
  ws.send(JSON.stringify(event));
}

// DTO factories

export function makePlayerDto(
  overrides: Partial<PlayerDto> & { id: string },
): PlayerDto {
  return {
    username: "Player",
    color: "blue",
    icon: "angel",
    connected: true,
    turnOrder: 1,
    ...overrides,
  };
}

export function makeRoomDto(
  overrides: Partial<
    Pick<
      RoomDto,
      | "status"
      | "round"
      | "totalRounds"
      | "config"
      | "hostId"
      | "players"
      | "submittedIds"
      | "stories"
      | "aiComment"
    >
  > = {},
): RoomDto {
  return {
    code: "ABCD",
    status: "lobby",
    hostId: "player-alice-id",
    players: [],
    stories: [],
    round: 1,
    totalRounds: 2,
    submittedIds: [],
    config: {
      secondsPerTurn: 60,
      blindMode: false,
      enableTwists: false,
      aiComment: { enable: false },
    },
    aiComment: null,
    ...overrides,
  };
}

export function makeStoryThread(
  id: string,
  ownerId: string,
  entries: Array<{ playerId: string; content: string }>,
): StoryThreadDto {
  return {
    id,
    ownerId,
    entries: entries.map((e) => ({ ...e, wasTimeout: false })),
  };
}

// User setup

export function setupUser(
  page: Page,
  user: { id: string; username: string; color: string; icon: string },
) {
  return page.addInitScript((u) => {
    localStorage.setItem(
      "user-storage",
      JSON.stringify({ state: { user: u }, version: 1 }),
    );
  }, user);
}

// HTTP setup

export function setupHttpRoom(page: Page, roomCode: string) {
  return page.route(`http://localhost:3000/rooms/${roomCode}`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ code: roomCode, status: "lobby" }),
    }),
  );
}
