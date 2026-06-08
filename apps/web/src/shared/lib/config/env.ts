import { z } from "zod";

const booleanFlag = z
  .union([z.boolean(), z.stringbool()])
  .optional()
  .default(false);

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_SPEED_MULTIPLIER: z.coerce.number().positive().default(1),
  VITE_WS_BASE_URL: z.url(),
  DEV: z.boolean(),
  VITE_E2E: booleanFlag,
  VITEST: booleanFlag,
});

export const env = envSchema.parse(import.meta.env);
