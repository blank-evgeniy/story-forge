import type { useMutation, useQuery } from "@siberiacancode/reactuse";

export type MutationHook<Body = unknown, Data = unknown> = ReturnType<typeof useMutation<Body, Data>>;
export type QueryHook = ReturnType<typeof useQuery>;
