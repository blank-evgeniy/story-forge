import { env } from "@/shared/lib/config/env";

export const testIdAttr = (
  id: string | undefined,
): { "data-testid": string } | undefined =>
  id !== undefined && (env.VITEST || env.VITE_E2E)
    ? { "data-testid": id }
    : undefined;
