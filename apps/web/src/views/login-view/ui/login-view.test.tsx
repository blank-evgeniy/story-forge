import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "i18next";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_ICON } from "@/entities/player";

import { getTestId } from "../utils/get-test-id";
import { LoginView } from "./login-view";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const testIds = {
  input: getTestId("player-form")("input-username"),
  submit: getTestId("player-form")("submit"),
  colorButton: (color: string) =>
    getTestId("player-color-picker")("button", color),
  iconButton: (icon: string) => getTestId("player-icon-picker")("button", icon),
};

function setup(onLogin = vi.fn()) {
  const user = userEvent.setup();
  render(<LoginView onLogin={onLogin} />);

  return {
    user,
    onLogin,
    input: screen.getByTestId(testIds.input),
    submitButton: screen.getByTestId(testIds.submit),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("rendering", () => {
  it("shows the app heading", () => {
    setup();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders username input and submit button", () => {
    const { input, submitButton } = setup();
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("renders color picker buttons for all available colors", () => {
    setup();
    expect(screen.getByRole("button", { name: "amber" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "red" })).toBeInTheDocument();
  });

  it("renders icon picker buttons for all available icons", () => {
    setup();
    expect(screen.getByRole("button", { name: "angel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "evil" })).toBeInTheDocument();
  });
});

describe("validation", () => {
  it("shows error toast and does not call onLogin when username is empty", async () => {
    const { user, submitButton, onLogin } = setup();

    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      i18n.t("common.forms.nicknameField.validationError"),
    );
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("shows error toast when username is only whitespace", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "   ");
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      i18n.t("common.forms.nicknameField.validationError"),
    );
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("shows error toast when trimmed username is shorter than 2 characters", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "a");
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      i18n.t("common.forms.nicknameField.validationError"),
    );
    expect(onLogin).not.toHaveBeenCalled();
  });
});

describe("successful submission", () => {
  it("calls onLogin with trimmed username and defaults on valid submit", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "  Alice  ");
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith(
      "Alice",
      DEFAULT_PLAYER_COLOR,
      DEFAULT_PLAYER_ICON,
    );
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("submits when Enter is pressed in the input field", async () => {
    const { user, input, onLogin } = setup();

    await user.type(input, "Bob");
    await user.keyboard("{Enter}");

    expect(onLogin).toHaveBeenCalledWith(
      "Bob",
      DEFAULT_PLAYER_COLOR,
      DEFAULT_PLAYER_ICON,
    );
  });

  it("passes the selected color to onLogin", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "Alice");
    await user.click(screen.getByRole("button", { name: "red" }));
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith("Alice", "red", DEFAULT_PLAYER_ICON);
  });

  it("passes the selected icon to onLogin", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "Alice");
    await user.click(screen.getByRole("button", { name: "evil" }));
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith("Alice", DEFAULT_PLAYER_COLOR, "evil");
  });

  it("passes both selected color and icon to onLogin", async () => {
    const { user, input, submitButton, onLogin } = setup();

    await user.type(input, "Alice");
    await user.click(screen.getByRole("button", { name: "red" }));
    await user.click(screen.getByRole("button", { name: "evil" }));
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith("Alice", "red", "evil");
  });
});
