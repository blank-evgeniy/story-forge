import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const savedStories = sqliteTable("saved_stories", {
  content: text("content").notNull(), // JSON string

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),

  id: integer("id").primaryKey({ autoIncrement: true }),

  ownerName: text("owner_name", { length: 100 }).notNull(),
});

export type NewStoryRow = typeof savedStories.$inferInsert;
export type StoryRow = typeof savedStories.$inferSelect;
