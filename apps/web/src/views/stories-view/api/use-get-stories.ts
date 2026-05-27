import { useQuery } from "@siberiacancode/reactuse";

import { getStories } from "@/api/requests/get-stories";

export const useGetStories = () => useQuery(() => getStories());
