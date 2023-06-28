import { TRPCError, initTRPC } from '@trpc/server';
const t = initTRPC.create();
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;


export const loggerMiddleware = middleware(async (opts) => {
    const start = Date.now();
   
    const result = await opts.next();
   
    const durationMs = Date.now() - start;
    const meta = { path: opts.path, type: opts.type, durationMs };
   
    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta);
   
    return result;
  });
   