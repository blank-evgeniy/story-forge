const speedMultiplier = Number(import.meta.env.VITE_SPEED_MULTIPLIER ?? 1);

export function ms(ms: number): number {
  return ms / speedMultiplier;
}
