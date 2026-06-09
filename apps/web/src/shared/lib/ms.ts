import { env } from "@/shared/lib/config/env";

export function ms(ms: number): number {
  return ms / env.VITE_SPEED_MULTIPLIER;
}
