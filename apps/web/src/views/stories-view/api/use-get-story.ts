import { useQuery } from "@siberiacancode/reactuse";

import { getStory } from "@/shared/api/requests/get-story";

export const useGetStory = (id: number | null) =>
  useQuery(() => getStory(id!), {
    enabled: id !== null,
    keys: [id],
  });
