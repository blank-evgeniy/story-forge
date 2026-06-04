import { eq } from "drizzle-orm";
import Elysia, { NotFoundError } from "elysia";
import z from "zod";

import { db } from "@/database/client";
import { savedStories } from "@/database/schema";
import { roomManager } from "@/modules/game/services/rooms";

import { fromDbStory, fromDbStoryListItem } from "./model/map";
import { StoryContentSchema } from "./model/schema";

export const storiesModule = new Elysia({ prefix: "/stories" })
  .get("/", async () => {
    const rows = await db
      .select({
        createdAt: savedStories.createdAt,
        id: savedStories.id,
        ownerName: savedStories.ownerName,
      })
      .from(savedStories);

    return rows.map(fromDbStoryListItem);
  })
  .get(
    "/:id",
    async ({ params }) => {
      const [row] = await db
        .select()
        .from(savedStories)
        .where(eq(savedStories.id, params.id));

      if (!row) throw new NotFoundError("Not found");

      return fromDbStory(row);
    },
    {
      params: z.object({
        id: z.coerce.number(),
      }),
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const room = roomManager.get(body.roomCode);
      if (!room) throw new NotFoundError("Room not found");

      const story = room.stories.find((s) => s.id === body.storyId);
      if (!story) throw new NotFoundError("Story not found");

      const owner = room.players.get(story.ownerId);
      if (!owner) throw new NotFoundError("Owner not found");

      const content: StoryContentSchema = story.entries.map((entry) => ({
        entry: entry.content,
        playerName: room.players.get(entry.playerId)?.username ?? "Unknown",
        twist: entry.twist?.content,
      }));

      const [created] = await db
        .insert(savedStories)
        .values({ content: JSON.stringify(content), ownerName: owner.username })
        .returning();

      return fromDbStory(created);
    },
    {
      body: z.object({
        roomCode: z.string(),
        storyId: z.string(),
      }),
    },
  );
