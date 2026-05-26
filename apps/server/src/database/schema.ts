import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const savedStories = sqliteTable("saved_stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  ownerName: text("owner_name", { length: 100 }).notNull(),

  content: text("content").notNull(), // JSON string

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});

export type StoryRow = typeof savedStories.$inferSelect;
export type NewStoryRow = typeof savedStories.$inferInsert;
