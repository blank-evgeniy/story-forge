import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  authToken:
    process.env.NODE_ENV === "production"
      ? process.env.TURSO_AUTH_TOKEN
      : undefined,

  url:
    process.env.NODE_ENV === "production"
      ? process.env.TURSO_DATABASE_URL!
      : "file:local.db",
});

export const db = drizzle(client);
