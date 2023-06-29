import { router } from '../trpc';
import { usersRouter } from './users_router';
import { postsRouter } from './posts_router'
export const appRouter = router({
    users: usersRouter,
    posts: postsRouter
    }
);

export type AppRouter = typeof appRouter;