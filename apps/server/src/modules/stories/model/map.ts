import { StoryRow } from "@/database/schema";

import { StoryListItemSchema, StorySchema } from "./schema";

export function fromDbStory(row: StoryRow): StorySchema {
  return {
    ...row,
    content: JSON.parse(row.content),
  };
}

export function fromDbStoryListItem(
  row: Pick<StoryRow, "createdAt" | "id" | "ownerName">,
): StoryListItemSchema {
  return row;
}
