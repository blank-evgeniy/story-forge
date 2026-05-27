import { useEffect, useRef, useState } from "react";

import { useRoomStore } from "../../model/use-room-store";

const FIRST_SENTENCE_DELAY = 1200;
const BASE_DELAY = 1500;
const MS_PER_CHAR = 50;
const MAX_DELAY = 8000;
const STORY_OUT_DELAY = 5000;

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
  const [msgIdx, setMsgIdx] = useState(-1);
  const [finished, setFinished] = useState(false);

  const currentStory = stories[storyIdx] ?? { sentences: [] };
  const currentSentence = currentStory.sentences[msgIdx];
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Speech mode
  useEffect(() => {
    if (mode !== "speech" || !started || finished) return;

    if (msgIdx === -1) {
      const timeout = setTimeout(() => setMsgIdx(0), FIRST_SENTENCE_DELAY);
      return () => clearTimeout(timeout);
    }

    const utterance = new SpeechSynthesisUtterance(currentSentence.content);
    utterance.pitch = 0.4;
    utterance.rate = 1.5;
    utterance.lang = "ru-RU";

    utterance.onend = () => {
      const isLastSentence = msgIdx === currentStory.sentences.length - 1;
      if (isLastSentence) {
        if (storyIdx >= stories.length - 1) {
          setFinished(true);
        } else {
          setStoryIdx((prev) => prev + 1);
          setMsgIdx(-1);
        }
      } else {
        setMsgIdx((prev) => prev + 1);
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, started, msgIdx, storyIdx, finished]);

  // Timer mode
  useEffect(() => {
    if (mode !== "timer" || !started || finished) return;

    const isLastMessage = msgIdx === currentStory.sentences.length - 1;
    const isFirstMessage = msgIdx === -1;

    let delay: number;
    if (isLastMessage) {
      delay = STORY_OUT_DELAY;
    } else if (isFirstMessage) {
      delay = FIRST_SENTENCE_DELAY;
    } else {
      delay = getReadingDelay(currentStory.sentences[msgIdx].content);
    }

    timeoutRef.current = setTimeout(() => {
      if (isLastMessage) {
        if (storyIdx >= stories.length - 1) {
          setFinished(true);
        } else {
          setStoryIdx((prev) => prev + 1);
          setMsgIdx(-1);
        }
      } else {
        setMsgIdx((prev) => prev + 1);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, started, msgIdx, storyIdx, finished]);

  const start = () => {
    if (mode === "speech") {
      const unlock = new SpeechSynthesisUtterance("");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(unlock);
    }
    setStarted(true);
  };

  return {
    allStories: stories,
    currentStory,
    shown: Math.max(0, msgIdx + 1),
    finished,
    storyIdx,
    started,
    start,
  };
}
