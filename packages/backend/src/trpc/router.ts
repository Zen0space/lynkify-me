import { router } from "./trpc.js";
import { userRouter } from "./routers/user.js";
import { linksRouter } from "./routers/link.js";

export const appRouter = router({
    users: userRouter,
    links: linksRouter,
});

export type AppRouter = typeof appRouter;
