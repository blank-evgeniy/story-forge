import { StoryRow } from "@/database/schema";

import { InsertStorySchema, StoryListItemSchema, StorySchema } from "./schema";

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

export function toDbStory(input: InsertStorySchema): Omit<StoryRow, "id"> {
  return {
    content: JSON.stringify(input.content),
    createdAt: Date.now(),
    ownerName: input.ownerName,
  };
}
