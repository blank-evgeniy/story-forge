import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: isProd ? process.env.TURSO_DATABASE_URL! : "file:local.db",
    authToken: isProd ? process.env.TURSO_AUTH_TOKEN! : undefined,
  },
});
