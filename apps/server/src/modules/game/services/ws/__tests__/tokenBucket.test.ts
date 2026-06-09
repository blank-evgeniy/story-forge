import { afterAll, beforeEach, describe, expect, jest, test } from "bun:test";

import { TokenBucket } from "../limiter";

describe("TokenBucket", () => {
  beforeEach(() => {
    jest.setSystemTime(0);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("allows up to capacity requests immediately", () => {
    const bucket = new TokenBucket(5, 1);

    for (let i = 0; i < 5; i++) {
      expect(bucket.allow("key")).toBe(true);
    }

    expect(bucket.allow("key")).toBe(false);
  });

  test("rejects when bucket is empty", () => {
    const bucket = new TokenBucket(1, 0);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);
  });

  test("refills tokens over time", () => {
    const bucket = new TokenBucket(1, 1);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);

    jest.setSystemTime(1100);

    expect(bucket.allow("key")).toBe(true);
  });

  test("does not exceed capacity when refilling", () => {
    const bucket = new TokenBucket(2, 10);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);

    jest.setSystemTime(10_000);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);
  });

  test("different keys are tracked independently", () => {
    const bucket = new TokenBucket(1, 0);

    expect(bucket.allow("a")).toBe(true);
    expect(bucket.allow("a")).toBe(false);
    expect(bucket.allow("b")).toBe(true);
  });

  test("delete resets the bucket so key starts fresh", () => {
    const bucket = new TokenBucket(1, 0);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);

    bucket.delete("key");

    expect(bucket.allow("key")).toBe(true);
  });

  test("cleanup removes buckets inactive for over 1 hour", () => {
    const bucket = new TokenBucket(2, 0);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);

    jest.setSystemTime(61 * 60 * 1000);
    bucket.cleanup();

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);
  });

  test("cleanup does not remove buckets seen less than 1 hour ago", () => {
    const bucket = new TokenBucket(2, 0);

    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(true);
    expect(bucket.allow("key")).toBe(false);

    jest.setSystemTime(59 * 60 * 1000);
    bucket.cleanup();

    expect(bucket.allow("key")).toBe(false);
  });
});
