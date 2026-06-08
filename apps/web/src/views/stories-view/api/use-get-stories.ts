import { useQuery } from "@siberiacancode/reactuse";

import { getStories } from "@/shared/api/requests/get-stories";

export const useGetStories = () => useQuery(() => getStories());
