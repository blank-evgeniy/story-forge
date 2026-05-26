import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { savedStories } from "../../../database/schema";

const storyContentSchema = z.array(
  z.object({
    playerName: z.string(),
    sentence: z.string(),
  }),
);

export const insertStorySchema = createInsertSchema(savedStories, {
  content: storyContentSchema,
});

export type InsertStorySchema = z.infer<typeof insertStorySchema>;

export const storySchema = createSelectSchema(savedStories, {
  content: storyContentSchema,
});

export type StorySchema = z.infer<typeof storySchema>;

export const storyListItemSchema = storySchema.pick({
  id: true,
  ownerName: true,
  createdAt: true,
});

export type StoryListItemSchema = z.infer<typeof storyListItemSchema>;
