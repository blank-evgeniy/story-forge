import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Player } from "../../model/types";

import { type RoomState, useRoomStore } from "../../model/use-room-store";
import { LobbyScreen } from "./lobby-screen";

vi.mock("../../model/use-room-store", () => ({ useRoomStore: vi.fn() }));
vi.mock("../../model/room-actions-context", () => ({
  useRoomActions: vi.fn(),
}));
vi.mock("@/shared/hooks/use-tw-breakpoints", () => ({
  useTwBreakpoints: () => ({ smaller: () => false }),
}));
vi.mock("qrcode.react", () => ({
  QRCodeSVG: () => <svg data-testid="qr-code" />,
}));

import { useRoomActions } from "../../model/room-actions-context";
import { getTestId } from "../../utils/get-test-id";

const getPlayerListTestId = getTestId("player-list");
const getLobbyScreenTestId = getTestId("lobby-screen");

const testIds = {
  start: getLobbyScreenTestId("start"),
  roomCode: getLobbyScreenTestId("room-code"),
  waitingMessage: getLobbyScreenTestId("waiting-message"),
  playersList: getPlayerListTestId("list"),
  playerItem: (id: string) => getPlayerListTestId("item", id),
};

const mockStartGame = vi.fn();

function makePlayer(overrides: Partial<Player> = {}): Player {
  return {
    id: "p1",
    username: "Alice",
    color: "blue",
    icon: "angel",
    connected: true,
    ...overrides,
  };
}

function setStore({
  players = [] as Player[],
  isHost = false,
}: { players?: Player[]; isHost?: boolean } = {}) {
  vi.mocked(useRoomStore).mockImplementation((selector) =>
    selector({ players, isHost } as RoomState),
  );
}

function setup(roomCode = "ABCD") {
  const user = userEvent.setup();
  render(<LobbyScreen roomCode={roomCode} />);
  return { user };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useRoomActions).mockReturnValue({
    startGame: mockStartGame,
    submitEntry: vi.fn(),
    draftEntry: vi.fn(),
    editEntry: vi.fn(),
    restartGame: vi.fn(),
  });
  setStore();
});

describe("room code", () => {
  it("renders the room code container", () => {
    setup("ABCD");
    expect(screen.getByTestId(testIds.roomCode)).toBeInTheDocument();
  });

  it("displays each character of the room code", () => {
    setup("XY12");
    const container = screen.getByTestId(testIds.roomCode);
    expect(container).toHaveTextContent("X");
    expect(container).toHaveTextContent("Y");
    expect(container).toHaveTextContent("1");
    expect(container).toHaveTextContent("2");
  });
});

describe("host view", () => {
  it("shows the start button", () => {
    setStore({
      isHost: true,
      players: [makePlayer(), makePlayer({ id: "p2", username: "Bob" })],
    });
    setup();
    expect(screen.getByTestId(testIds.start)).toBeInTheDocument();
  });

  it("disables the start button when fewer than 2 players", () => {
    setStore({ isHost: true, players: [makePlayer()] });
    setup();
    expect(screen.getByTestId(testIds.start)).toBeDisabled();
  });

  it("enables the start button when 2 or more players are present", () => {
    setStore({
      isHost: true,
      players: [makePlayer(), makePlayer({ id: "p2", username: "Bob" })],
    });
    setup();
    expect(screen.getByTestId(testIds.start)).not.toBeDisabled();
  });

  it("calls startGame when the start button is clicked", async () => {
    setStore({
      isHost: true,
      players: [makePlayer(), makePlayer({ id: "p2", username: "Bob" })],
    });
    const { user } = setup();
    await user.click(screen.getByTestId(testIds.start));
    expect(mockStartGame).toHaveBeenCalledOnce();
  });

  it("does not show the waiting message", () => {
    setStore({ isHost: true, players: [] });
    setup();
    expect(
      screen.queryByTestId(testIds.waitingMessage),
    ).not.toBeInTheDocument();
  });
});

describe("non-host view", () => {
  it("shows the waiting message", () => {
    setStore({ isHost: false });
    setup();
    expect(screen.getByTestId(testIds.waitingMessage)).toBeInTheDocument();
  });

  it("does not show the start button", () => {
    setStore({ isHost: false });
    setup();
    expect(screen.queryByTestId(testIds.start)).not.toBeInTheDocument();
  });
});

describe("player list", () => {
  it("renders player usernames", () => {
    setStore({
      isHost: false,
      players: [
        makePlayer({ id: "p1", username: "Alice" }),
        makePlayer({ id: "p2", username: "Bob" }),
      ],
    });
    setup();

    expect(screen.getByTestId(testIds.playerItem("p1"))).toBeInTheDocument();
    expect(screen.getByTestId(testIds.playerItem("p2"))).toBeInTheDocument();
  });

  it("renders nothing in the player list when no players", () => {
    setStore({ players: [] });
    setup();
    const list = screen.getByTestId(testIds.playersList);
    expect(within(list).queryByRole("listitem")).not.toBeInTheDocument();
  });
});
