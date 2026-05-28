import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { defineConfig } from "drizzle-kit";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  dbCredentials: {
    authToken: isProd ? process.env.TURSO_AUTH_TOKEN! : undefined,
    url: isProd ? process.env.TURSO_DATABASE_URL! : "file:local.db",
  },
  dialect: "turso",
  out: "./drizzle",
  schema: "./src/database/schema.ts",
});
