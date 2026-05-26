import { StoryRow } from "../../../database/schema";
import { InsertStorySchema, StoryListItemSchema, StorySchema } from "./schema";

export function toDbStory(input: InsertStorySchema): Omit<StoryRow, "id"> {
  return {
    ownerName: input.ownerName,
    content: JSON.stringify(input.content),
    createdAt: Date.now(),
  };
}

export function fromDbStory(row: StoryRow): StorySchema {
  return {
    ...row,
    content: JSON.parse(row.content),
  };
}

export function fromDbStoryListItem(
  row: Pick<StoryRow, "id" | "ownerName" | "createdAt">,
): StoryListItemSchema {
  return row;
}
