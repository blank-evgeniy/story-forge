export class TokenBucket {
  private buckets = new Map<
    string,
    {
      lastRefill: number;
      tokens: number;
    }
  >();

  constructor(
    private readonly capacity: number,
    private readonly refillPerSecond: number,
  ) {}

  allow(key: string): boolean {
    const now = Date.now();

    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        lastRefill: now,
        tokens: this.capacity,
      };

      this.buckets.set(key, bucket);
    }

    const elapsedSeconds = (now - bucket.lastRefill) / 1000;

    bucket.tokens = Math.min(
      this.capacity,
      bucket.tokens + elapsedSeconds * this.refillPerSecond,
    );

    bucket.lastRefill = now;

    if (bucket.tokens < 1) {
      return false;
    }

    bucket.tokens--;

    return true;
  }

  cleanup() {
    const now = Date.now();

    for (const [key, bucket] of this.buckets) {
      if (now - bucket.lastRefill > 60 * 60 * 1000) {
        this.buckets.delete(key);
      }
    }
  }

  delete(key: string) {
    this.buckets.delete(key);
  }
}

export const wsLimiter = new TokenBucket(10, 1);

setInterval(() => wsLimiter.cleanup(), 10 * 60 * 1000).unref();
