import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };

export const redis =
    globalForRedis.redis ||
    new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
            const delay = Math.min(times * 500, 5000);
            console.warn(`⏳ Redis reconnecting... attempt ${times}`);
            return delay;
        },
    });

// Prevent unhandled error events from crashing the process
redis.on("error", (err: Error) => {
    console.error("❌ Redis connection error:", err.message);
});

redis.on("connect", () => {
    console.log("✅ Redis connected");
});

if (process.env.NODE_ENV !== "production") {
    globalForRedis.redis = redis;
}
