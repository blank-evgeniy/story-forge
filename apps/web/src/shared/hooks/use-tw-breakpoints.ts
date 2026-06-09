import { BREAKPOINTS_TAILWIND, useBreakpoints } from "@siberiacancode/reactuse";

export function useTwBreakpoints() {
  return useBreakpoints(BREAKPOINTS_TAILWIND);
}
