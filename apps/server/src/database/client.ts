import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is required in production");
}

const client = createClient({
  authToken: isProd ? process.env.TURSO_AUTH_TOKEN : undefined,
  url: isProd ? process.env.TURSO_DATABASE_URL! : "file:local.db",
});

export const db = drizzle(client);
