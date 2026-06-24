import { Locator, Page } from "@playwright/test";

import { getTestIdGenerator } from "../../src/shared/lib/tests/test-id-generator";

const tid = getTestIdGenerator("login-view");

// Test IDs

export const testIds = {
  input: tid("player-form")("input-username"),
  submit: tid("player-form")("submit"),
  colorButton: (color: string) => tid("player-color-picker")("button", color),
  iconButton: (icon: string) => tid("player-icon-picker")("button", icon),
  avatar: tid("player-avatar")("avatar"),
};

// POM

export class LoginViewPage {
  readonly usernameInput: Locator;
  readonly submitBtn: Locator;
  readonly avatar: Locator;

  constructor(readonly page: Page) {
    this.usernameInput = page.getByTestId(testIds.input);
    this.submitBtn = page.getByTestId(testIds.submit);
    this.avatar = page.getByTestId(testIds.avatar);
  }

  colorButton(color: string): Locator {
    return this.page.getByTestId(testIds.colorButton(color));
  }

  iconButton(icon: string): Locator {
    return this.page.getByTestId(testIds.iconButton(icon));
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async chooseColor(color: string) {
    await this.colorButton(color).click();
  }

  async chooseIcon(icon: string) {
    await this.iconButton(icon).click();
  }

  async submit() {
    await this.submitBtn.click();
  }

  async goto(redirect?: string) {
    await this.page.goto(`/login${redirect ? `?redirect=${redirect}` : ""}`);
  }
}
