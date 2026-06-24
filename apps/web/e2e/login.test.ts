import { expect, test } from "@playwright/test";

import { setupUser } from "./helpers/setup-user";
import { getToast } from "./helpers/toast";
import { LoginViewPage } from "./pages/login-view.page";
import { RoomViewPage } from "./pages/room-view.page";

test("login flow", async ({ page }) => {
  const login = new LoginViewPage(page);

  await test.step("visits login page and sees username input and submit button", async () => {
    await login.goto();

    await expect(login.usernameInput).toBeVisible();
    await expect(login.submitBtn).toBeVisible();
  });

  await test.step("submits form", async () => {
    await login.enterUsername("Alice");
    await login.chooseColor("red");
    await login.chooseIcon("angel");

    await login.submitBtn.click();

    await expect(page).toHaveURL("/");
  });

  await test.step("stores user in local storage", async () => {
    const userRow = await page.evaluate(() =>
      localStorage.getItem("user-storage"),
    );
    expect(userRow).not.toBeNull();

    const stored = JSON.parse(userRow!);
    expect(stored.state.player.username).toBe("Alice");
    expect(stored.state.player.color).toBe("red");
    expect(stored.state.player.icon).toBe("angel");
    expect(stored.state.player.id).not.toBeNull();
  });
});

test("redirects to home when already logged in", async ({ page }) => {
  const login = new LoginViewPage(page);

  await setupUser(page, {
    id: "123",
    username: "Alice",
    color: "red",
    icon: "angel",
  });

  await login.goto();

  await expect(page).toHaveURL("/");
});

test("login with redirect if user not logged in", async ({ page }) => {
  const login = new LoginViewPage(page);
  const room = new RoomViewPage(page);

  await room.goto("1234");

  await expect(page).toHaveURL(/\/login\?redirect=/);

  await login.enterUsername("Alice");
  await login.submitBtn.click();

  await expect(page).toHaveURL("/room/1234");
});

test("shows error and stays on login when nickname is too short", async ({
  page,
}) => {
  const login = new LoginViewPage(page);

  await login.goto();
  await login.enterUsername("a");
  await login.submitBtn.click();

  await expect(getToast(page, "error")).toBeVisible();

  await expect(page).toHaveURL(/\/login/);

  const stored = await page.evaluate(() =>
    localStorage.getItem("user-storage"),
  );
  expect(stored).toBeNull();
});
