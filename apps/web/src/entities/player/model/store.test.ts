import { beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_ICON } from "./consts";
import { usePlayerStore } from "./store";

beforeEach(() => {
  usePlayerStore.setState({ player: null });
});

describe("usePlayerStore", () => {
  it("has no player in initial state", () => {
    expect(usePlayerStore.getState().player).toBeNull();
  });

  describe("login", () => {
    it("creates player with given username and default color/icon", () => {
      usePlayerStore.getState().login("Alice");

      const { player } = usePlayerStore.getState();

      expect(player?.username).toBe("Alice");
      expect(player?.color).toBe(DEFAULT_PLAYER_COLOR);
      expect(player?.icon).toBe(DEFAULT_PLAYER_ICON);
    });

    it("creates player with explicit color and icon", () => {
      usePlayerStore.getState().login("Bob", "red", "evil");

      const { player } = usePlayerStore.getState();

      expect(player?.color).toBe("red");
      expect(player?.icon).toBe("evil");
    });

    it("assigns a non-empty id to the player", () => {
      usePlayerStore.getState().login("Alice");

      expect(usePlayerStore.getState().player?.id).toBeTruthy();
    });

    it("generates a unique id on each login", () => {
      usePlayerStore.getState().login("Alice");
      const id1 = usePlayerStore.getState().player?.id;

      usePlayerStore.setState({ player: null });
      usePlayerStore.getState().login("Bob");
      const id2 = usePlayerStore.getState().player?.id;

      expect(id1).not.toBe(id2);
    });
  });

  describe("logout", () => {
    it("sets player to null", () => {
      usePlayerStore.getState().login("Alice");
      usePlayerStore.getState().logout();

      expect(usePlayerStore.getState().player).toBeNull();
    });
  });

  describe("updateProfile", () => {
    it("updates username, color, and icon while preserving id", () => {
      usePlayerStore.getState().login("Alice", "blue", "angel");
      const originalId = usePlayerStore.getState().player!.id;

      usePlayerStore.getState().updateProfile("Bob", "red", "evil");
      const { player } = usePlayerStore.getState();

      expect(player?.id).toBe(originalId);
      expect(player?.username).toBe("Bob");
      expect(player?.color).toBe("red");
      expect(player?.icon).toBe("evil");
    });

    it("does nothing when player is null", () => {
      usePlayerStore.getState().updateProfile("Bob", "red", "evil");

      expect(usePlayerStore.getState().player).toBeNull();
    });
  });
});
