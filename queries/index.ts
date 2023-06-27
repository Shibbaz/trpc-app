import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router'
export type AppRouter = typeof appRouter;
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
const { server, listen } = createHTTPServer({
    router: appRouter,
  });
console.log("Server on")

const wss = new ws.Server({
  server
});
const handler = applyWSSHandler({ wss, router: appRouter});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log('✅ WebSocket Server listening on ws://localhost:3000');
listen(3000);