import { useEffect, useRef, useState } from "react";

import { useRoomStore } from "../../model/use-room-store";

const FIRST_ENTRY_DELAY = 1200;
const BASE_DELAY = 1500;
const MS_PER_CHAR = 50;
const MAX_DELAY = 8000;

function getReadingDelay(content: string): number {
  return Math.min(BASE_DELAY + content.length * MS_PER_CHAR, MAX_DELAY);
}

export type StoryPlayerMode = "speech" | "timer";

interface UseStoryPlayerOptions {
  mode?: StoryPlayerMode;
}

export function useStoryPlayer({ mode = "timer" }: UseStoryPlayerOptions = {}) {
  const stories = useRoomStore((store) => store.allStories);

  const [started, setStarted] = useState(false);
  const [storyIdx, setStoryIdx] = useState(0);
  const [entryIndex, setEntryIndex] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [storyRevealed, setStoryRevealed] = useState(false);

  const currentStory = stories[storyIdx] ?? { entries: [] };
  const currentEntry = currentStory.entries[entryIndex];
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Speech mode
  useEffect(() => {
    if (mode !== "speech" || !started || finished) return;

    if (entryIndex === -1) {
      const timeout = setTimeout(() => setEntryIndex(0), FIRST_ENTRY_DELAY);
      return () => clearTimeout(timeout);
    }

    const utterance = new SpeechSynthesisUtterance(currentEntry.content);
    utterance.pitch = 0.4;
    utterance.rate = 1.5;
    utterance.lang = "ru-RU";

    utterance.onend = () => {
      const isLastMessage = entryIndex === currentStory.entries.length - 1;
      if (isLastMessage) {
        if (storyIdx >= stories.length - 1) {
          setFinished(true);
        }
        setStoryRevealed(true);
      } else {
        setEntryIndex((prev) => prev + 1);
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, started, entryIndex, storyIdx, finished]);

  // Timer mode
  useEffect(() => {
    if (mode !== "timer" || !started || finished) return;

    const isLastMessage = entryIndex === currentStory.entries.length - 1;
    const isFirstMessage = entryIndex === -1;

    const delay = isFirstMessage
      ? FIRST_ENTRY_DELAY
      : getReadingDelay(currentStory.entries[entryIndex].content);

    timeoutRef.current = setTimeout(() => {
      if (isLastMessage) {
        if (storyIdx >= stories.length - 1) {
          setFinished(true);
        }
        setStoryRevealed(true);
      } else {
        setEntryIndex((prev) => prev + 1);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, started, entryIndex, storyIdx, finished]);

  const start = () => {
    if (mode === "speech") {
      const unlock = new SpeechSynthesisUtterance("");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(unlock);
    }
    setStarted(true);
  };

  const nextStory = () => {
    if (finished || storyIdx >= stories.length - 1) return;

    setStoryIdx((prev) => prev + 1);
    setEntryIndex(-1);
    setStoryRevealed(false);
  };

  return {
    allStories: stories,
    currentStory,
    shown: Math.max(0, entryIndex + 1),
    storyIdx,
    started,
    start,
    finished,
    storyRevealed,
    nextStory,
  };
}
