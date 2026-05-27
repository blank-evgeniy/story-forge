import Elysia, { NotFoundError } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../../database/client";
import { savedStories } from "../../database/schema";
import { fromDbStory, fromDbStoryListItem } from "./model/map";
import { roomManager } from "../game/services/rooms";
import { StoryContentSchema } from "./model/schema";
import z from "zod";

export const storiesModule = new Elysia({ prefix: "/stories" })
  .get("/", async () => {
    const rows = await db
      .select({
        id: savedStories.id,
        ownerName: savedStories.ownerName,
        createdAt: savedStories.createdAt,
      })
      .from(savedStories);

    return rows.map(fromDbStoryListItem);
  })
  .get(
    "/:id",
    async ({ params, set }) => {
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

      const content: StoryContentSchema = story.sentences.map((sentence) => ({
        playerName: room.players.get(sentence.playerId)?.username ?? "Unknown",
        sentence: sentence.content,
        twist: sentence.twist?.content,
      }));

      const [created] = await db
        .insert(savedStories)
        .values({ ownerName: owner.username, content: JSON.stringify(content) })
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
