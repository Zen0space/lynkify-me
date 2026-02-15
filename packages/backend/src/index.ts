import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./trpc/router.js";
import { createContext } from "./trpc/context.js";

const port = Number(process.env.BACKEND_PORT) || 4000;

function getProcedurePath(url: string): string | null {
    if (!url) return null;

    const match = url.match(/^\/([a-z]+\.[a-z]+)/i);
    return match ? match[1] : url.split('?')[0];
}

const server = createHTTPServer({
    router: appRouter,
    createContext: async (opts) => {
        const procedurePath = getProcedurePath(opts.req.url || "");

        console.log(`📥 Backend: Incoming ${opts.req.method} request`, {
            procedure: procedurePath,
            url: opts.req.url,
            userAgent: opts.req.headers['user-agent'] || 'unknown'
        });
        return createContext({ req: opts.req });
    },
    middleware: cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    }),
});

server.listen(port);

console.log("\n" + "=".repeat(60));
console.log(`🚀 Backend server started at ${new Date().toISOString()}`);
console.log(`📡 Listening on: http://localhost:${port}`);
console.log(`📝 tRPC procedures available:`);
console.log(`   - user.sync (mutation)`);
console.log(`   - user.byLogtoId (query)`);
console.log(`   - user.completeOnboarding (mutation)`);
console.log(`   - user.checkSlug (query)`);
console.log(`   - links.list (query)`);
console.log(`   - links.create (mutation)`);
console.log(`   - links.update (mutation)`);
console.log(`   - links.delete (mutation)`);
console.log("=".repeat(60) + "\n");
