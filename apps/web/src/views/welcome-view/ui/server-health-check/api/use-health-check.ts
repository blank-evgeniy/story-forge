import { useQuery } from "@siberiacancode/reactuse";

import { checkHealth } from "@/api/requests/check-health";

export const useCheckHealth = () => useQuery(() => checkHealth());
