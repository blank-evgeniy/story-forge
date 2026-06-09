import type { StoryEntry } from "@/views/room-view/model/types";

import { isPlayerEntry } from "@/views/room-view/model/types";

export type EntryWithSide = {
  entry: StoryEntry;
  side?: "left" | "right";
};

export function assignSides(entries: StoryEntry[]): EntryWithSide[] {
  let playerIndex = 0;

  return entries.map((entry) => {
    if (isPlayerEntry(entry)) {
      return {
        entry,
        side: playerIndex++ % 2 === 0 ? "left" : "right",
      };
    }
    return { entry };
  });
}
