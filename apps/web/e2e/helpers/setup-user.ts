import { Page } from "@playwright/test";

export function setupUser(
  page: Page,
  player: { id: string; username: string; color: string; icon: string },
) {
  return page.addInitScript((u) => {
    localStorage.setItem(
      "user-storage",
      JSON.stringify({ state: { player: u }, version: 2 }),
    );
  }, player);
}
