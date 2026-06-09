import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "i18next";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type RoomState, useRoomStore } from "../../model/store/use-room-store";
import { WritingScreen } from "./writing-screen";

vi.mock("../../model/store/use-room-store", () => ({ useRoomStore: vi.fn() }));
vi.mock("../../model/context/room-actions-context", () => ({
  useRoomActions: vi.fn(),
}));
vi.mock("@siberiacancode/reactuse", () => ({
  useTimer: () => ({ minutes: 2, seconds: 30 }),
  useDebounceCallback: (fn: (...args: unknown[]) => void) => fn,
}));

import { useRoomActions } from "../../model/context/room-actions-context";
import { getTestId } from "../../utils/get-test-id";

const getRoundCounterTestId = getTestId("round-counter");
const getInputTestId = getTestId("writing-screen-input");
const getTwistPickerTestId = getTestId("writing-screen-twist-picker");

const testIds = {
  round: getRoundCounterTestId("round"),
  textarea: getInputTestId("textarea"),
  submit: getInputTestId("submit"),
  edit: getInputTestId("edit"),
  twistSkip: getTwistPickerTestId("skip"),
  twistUnset: getTwistPickerTestId("unset"),
  twistItem: (id: string) => getTwistPickerTestId("item", id),
};

const mockSubmitEntry = vi.fn();
const mockDraftEntry = vi.fn();
const mockEditEntry = vi.fn();

function setStore(overrides: Partial<RoomState> = {}) {
  const state: Partial<RoomState> = {
    round: 1,
    totalRounds: 3,
    players: [],
    submittedIds: new Set(),
    prevEntry: null,
    secondsPerTurn: 180,
    twistsToChoose: null,
    ...overrides,
  };
  vi.mocked(useRoomStore).mockImplementation((selector?) =>
    selector ? selector(state as RoomState) : state,
  );
}

function setup() {
  const user = userEvent.setup();
  render(<WritingScreen />);
  return { user };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useRoomActions).mockReturnValue({
    startGame: vi.fn(),
    submitEntry: mockSubmitEntry,
    draftEntry: mockDraftEntry,
    editEntry: mockEditEntry,
    restartGame: vi.fn(),
  });
  setStore();
});

describe("round counter", () => {
  it("displays current round and total rounds", () => {
    setStore({ round: 2, totalRounds: 4 });
    setup();
    expect(screen.getByTestId(testIds.round)).toHaveTextContent(
      i18n.t("writing.round", { round: 2, totalRounds: 4 }),
    );
  });
});

describe("text input", () => {
  it("shows textarea with first-round placeholder", () => {
    setStore({ round: 1 });
    setup();
    expect(screen.getByTestId(testIds.textarea)).toHaveAttribute(
      "placeholder",
      i18n.t("writing.input.placeholderFirst"),
    );
  });

  it("shows textarea with continuation placeholder on subsequent rounds", () => {
    setStore({ round: 2 });
    setup();
    expect(screen.getByTestId(testIds.textarea)).toHaveAttribute(
      "placeholder",
      i18n.t("writing.input.placeholderContinue"),
    );
  });

  it("submit button is disabled when textarea is empty", () => {
    setup();
    expect(screen.getByTestId(testIds.submit)).toBeDisabled();
  });

  it("submit button becomes enabled after typing", async () => {
    const { user } = setup();
    await user.type(screen.getByTestId(testIds.textarea), "Hello");
    expect(screen.getByTestId(testIds.submit)).not.toBeDisabled();
  });

  it("calls submitEntry with trimmed content on submit click", async () => {
    const { user } = setup();
    await user.type(screen.getByTestId(testIds.textarea), "  My entry  ");
    await user.click(screen.getByTestId(testIds.submit));
    expect(mockSubmitEntry).toHaveBeenCalledWith("My entry", undefined);
  });

  it("submits on Ctrl+Enter", async () => {
    const { user } = setup();
    await user.type(screen.getByTestId(testIds.textarea), "Hello");
    await user.keyboard("{Control>}{Enter}{/Control}");
    expect(mockSubmitEntry).toHaveBeenCalledWith("Hello", undefined);
  });

  it("shows edit button after submitting", async () => {
    const { user } = setup();
    await user.type(screen.getByTestId(testIds.textarea), "Hello");
    await user.click(screen.getByTestId(testIds.submit));
    expect(screen.getByTestId(testIds.edit)).toBeInTheDocument();
    expect(screen.queryByTestId(testIds.textarea)).not.toBeInTheDocument();
  });

  it("calls editEntry and restores textarea when edit is clicked", async () => {
    const { user } = setup();
    await user.type(screen.getByTestId(testIds.textarea), "Hello");
    await user.click(screen.getByTestId(testIds.submit));
    await user.click(screen.getByTestId(testIds.edit));
    expect(mockEditEntry).toHaveBeenCalledOnce();
    expect(screen.getByTestId(testIds.textarea)).toBeInTheDocument();
  });
});

describe("twist picker", () => {
  const twists = [
    { id: "t1", content: "Twist one" },
    { id: "t2", content: "Twist two" },
  ];

  beforeEach(() => {
    setStore({ twistsToChoose: twists });
  });

  it("shows twist option buttons", () => {
    setup();
    expect(screen.getByTestId(testIds.twistItem("t1"))).toHaveTextContent(
      "Twist one",
    );
    expect(screen.getByTestId(testIds.twistItem("t2"))).toHaveTextContent(
      "Twist two",
    );
  });

  it("includes twist id in submitEntry when a twist is picked", async () => {
    const { user } = setup();
    await user.click(screen.getByTestId(testIds.twistItem("t1")));
    await user.type(screen.getByTestId(testIds.textarea), "My entry");
    await user.click(screen.getByTestId(testIds.submit));
    expect(mockSubmitEntry).toHaveBeenCalledWith("My entry", "t1");
  });

  it("can unpick a twist with the unset button", async () => {
    const { user } = setup();
    await user.click(screen.getByTestId(testIds.twistItem("t1")));
    await user.click(screen.getByTestId(testIds.twistUnset));
    expect(screen.getByTestId(testIds.twistItem("t1"))).toBeInTheDocument();
  });

  it("shows skip button and hides it after skipping", async () => {
    const { user } = setup();
    expect(screen.getByTestId(testIds.twistSkip)).toBeInTheDocument();
    await user.click(screen.getByTestId(testIds.twistSkip));
    expect(screen.queryByTestId(testIds.twistSkip)).not.toBeInTheDocument();
  });

  it("submits without twist id after skipping", async () => {
    const { user } = setup();
    await user.click(screen.getByTestId(testIds.twistSkip));
    await user.type(screen.getByTestId(testIds.textarea), "No twist");
    await user.click(screen.getByTestId(testIds.submit));
    expect(mockSubmitEntry).toHaveBeenCalledWith("No twist", undefined);
  });

  it("can unskip with the unset button", async () => {
    const { user } = setup();
    await user.click(screen.getByTestId(testIds.twistSkip));
    await user.click(screen.getByTestId(testIds.twistUnset));
    expect(screen.getByTestId(testIds.twistSkip)).toBeInTheDocument();
  });
});
