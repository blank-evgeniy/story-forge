import type { PlayerEntry, StoryEntry } from "./types";

export function isPlayerEntry(entry: StoryEntry): entry is PlayerEntry {
  return entry.type === "player";
}
