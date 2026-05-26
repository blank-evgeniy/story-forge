import Elysia, { NotFoundError, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../../database/client";
import { savedStories } from "../../database/schema";
import { fromDbStory, fromDbStoryListItem, toDbStory } from "./model/map";
import { insertStorySchema } from "./model/schema";

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
      params: t.Object({ id: t.Numeric() }),
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const [created] = await db
        .insert(savedStories)
        .values(toDbStory(body))
        .returning();

      return fromDbStory(created);
    },
    {
      body: insertStorySchema,
    },
  );
