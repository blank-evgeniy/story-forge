export const testId = (id: string): { "data-testid": string } | undefined =>
  import.meta.env.DEV ? { "data-testid": id } : undefined;
