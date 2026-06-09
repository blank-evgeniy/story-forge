export const getTestIdGenerator =
  (module?: string) =>
  (component?: string) =>
  (element?: string, modifier?: string) =>
    [module, component, element, modifier].filter(Boolean).join("_");

export type WithModuleNamespace = {
  namespace?: string;
};
