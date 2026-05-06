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

export function useStoryPlayer() {
  const stories = useRoomStore((store) => store.allStories);

  const [storyIdx, setStoryIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(-1);
  const [finished, setFinished] = useState(false);

  const currentStory = stories[storyIdx];
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (finished) return;

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
  }, [msgIdx, storyIdx, finished, currentStory.sentences, stories.length]);

  return { currentStory, shown: msgIdx + 1, finished, storyIdx };
}
