import { isPlayerSentence } from "@/views/room-view/model/type-guards";
import type { Sentence } from "@/views/room-view/model/types";

export type SentenceWithSide = {
  sentence: Sentence;
  side?: "left" | "right";
};

export function assignSides(sentences: Sentence[]): SentenceWithSide[] {
  let playerIndex = 0;

  return sentences.map((sentence) => {
    if (isPlayerSentence(sentence)) {
      return { sentence, side: playerIndex++ % 2 === 0 ? "left" : "right" };
    }
    return { sentence };
  });
}
