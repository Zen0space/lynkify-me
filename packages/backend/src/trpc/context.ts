import type { IncomingMessage } from "http";
import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js";

export interface Context {
    prisma: typeof prisma;
    redis: typeof redis;
    req?: IncomingMessage;
}

export async function createContext(opts?: { req?: IncomingMessage }): Promise<Context> {
    return {
        prisma,
        redis,
        req: opts?.req,
    };
}
