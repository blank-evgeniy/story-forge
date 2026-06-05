import { getTestIdGenerator } from "@/lib/tests/test-id";

export const MODULE_NAMESPACE = "room-view";
export const getTestId = getTestIdGenerator(MODULE_NAMESPACE);
