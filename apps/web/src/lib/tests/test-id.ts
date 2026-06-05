export const testIdAttr = (
  id: string | undefined,
): { "data-testid": string } | undefined =>
  id !== undefined && import.meta.env.DEV ? { "data-testid": id } : undefined;

export const getTestIdGenerator =
  (module?: string) =>
  (component?: string) =>
  (element?: string, modifier?: string) =>
    [module, component, element, modifier].filter(Boolean).join("_");

export type WithModuleNamespace = {
  namespace?: string;
};
