import { useEffect, useRef, useState } from "react";

import { useRoomStore } from "../../model/use-room-store";

const MESSAGE_DELAY = 3000; // ms
const STORY_OUT_DELAY = 5000; // ms

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
    const delay = isLastMessage ? STORY_OUT_DELAY : MESSAGE_DELAY;

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
  }, [
    msgIdx,
    storyIdx,
    finished,
    currentStory.sentences.length,
    stories.length,
  ]);

  return { currentStory, shown: msgIdx + 1, finished, storyIdx };
}
