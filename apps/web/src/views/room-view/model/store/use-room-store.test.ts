import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { PlayerDto, RoomDto, ServerEvent } from "@/shared/api/ws/types";

import { router } from "@/app/routes/routes";
import { usePlayerStore } from "@/entities/player";

import { useRoomStore } from "./use-room-store";

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}));

vi.mock("@/app/routes/routes", () => ({
  router: { navigate: vi.fn() },
}));

vi.mock("@/entities/player", () => ({
  usePlayerStore: {
    getState: vi.fn().mockReturnValue({ player: null }),
  },
}));

const handle = (event: ServerEvent) =>
  useRoomStore.getState().handleEvent(event);
const state = () => useRoomStore.getState();

const makePlayerDto = (overrides: Partial<PlayerDto> = {}): PlayerDto => ({
  id: "p1",
  username: "Alice",
  color: "blue",
  icon: "angel",
  connected: true,
  turnOrder: 0,
  ...overrides,
});

const makeRoomDto = (overrides: Partial<RoomDto> = {}): RoomDto => ({
  code: "ROOM1",
  status: "lobby",
  hostId: "p1",
  players: [makePlayerDto()],
  stories: [],
  round: 1,
  totalRounds: 3,
  submittedIds: [],
  config: {
    secondsPerTurn: 60,
    blindMode: false,
    enableTwists: false,
    aiComment: { enable: true },
  },
  aiComment: null,
  ...overrides,
});

beforeEach(() => {
  state().reset();
  vi.clearAllMocks();
  vi.mocked(usePlayerStore.getState).mockReturnValue({
    player: null,
  } as ReturnType<typeof usePlayerStore.getState>);
});

describe("reset", () => {
  it("restores initial state", () => {
    handle({ type: "game_started", totalRounds: 5 });
    handle({ type: "round_started", timer: 30 });

    state().reset();

    expect(state().status).toBe("idle");
    expect(state().round).toBe(0);
    expect(state().players).toEqual([]);
  });
});

describe("startReveal", () => {
  it("sets status to reveal", () => {
    state().startReveal();

    expect(state().status).toBe("reveal");
  });
});

describe("addSavedStory", () => {
  it("appends storyId to savedStories", () => {
    state().addSavedStory("story-1");
    state().addSavedStory("story-2");

    expect(state().savedStories).toEqual(["story-1", "story-2"]);
  });
});

describe("handleEvent: room_state", () => {
  it("applies room data from event", () => {
    handle({
      type: "room_state",
      room: makeRoomDto({ status: "lobby", round: 2, totalRounds: 5 }),
    });

    expect(state().status).toBe("lobby");
    expect(state().round).toBe(2);
    expect(state().totalRounds).toBe(5);
    expect(state().secondsPerTurn).toBe(60);
    expect(state().players).toHaveLength(1);
  });

  it("sets isHost to true when hostId matches current user id", () => {
    vi.mocked(usePlayerStore.getState).mockReturnValue({
      player: { id: "user-1", username: "Alice", color: "blue", icon: "angel" },
    } as ReturnType<typeof usePlayerStore.getState>);

    handle({ type: "room_state", room: makeRoomDto({ hostId: "user-1" }) });

    expect(state().isHost).toBe(true);
  });

  it("sets isHost to false when user is not host", () => {
    vi.mocked(usePlayerStore.getState).mockReturnValue({
      player: { id: "user-1", username: "Alice", color: "blue", icon: "angel" },
    } as ReturnType<typeof usePlayerStore.getState>);

    handle({ type: "room_state", room: makeRoomDto({ hostId: "user-2" }) });

    expect(state().isHost).toBe(false);
  });

  it("maps allStories when room status is reveal", () => {
    handle({
      type: "room_state",
      room: makeRoomDto({
        status: "reveal",
        stories: [
          { id: "thread-1", ownerId: "p1", entries: [] },
          { id: "thread-2", ownerId: "p2", entries: [] },
        ],
      }),
    });

    expect(state().allStories).toHaveLength(2);
    expect(state().allStories[0].id).toBe("thread-1");
  });

  it("resets previous error when receiving new room state", () => {
    handle({ type: "error", code: "SOME_ERROR", message: "Oops" });
    handle({ type: "room_state", room: makeRoomDto() });

    expect(state().error).toBeNull();
  });
});

describe("handleEvent: player_joined", () => {
  it("adds a new player to the list", () => {
    handle({
      type: "player_joined",
      playerId: "p2",
      username: "Bob",
      color: "red",
      icon: "evil",
    });

    expect(state().players).toHaveLength(1);
    expect(state().players[0]).toMatchObject({ id: "p2", username: "Bob" });
  });

  it("replaces an existing player with the same id without duplicating", () => {
    handle({ type: "room_state", room: makeRoomDto() });
    handle({
      type: "player_joined",
      playerId: "p1",
      username: "AliceUpdated",
      color: "green",
      icon: "angel",
    });

    const p1s = state().players.filter((p) => p.id === "p1");

    expect(p1s).toHaveLength(1);
    expect(p1s[0].username).toBe("AliceUpdated");
  });
});

describe("handleEvent: player_left", () => {
  it("removes the player from the list", () => {
    handle({ type: "room_state", room: makeRoomDto() });
    handle({ type: "player_left", playerId: "p1" });

    expect(state().players).toHaveLength(0);
  });
});

describe("handleEvent: player_disconnected", () => {
  it("marks the player as disconnected", () => {
    handle({ type: "room_state", room: makeRoomDto() });
    handle({ type: "player_disconnected", playerId: "p1" });

    expect(state().players[0].connected).toBe(false);
  });
});

describe("handleEvent: player_reconnected", () => {
  it("marks the player as connected again", () => {
    handle({ type: "room_state", room: makeRoomDto() });
    handle({ type: "player_disconnected", playerId: "p1" });
    handle({ type: "player_reconnected", playerId: "p1" });

    expect(state().players[0].connected).toBe(true);
  });
});

describe("handleEvent: game_started", () => {
  it("sets status to round_starting and stores totalRounds", () => {
    handle({ type: "game_started", totalRounds: 4 });

    expect(state().status).toBe("round_starting");
    expect(state().totalRounds).toBe(4);
  });
});

describe("handleEvent: round_started", () => {
  it("sets status to writing and updates secondsPerTurn", () => {
    handle({ type: "round_started", timer: 45 });

    expect(state().status).toBe("writing");
    expect(state().secondsPerTurn).toBe(45);
  });
});

describe("handleEvent: round_ended", () => {
  it("updates round, clears submittedIds, and sets status to round_starting", () => {
    handle({ type: "player_submitted", playerId: "p1" });
    handle({ type: "round_ended", nextRound: 2 });

    expect(state().round).toBe(2);
    expect(state().status).toBe("round_starting");
    expect(state().submittedIds.size).toBe(0);
  });
});

describe("handleEvent: your_turn", () => {
  it("sets prevEntry mapped from event entries", () => {
    handle({
      type: "your_turn",
      prevEntry: [
        {
          playerId: "p1",
          content: "Hello",
          wasTimeout: false,
          twist: { id: "t1", content: "Twist!" },
        },
      ],
    });

    expect(state().prevEntry).toEqual([{ entry: "Hello", twist: "Twist!" }]);
  });

  it("sets prevEntry to null when event.prevEntry is null", () => {
    handle({ type: "your_turn", prevEntry: null });

    expect(state().prevEntry).toBeNull();
  });

  it("sets twistsToChoose from event", () => {
    handle({
      type: "your_turn",
      prevEntry: null,
      twistsToChoose: [{ id: "t1", content: "A twist" }],
    });

    expect(state().twistsToChoose).toEqual([{ id: "t1", content: "A twist" }]);
  });

  it("sets twistsToChoose to null when not provided", () => {
    handle({ type: "your_turn", prevEntry: null });

    expect(state().twistsToChoose).toBeNull();
  });
});

describe("handleEvent: player_submitted", () => {
  it("adds playerId to submittedIds", () => {
    handle({ type: "player_submitted", playerId: "p1" });

    expect(state().submittedIds.has("p1")).toBe(true);
  });

  it("accumulates multiple submissions", () => {
    handle({ type: "player_submitted", playerId: "p1" });
    handle({ type: "player_submitted", playerId: "p2" });

    expect(state().submittedIds).toEqual(new Set(["p1", "p2"]));
  });
});

describe("handleEvent: player_unsubmitted", () => {
  it("removes playerId from submittedIds", () => {
    handle({ type: "player_submitted", playerId: "p1" });
    handle({ type: "player_unsubmitted", playerId: "p1" });

    expect(state().submittedIds.has("p1")).toBe(false);
  });
});

describe("handleEvent: all_revealed", () => {
  it("sets status to revealing and aiCommentStatus to loading", () => {
    handle({ type: "ai_comment_started" });

    handle({
      type: "all_revealed",
      stories: [{ id: "thread-1", ownerId: "p1", entries: [] }],
    });

    expect(state().status).toBe("revealing");
    expect(state().aiCommentStatus).toBe("loading");
  });

  it("maps stories using current players", () => {
    handle({ type: "room_state", room: makeRoomDto() });
    handle({
      type: "all_revealed",
      stories: [{ id: "thread-1", ownerId: "p1", entries: [] }],
    });

    expect(state().allStories).toHaveLength(1);
    expect(state().allStories[0].playerName).toBe("Alice");
  });
});

describe("handleEvent: ai_comment", () => {
  it("stores comment and sets status to success", () => {
    handle({ type: "ai_comment", comment: "Great story!" });

    expect(state().aiComment).toBe("Great story!");
    expect(state().aiCommentStatus).toBe("success");
  });
});

describe("handleEvent: game_restarted", () => {
  it("resets state and applies new room data", () => {
    handle({ type: "game_started", totalRounds: 5 });

    handle({
      type: "game_restarted",
      room: makeRoomDto({ status: "lobby", round: 0, hostId: "p1" }),
    });

    expect(state().status).toBe("lobby");
    expect(state().round).toBe(0);
    expect(state().aiComment).toBeNull();
    expect(state().allStories).toEqual([]);
  });

  it("sets isHost based on current user id", () => {
    vi.mocked(usePlayerStore.getState).mockReturnValue({
      player: { id: "user-1", username: "Alice", color: "blue", icon: "angel" },
    } as ReturnType<typeof usePlayerStore.getState>);

    handle({
      type: "game_restarted",
      room: makeRoomDto({ hostId: "user-1" }),
    });

    expect(state().isHost).toBe(true);
  });
});

describe("handleEvent: error", () => {
  it("sets aiCommentStatus to error for AI_FAILED code", () => {
    handle({ type: "error", code: "AI_FAILED", message: "AI error" });

    expect(state().aiCommentStatus).toBe("error");
    expect(state().error).toBeNull();
  });

  it("sets error message and calls toast.error for generic errors", () => {
    handle({ type: "error", code: "SOME_ERROR", message: "Something broke" });

    expect(state().error).toBe("Something broke");
    expect(vi.mocked(toast.error)).toHaveBeenCalledWith("Something broke");
  });

  it("navigates to / for GAME_ALREADY_STARTED code", () => {
    handle({
      type: "error",
      code: "GAME_ALREADY_STARTED",
      message: "Game started",
    });

    expect(vi.mocked(router.navigate)).toHaveBeenCalledWith({ to: "/" });
  });
});
