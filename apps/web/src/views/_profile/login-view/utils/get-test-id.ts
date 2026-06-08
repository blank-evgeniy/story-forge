import { getTestIdGenerator } from "@/lib/tests/test-id";

export const MODULE_NAMESPACE = "login-view";
export const getTestId = getTestIdGenerator(MODULE_NAMESPACE);
