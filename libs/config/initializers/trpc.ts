import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
export const t = initTRPC.create({
  transformer: superjson,
});
export const middleware = t.middleware;
export const router = t.router;
import {loggerMiddleware} from '../../middlewares/logger_middleware'
export const Procedure = t.procedure.use(loggerMiddleware)
   