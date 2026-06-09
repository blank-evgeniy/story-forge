import { getTestIdGenerator } from "@/shared/lib/tests/test-id-generator";

export const MODULE_NAMESPACE = "login-view";
export const getTestId = getTestIdGenerator(MODULE_NAMESPACE);
