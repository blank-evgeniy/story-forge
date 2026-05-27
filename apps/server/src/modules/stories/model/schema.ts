import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { savedStories } from "@/database/schema";

const storyContentSchema = z.array(
  z.object({
    playerName: z.string(),
    sentence: z.string(),
    twist: z.string().optional(),
  }),
);

export type StoryContentSchema = z.infer<typeof storyContentSchema>;

export const insertStorySchema = createInsertSchema(savedStories, {
  content: storyContentSchema,
});

export type InsertStorySchema = z.infer<typeof insertStorySchema>;

export const storySchema = createSelectSchema(savedStories, {
  content: storyContentSchema,
});

export type StorySchema = z.infer<typeof storySchema>;

export const storyListItemSchema = storySchema.pick({
  createdAt: true,
  id: true,
  ownerName: true,
});

export type StoryListItemSchema = z.infer<typeof storyListItemSchema>;
