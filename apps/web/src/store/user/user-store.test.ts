import { beforeEach, describe, expect, it } from "vitest";

import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
} from "@/shared/consts/player-customization";

import { useUserStore } from "./user-store";

beforeEach(() => {
  useUserStore.setState({ user: null });
});

describe("useUserStore", () => {
  it("has no user in initial state", () => {
    expect(useUserStore.getState().user).toBeNull();
  });

  describe("login", () => {
    it("creates user with given username and default color/icon", () => {
      useUserStore.getState().login("Alice");

      const { user } = useUserStore.getState();

      expect(user?.username).toBe("Alice");
      expect(user?.color).toBe(DEFAULT_PLAYER_COLOR);
      expect(user?.icon).toBe(DEFAULT_PLAYER_ICON);
    });

    it("creates user with explicit color and icon", () => {
      useUserStore.getState().login("Bob", "red", "evil");

      const { user } = useUserStore.getState();

      expect(user?.color).toBe("red");
      expect(user?.icon).toBe("evil");
    });

    it("assigns a non-empty id to the user", () => {
      useUserStore.getState().login("Alice");

      expect(useUserStore.getState().user?.id).toBeTruthy();
    });

    it("generates a unique id on each login", () => {
      useUserStore.getState().login("Alice");
      const id1 = useUserStore.getState().user?.id;

      useUserStore.setState({ user: null });
      useUserStore.getState().login("Bob");
      const id2 = useUserStore.getState().user?.id;

      expect(id1).not.toBe(id2);
    });
  });

  describe("logout", () => {
    it("sets user to null", () => {
      useUserStore.getState().login("Alice");
      useUserStore.getState().logout();

      expect(useUserStore.getState().user).toBeNull();
    });
  });

  describe("updateProfile", () => {
    it("updates username, color, and icon while preserving id", () => {
      useUserStore.getState().login("Alice", "blue", "angel");
      const originalId = useUserStore.getState().user!.id;

      useUserStore.getState().updateProfile("Bob", "red", "evil");
      const { user } = useUserStore.getState();

      expect(user?.id).toBe(originalId);
      expect(user?.username).toBe("Bob");
      expect(user?.color).toBe("red");
      expect(user?.icon).toBe("evil");
    });

    it("does nothing when user is null", () => {
      useUserStore.getState().updateProfile("Bob", "red", "evil");

      expect(useUserStore.getState().user).toBeNull();
    });
  });
});
