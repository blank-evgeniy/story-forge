import { checkHealth } from "@/api/requests/check-health";
import { useQuery } from "@siberiacancode/reactuse";

export const useCheckHealth = () => useQuery(() => checkHealth());
