import { act, renderHook } from "@testing-library/react";

import type { Story } from "../../../model/types";

import {
  type RoomState,
  useRoomStore,
} from "../../../model/store/use-room-store";
import { useStoryPlayer } from "./use-story-player";

vi.mock("../../../model/store/use-room-store", () => ({
  useRoomStore: vi.fn(),
}));

const FIRST_ENTRY_DELAY = 1200;
const BASE_DELAY = 1500;
const MS_PER_CHAR = 50;
const MAX_DELAY = 8000;

function readingDelay(content: string) {
  return Math.min(BASE_DELAY + content.length * MS_PER_CHAR, MAX_DELAY);
}

function makeStory(id: string, ...contents: string[]): Story {
  return {
    id,
    playerName: "Alice",
    entries: contents.map((content) => ({
      type: "player" as const,
      content,
      player: {
        username: "Alice",
        color: "blue" as const,
        icon: "angel" as const,
      },
    })),
  };
}

function setStories(stories: Story[]) {
  vi.mocked(useRoomStore).mockImplementation((selector) =>
    selector({ allStories: stories } as RoomState),
  );
}

const mockSpeechSynthesis = { cancel: vi.fn(), speak: vi.fn() };

beforeEach(() => {
  vi.useFakeTimers();
  setStories([]);

  Object.defineProperty(window, "speechSynthesis", {
    value: mockSpeechSynthesis,
    writable: true,
    configurable: true,
  });

  global.SpeechSynthesisUtterance = vi.fn().mockImplementation(function (
    this: SpeechSynthesisUtterance,
    text?: string,
  ) {
    this.text = text ?? "";
    this.pitch = 0;
    this.rate = 0;
    this.lang = "";
    this.onend = null;
  }) as never;
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("initial state", () => {
  it("returns correct values before start is called", () => {
    const story = makeStory("s1", "Hello");
    setStories([story]);

    const { result } = renderHook(() => useStoryPlayer());

    expect(result.current.started).toBe(false);
    expect(result.current.finished).toBe(false);
    expect(result.current.storyRevealed).toBe(false);
    expect(result.current.shown).toBe(0);
    expect(result.current.storyIdx).toBe(0);
    expect(result.current.currentStory).toBe(story);
    expect(result.current.allStories).toEqual([story]);
  });

  it("uses empty entries when stories list is empty", () => {
    setStories([]);
    const { result } = renderHook(() => useStoryPlayer());

    expect(result.current.currentStory).toEqual({ entries: [] });
    expect(result.current.shown).toBe(0);
  });
});

describe("timer mode", () => {
  it("does not advance entries before start is called", () => {
    setStories([makeStory("s1", "Entry")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY + 5000);
    });

    expect(result.current.shown).toBe(0);
    expect(result.current.started).toBe(false);
  });

  it("shows first entry after FIRST_ENTRY_DELAY following start", () => {
    setStories([makeStory("s1", "A", "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });

    expect(result.current.shown).toBe(1);
  });

  it("advances to next entry after reading delay proportional to content length", () => {
    setStories([makeStory("s1", "A", "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.shown).toBe(2);
  });

  it("sets storyRevealed and finished after last entry of a single story", () => {
    setStories([makeStory("s1", "A")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.storyRevealed).toBe(true);
    expect(result.current.finished).toBe(true);
  });

  it("sets storyRevealed but not finished after last entry of the first of two stories", () => {
    setStories([makeStory("s1", "A"), makeStory("s2", "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.storyRevealed).toBe(true);
    expect(result.current.finished).toBe(false);
  });

  it("caps reading delay at MAX_DELAY for very long entries", () => {
    const longContent = "x".repeat(200);
    setStories([makeStory("s1", longContent, "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });

    act(() => {
      vi.advanceTimersByTime(MAX_DELAY);
    });

    expect(result.current.shown).toBe(2);
  });

  it("does not advance entries after finished", () => {
    setStories([makeStory("s1", "A")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.finished).toBe(true);
    const shownAtFinish = result.current.shown;

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.shown).toBe(shownAtFinish);
  });
});

describe("nextStory", () => {
  it("advances to the next story and resets entryIndex and storyRevealed", () => {
    setStories([makeStory("s1", "A"), makeStory("s2", "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.storyRevealed).toBe(true);

    act(() => {
      result.current.nextStory();
    });

    expect(result.current.storyIdx).toBe(1);
    expect(result.current.storyRevealed).toBe(false);
    expect(result.current.shown).toBe(0);
  });

  it("continues advancing entries in the new story after nextStory", () => {
    setStories([makeStory("s1", "A"), makeStory("s2", "B")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });
    act(() => {
      result.current.nextStory();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("B"));
    });

    expect(result.current.storyRevealed).toBe(true);
    expect(result.current.finished).toBe(true);
  });

  it("does nothing when all stories are finished", () => {
    setStories([makeStory("s1", "A")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });
    act(() => {
      vi.advanceTimersByTime(readingDelay("A"));
    });

    expect(result.current.finished).toBe(true);

    act(() => {
      result.current.nextStory();
    });

    expect(result.current.storyIdx).toBe(0);
  });

  it("does nothing when already on the last story", () => {
    setStories([makeStory("s1", "A")]);
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });

    act(() => {
      result.current.nextStory();
    });

    expect(result.current.storyIdx).toBe(0);
  });
});

describe("start", () => {
  it("sets started to true", () => {
    const { result } = renderHook(() => useStoryPlayer());

    act(() => {
      result.current.start();
    });

    expect(result.current.started).toBe(true);
  });

  it("does not call speechSynthesis in timer mode", () => {
    const { result } = renderHook(() => useStoryPlayer({ mode: "timer" }));

    act(() => {
      result.current.start();
    });

    expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
  });
});

describe("speech mode", () => {
  it("calls speechSynthesis.cancel and speak with unlock utterance on start", () => {
    setStories([makeStory("s1", "Hello")]);
    const { result } = renderHook(() => useStoryPlayer({ mode: "speech" }));

    act(() => {
      result.current.start();
    });

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    expect(result.current.started).toBe(true);
  });

  it("advances entry index when the current utterance ends", () => {
    setStories([makeStory("s1", "Hello", "World")]);

    let lastUtterance: { onend: (() => void) | null } = { onend: null };
    vi.mocked(global.SpeechSynthesisUtterance).mockImplementation(function (
      this: SpeechSynthesisUtterance,
      text?: string,
    ) {
      this.text = text ?? "";
      this.pitch = 0;
      this.rate = 0;
      this.lang = "";
      this.onend = null;
      lastUtterance = this as never;
    });

    const { result } = renderHook(() => useStoryPlayer({ mode: "speech" }));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });

    act(() => {
      lastUtterance.onend?.();
    });

    expect(result.current.shown).toBe(2);
  });

  it("sets storyRevealed and finished when the last utterance ends in a single story", () => {
    setStories([makeStory("s1", "Only entry")]);

    let lastUtterance: SpeechSynthesisUtterance | null = null;
    vi.mocked(global.SpeechSynthesisUtterance).mockImplementation(function (
      this: SpeechSynthesisUtterance,
      text?: string,
    ) {
      this.text = text ?? "";
      this.pitch = 0;
      this.rate = 0;
      this.lang = "";
      this.onend = null;
      lastUtterance = this as never;
    });

    const { result } = renderHook(() => useStoryPlayer({ mode: "speech" }));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(FIRST_ENTRY_DELAY);
    });

    act(() => {
      lastUtterance?.onend?.(new Event("end") as SpeechSynthesisEvent);
    });

    expect(result.current.storyRevealed).toBe(true);
    expect(result.current.finished).toBe(true);
  });
});
