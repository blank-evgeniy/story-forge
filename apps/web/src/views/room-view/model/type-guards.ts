import type { PlayerSentence, Sentence } from "./types";

export function isPlayerSentence(
  sentence: Sentence,
): sentence is PlayerSentence {
  return sentence.type === "player";
}
