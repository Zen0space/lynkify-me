import { createTRPCClient, httpLink } from "@trpc/client";
import type { AppRouter } from "@lynkify/backend/src/trpc/router";

export const trpcServer = createTRPCClient<AppRouter>({
    links: [
        httpLink({
            url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
        }),
    ],
});
